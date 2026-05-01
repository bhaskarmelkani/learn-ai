/// <reference lib="webworker" />

import { pipeline, AutoTokenizer } from "@huggingface/transformers";
import {
  countTokens as countGptTokens,
  decode as decodeGptTokens,
  encode as encodeGptText,
  encodeChat as encodeGptChat,
} from "gpt-tokenizer/model/gpt-4o";
import { summarizeTokenBudget } from "./budget";
import { BROWSER_AI_MODELS, TASK_RESOURCES } from "./models";
import { rankBySimilarity } from "./math";
import type {
  BrowserAIRuntimeLabel,
  BrowserAIStatusSnapshot,
  BrowserAITask,
  BrowserAIWorkerControlMessage,
  BrowserAIWorkerResponse,
  BrowserAIWorkerRequestMap,
  ChatMessage,
  RetrievalDocument,
  TokenComparison,
} from "./types";

type FeatureExtractor = (
  input: string[] | string,
  options?: Record<string, unknown>,
) => Promise<{ tolist: () => number[][] | number[] }>;

type TextGenerator = (
  input: string,
  options: {
    do_sample: boolean;
    max_new_tokens: number;
    repetition_penalty: number;
    return_full_text: boolean;
    temperature: number;
    top_k: number;
  },
) => Promise<Array<{ generated_text: string }>>;

type ModelTokenizer = {
  apply_chat_template: (
    conversation: ChatMessage[],
    options: {
      add_generation_prompt?: boolean;
      return_dict?: boolean;
      return_tensor?: boolean;
      tokenize?: boolean;
    },
  ) => number[] | { input_ids: number[] };
  encode: (
    text: string,
    options?: {
      add_special_tokens?: boolean;
    },
  ) => number[];
  tokenize: (
    text: string,
    options?: {
      add_special_tokens?: boolean;
    },
  ) => string[];
};

const createPipeline = pipeline as unknown as (
  task: "feature-extraction" | "text-generation",
  model: string,
  options?: Record<string, unknown>,
) => Promise<FeatureExtractor | TextGenerator>;

const cachedResources: {
  bertTokenizer: ModelTokenizer | null;
  embedder: FeatureExtractor | null;
  generator: TextGenerator | null;
  smollmTokenizer: ModelTokenizer | null;
} = {
  bertTokenizer: null,
  embedder: null,
  generator: null,
  smollmTokenizer: null,
};

const cancelledIds = new Set<string>();

function canUseWebGPU() {
  return "gpu" in navigator;
}

function runtimeLabel(): BrowserAIRuntimeLabel {
  return canUseWebGPU() ? "WebGPU" : "WASM";
}

function toTokenIds(value: number[] | { input_ids: number[] }) {
  return Array.isArray(value) ? value : value.input_ids;
}

async function ensureSmollmTokenizer() {
  if (!cachedResources.smollmTokenizer) {
    cachedResources.smollmTokenizer = (await AutoTokenizer.from_pretrained(
      BROWSER_AI_MODELS.tinyGeneration.id,
    )) as unknown as ModelTokenizer;
  }

  return cachedResources.smollmTokenizer;
}

async function ensureBertTokenizer() {
  if (!cachedResources.bertTokenizer) {
    cachedResources.bertTokenizer = (await AutoTokenizer.from_pretrained(
      BROWSER_AI_MODELS.bertTokenizer.id,
    )) as unknown as ModelTokenizer;
  }

  return cachedResources.bertTokenizer;
}

async function ensureGenerator() {
  if (!cachedResources.generator) {
    const options = canUseWebGPU()
      ? { device: "webgpu", dtype: "q4" }
      : { dtype: "q4" };
    cachedResources.generator = (await createPipeline(
      "text-generation",
      BROWSER_AI_MODELS.tinyGeneration.id,
      options,
    )) as TextGenerator;
  }

  return cachedResources.generator;
}

async function ensureEmbedder() {
  if (!cachedResources.embedder) {
    const options = canUseWebGPU() ? { device: "webgpu" } : undefined;
    cachedResources.embedder = (await createPipeline(
      "feature-extraction",
      BROWSER_AI_MODELS.embedder.id,
      options,
    )) as FeatureExtractor;
  }

  return cachedResources.embedder;
}

function loadedTasks(): BrowserAITask[] {
  return [
    ...(cachedResources.smollmTokenizer || cachedResources.bertTokenizer
      ? (["tokenize", "countTokens"] as const)
      : []),
    ...(cachedResources.embedder ? (["embed", "retrieve"] as const) : []),
    ...(cachedResources.generator ? (["generate"] as const) : []),
  ];
}

function createStatusSnapshot(): BrowserAIStatusSnapshot {
  return {
    capabilities: {
      mock: false,
      offline: navigator.onLine === false,
      webgpu: canUseWebGPU(),
      worker: true,
    },
    loadedTasks: loadedTasks(),
  };
}

function buildGptComparison(text: string): TokenComparison {
  const tokenIds = encodeGptText(text);
  return {
    id: "gpt",
    label: BROWSER_AI_MODELS.gptTokenizer.label,
    tokenCount: tokenIds.length,
    tokenIds,
    tokens: tokenIds.map((tokenId) => decodeGptTokens([tokenId])),
  };
}

async function buildModelTokenizerComparison(
  tokenizerId: "smollm" | "bert",
  text: string,
) {
  const tokenizer =
    tokenizerId === "smollm"
      ? await ensureSmollmTokenizer()
      : await ensureBertTokenizer();

  const tokenIds = tokenizer.encode(text, { add_special_tokens: false });

  return {
    id: tokenizerId,
    label:
      tokenizerId === "smollm"
        ? "SmolLM tokenizer"
        : BROWSER_AI_MODELS.bertTokenizer.label,
    tokenCount: tokenIds.length,
    tokenIds,
    tokens: tokenizer.tokenize(text, { add_special_tokens: false }),
  } satisfies TokenComparison;
}

async function handleTokenize(input: BrowserAIWorkerRequestMap["tokenize"]) {
  const comparisons = await Promise.all([
    Promise.resolve(buildGptComparison(input.text)),
    buildModelTokenizerComparison("smollm", input.text),
    buildModelTokenizerComparison("bert", input.text),
  ]);

  return { comparisons };
}

async function countSmollmChatTokens(messages: ChatMessage[]) {
  const tokenizer = await ensureSmollmTokenizer();
  const tokenized = tokenizer.apply_chat_template(messages, {
    add_generation_prompt: true,
    return_dict: false,
    return_tensor: false,
    tokenize: true,
  });

  return toTokenIds(tokenized).length;
}

async function handleCountTokens(input: BrowserAIWorkerRequestMap["countTokens"]) {
  const { contextBudget, example, outputAllowance, systemPrompt, userPrompt } = input;

  const gptSections = {
    example: countGptTokens(example),
    system: countGptTokens(systemPrompt),
    user: countGptTokens(userPrompt),
  };
  const gptPromptTokens = encodeGptChat([
    { content: systemPrompt, role: "system" },
    { content: example, role: "assistant" },
    { content: userPrompt, role: "user" },
  ]).length;

  const smollmSections = await Promise.all([
    ensureSmollmTokenizer().then((tokenizer) =>
      tokenizer.encode(systemPrompt, { add_special_tokens: false }).length,
    ),
    ensureSmollmTokenizer().then((tokenizer) =>
      tokenizer.encode(example, { add_special_tokens: false }).length,
    ),
    ensureSmollmTokenizer().then((tokenizer) =>
      tokenizer.encode(userPrompt, { add_special_tokens: false }).length,
    ),
  ]);

  const smollmPromptTokens = await countSmollmChatTokens([
    { content: systemPrompt, role: "system" },
    { content: example, role: "assistant" },
    { content: userPrompt, role: "user" },
  ]);

  return {
    breakdowns: [
      summarizeTokenBudget({
        contextBudget,
        exampleTokens: gptSections.example,
        outputAllowance,
        promptTokens: gptPromptTokens,
        systemTokens: gptSections.system,
        tokenizerId: "gpt",
        tokenizerLabel: BROWSER_AI_MODELS.gptTokenizer.label,
        userTokens: gptSections.user,
      }),
      summarizeTokenBudget({
        contextBudget,
        exampleTokens: smollmSections[1],
        outputAllowance,
        promptTokens: smollmPromptTokens,
        systemTokens: smollmSections[0],
        tokenizerId: "smollm",
        tokenizerLabel: "SmolLM tokenizer",
        userTokens: smollmSections[2],
      }),
    ],
  };
}

function normalizeVectors(value: number[][] | number[]) {
  return Array.isArray(value[0]) ? (value as number[][]) : [value as number[]];
}

async function embedTexts(texts: string[]) {
  const embedder = await ensureEmbedder();
  const tensor = await embedder(texts, {
    normalize: true,
    pooling: "mean",
  });

  return normalizeVectors(tensor.tolist());
}

async function handleEmbed(input: BrowserAIWorkerRequestMap["embed"]) {
  return {
    runtimeLabel: runtimeLabel(),
    vectors: await embedTexts(input.texts),
  };
}

async function handleGenerate(input: BrowserAIWorkerRequestMap["generate"]) {
  const generator = await ensureGenerator();
  const response = await generator(input.prompt.trim(), {
    do_sample: true,
    max_new_tokens: input.maxNewTokens,
    repetition_penalty: 1.08,
    return_full_text: false,
    temperature: input.temperature,
    top_k: input.topK,
  });

  return {
    runtimeLabel: runtimeLabel(),
    text:
      response[0]?.generated_text?.trim() ||
      "(The tiny model returned an empty answer.)",
  };
}

async function handleRetrieve(input: BrowserAIWorkerRequestMap["retrieve"]) {
  const queryVector = (await embedTexts([input.query]))[0];
  const documentVectors = await embedTexts(
    input.documents.map((document) => `${document.title}\n${document.text}`),
  );

  return {
    matches: rankBySimilarity(
      queryVector,
      documentVectors,
      input.documents as RetrievalDocument[],
      input.topK,
    ),
    runtimeLabel: runtimeLabel(),
  };
}

async function ensureTaskLoaded(task: BrowserAITask) {
  switch (TASK_RESOURCES[task]) {
    case "embeddings":
      await ensureEmbedder();
      return task === "retrieve"
        ? { matches: [], runtimeLabel: runtimeLabel() }
        : { runtimeLabel: runtimeLabel(), vectors: [] };
    case "generation":
      await ensureGenerator();
      return { runtimeLabel: runtimeLabel(), text: "" };
    case "tokenizers":
      await Promise.all([ensureSmollmTokenizer(), ensureBertTokenizer()]);
      return task === "countTokens"
        ? { breakdowns: [] }
        : { comparisons: [] };
  }
}

async function handleRun(task: BrowserAITask, input: BrowserAIWorkerRequestMap[BrowserAITask]) {
  switch (task) {
    case "countTokens":
      return await handleCountTokens(input as BrowserAIWorkerRequestMap["countTokens"]);
    case "embed":
      return await handleEmbed(input as BrowserAIWorkerRequestMap["embed"]);
    case "generate":
      return await handleGenerate(input as BrowserAIWorkerRequestMap["generate"]);
    case "retrieve":
      return await handleRetrieve(input as BrowserAIWorkerRequestMap["retrieve"]);
    case "tokenize":
      return await handleTokenize(input as BrowserAIWorkerRequestMap["tokenize"]);
  }
}

function disposeTask(task?: BrowserAITask) {
  if (!task || TASK_RESOURCES[task] === "tokenizers") {
    cachedResources.bertTokenizer = null;
    cachedResources.smollmTokenizer = null;
  }

  if (!task || TASK_RESOURCES[task] === "embeddings") {
    cachedResources.embedder = null;
  }

  if (!task || TASK_RESOURCES[task] === "generation") {
    cachedResources.generator = null;
  }
}

self.addEventListener("message", async (event: MessageEvent<BrowserAIWorkerControlMessage>) => {
  const request = event.data;

  try {
    if (request.type === "cancel") {
      cancelledIds.add(request.id);
      self.postMessage({
        id: request.id,
        result: null,
        type: "cancel",
      } satisfies BrowserAIWorkerResponse);
      return;
    }

    if (request.type === "dispose") {
      disposeTask(request.task);
      self.postMessage({
        id: request.id,
        result: null,
        task: request.task,
        type: "dispose",
      } satisfies BrowserAIWorkerResponse);
      return;
    }

    if (request.type === "status") {
      self.postMessage({
        id: request.id,
        result: createStatusSnapshot(),
        type: "status",
      } satisfies BrowserAIWorkerResponse);
      return;
    }

    if (request.type === "load") {
      const result = await ensureTaskLoaded(request.task);
      self.postMessage({
        id: request.id,
        result,
        task: request.task,
        type: "load",
      } satisfies BrowserAIWorkerResponse);
      return;
    }

    const result = await handleRun(request.task, request.input);
    if (cancelledIds.has(request.id)) {
      cancelledIds.delete(request.id);
      return;
    }

    self.postMessage({
      id: request.id,
      result,
      task: request.task,
      type: "run",
    } satisfies BrowserAIWorkerResponse);
  } catch (error) {
    self.postMessage({
      error: error instanceof Error ? error.message : "Browser AI worker failed.",
      id: request.id,
      task: "task" in request ? request.task : undefined,
      type: "error",
    } satisfies BrowserAIWorkerResponse);
  }
});
