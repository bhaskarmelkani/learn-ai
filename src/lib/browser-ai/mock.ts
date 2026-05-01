import { summarizeTokenBudget } from "./budget";
import { rankBySimilarity } from "./math";
import type {
  BrowserAICapabilities,
  BrowserAIStatusSnapshot,
  BrowserAITask,
  BrowserAIWorkerRequestMap,
  BrowserAIWorkerResponseMap,
  RetrievedDocument,
} from "./types";

const mockLoadedTasks = new Set<BrowserAITask>();

function roughTokens(text: string) {
  return text
    .split(/(\s+|[^\w]+)/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function fakeVector(text: string) {
  const vector = Array.from({ length: 12 }, () => 0);
  Array.from(text.toLowerCase()).forEach((char, index) => {
    vector[index % vector.length] += char.charCodeAt(0) / 255;
  });

  const norm =
    Math.sqrt(vector.reduce((sum, value) => sum + value ** 2, 0)) || 1;
  return vector.map((value) => value / norm);
}

export function getMockCapabilities(): BrowserAICapabilities {
  return {
    mock: true,
    offline: false,
    webgpu: false,
    worker: true,
  };
}

export function getMockStatusSnapshot(): BrowserAIStatusSnapshot {
  return {
    capabilities: getMockCapabilities(),
    loadedTasks: Array.from(mockLoadedTasks),
  };
}

function markTaskLoaded(task: BrowserAITask) {
  if (task === "tokenize" || task === "countTokens") {
    mockLoadedTasks.add("tokenize");
    mockLoadedTasks.add("countTokens");
    return;
  }

  if (task === "embed" || task === "retrieve") {
    mockLoadedTasks.add("embed");
    mockLoadedTasks.add("retrieve");
    return;
  }

  mockLoadedTasks.add("generate");
}

export function loadMockTask<T extends BrowserAITask>(task: T) {
  markTaskLoaded(task);

  if (task === "generate") {
    return {
      runtimeLabel: "mock",
      text: "",
    } as unknown as BrowserAIWorkerResponseMap[T];
  }

  if (task === "retrieve") {
    return {
      matches: [],
      runtimeLabel: "mock",
    } as unknown as BrowserAIWorkerResponseMap[T];
  }

  if (task === "embed") {
    return {
      runtimeLabel: "mock",
      vectors: [],
    } as unknown as BrowserAIWorkerResponseMap[T];
  }

  if (task === "countTokens") {
    return {
      breakdowns: [],
    } as unknown as BrowserAIWorkerResponseMap[T];
  }

  return {
    comparisons: [],
  } as unknown as BrowserAIWorkerResponseMap[T];
}

export function disposeMockTask(task?: BrowserAITask) {
  if (!task) {
    mockLoadedTasks.clear();
    return;
  }

  if (task === "tokenize" || task === "countTokens") {
    mockLoadedTasks.delete("tokenize");
    mockLoadedTasks.delete("countTokens");
    return;
  }

  if (task === "embed" || task === "retrieve") {
    mockLoadedTasks.delete("embed");
    mockLoadedTasks.delete("retrieve");
    return;
  }

  mockLoadedTasks.delete("generate");
}

export function runMockTask<T extends BrowserAITask>(
  task: T,
  input: BrowserAIWorkerRequestMap[T]
): BrowserAIWorkerResponseMap[T] {
  markTaskLoaded(task);

  if (task === "tokenize") {
    const text = (input as BrowserAIWorkerRequestMap["tokenize"]).text;
    const gptTokens = roughTokens(text);
    const smollmTokens = text.match(/\S+|\n/g) ?? [];
    const bertTokens = gptTokens.map((token, index) =>
      token.length > 6 && index % 2 === 0
        ? `##${token.slice(Math.floor(token.length / 2))}`
        : token
    );

    return {
      comparisons: [
        {
          id: "gpt",
          label: "GPT-4o tokenizer",
          tokenCount: gptTokens.length,
          tokenIds: gptTokens.map((_, index) => index + 1),
          tokens: gptTokens,
        },
        {
          id: "smollm",
          label: "SmolLM tokenizer",
          tokenCount: smollmTokens.length,
          tokenIds: smollmTokens.map((_, index) => index + 101),
          tokens: smollmTokens,
        },
        {
          id: "bert",
          label: "BERT tokenizer",
          tokenCount: bertTokens.length,
          tokenIds: bertTokens.map((_, index) => index + 201),
          tokens: bertTokens,
        },
      ],
    } as BrowserAIWorkerResponseMap[T];
  }

  if (task === "countTokens") {
    const {
      contextBudget,
      example,
      outputAllowance,
      systemPrompt,
      userPrompt,
    } = input as BrowserAIWorkerRequestMap["countTokens"];

    const gptSections = {
      system: roughTokens(systemPrompt).length,
      example: roughTokens(example).length,
      user: roughTokens(userPrompt).length,
    };
    const smollmSections = {
      system: Math.ceil(gptSections.system * 1.1),
      example: Math.ceil(gptSections.example * 1.1),
      user: Math.ceil(gptSections.user * 1.1),
    };

    return {
      breakdowns: [
        summarizeTokenBudget({
          contextBudget,
          exampleTokens: gptSections.example,
          outputAllowance,
          promptTokens:
            gptSections.system + gptSections.example + gptSections.user + 10,
          systemTokens: gptSections.system,
          tokenizerId: "gpt",
          tokenizerLabel: "GPT-4o tokenizer",
          userTokens: gptSections.user,
        }),
        summarizeTokenBudget({
          contextBudget,
          exampleTokens: smollmSections.example,
          outputAllowance,
          promptTokens:
            smollmSections.system +
            smollmSections.example +
            smollmSections.user +
            18,
          systemTokens: smollmSections.system,
          tokenizerId: "smollm",
          tokenizerLabel: "SmolLM tokenizer",
          userTokens: smollmSections.user,
        }),
      ],
    } as BrowserAIWorkerResponseMap[T];
  }

  if (task === "embed") {
    return {
      runtimeLabel: "mock",
      vectors: (input as BrowserAIWorkerRequestMap["embed"]).texts.map(
        fakeVector
      ),
    } as BrowserAIWorkerResponseMap[T];
  }

  if (task === "retrieve") {
    const { documents, query, topK } =
      input as BrowserAIWorkerRequestMap["retrieve"];
    const queryVector = fakeVector(query);
    const documentVectors = documents.map((document) =>
      fakeVector(document.text)
    );
    const ranked = rankBySimilarity(
      queryVector,
      documentVectors,
      documents,
      topK
    ).map(
      (document): RetrievedDocument => ({
        ...document,
        score: Number(document.score.toFixed(3)),
      })
    );

    return {
      matches: ranked,
      runtimeLabel: "mock",
    } as BrowserAIWorkerResponseMap[T];
  }

  const prompt = (input as BrowserAIWorkerRequestMap["generate"]).prompt;
  const sentences = prompt
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
  const sourceSentence =
    sentences.find((line) => /context:|notes:|article:/i.test(line)) ??
    sentences[sentences.length - 1] ??
    "the prompt";

  return {
    runtimeLabel: "mock",
    text: `Mock local answer: I used ${sourceSentence.slice(0, 120)} to produce a concise response. In the real browser runtime, this comes from the tiny on-device model.`,
  } as BrowserAIWorkerResponseMap[T];
}
