import type { BrowserAIResourceKey, BrowserAITask } from "./types";

export const BROWSER_AI_MODELS = {
  bertTokenizer: {
    id: "Xenova/bert-base-uncased",
    label: "BERT tokenizer",
  },
  embedder: {
    id: "mixedbread-ai/mxbai-embed-xsmall-v1",
    label: "mxbai embed xsmall",
  },
  gptTokenizer: {
    id: "gpt-4o",
    label: "GPT-4o tokenizer",
  },
  tinyGeneration: {
    id: "onnx-community/SmolLM2-135M-Instruct-ONNX-MHA",
    label: "SmolLM2 135M",
  },
} as const;

export const BROWSER_AI_CONTEXT_BUDGETS = [128, 256, 512, 1024] as const;
export const BROWSER_AI_OUTPUT_ALLOWANCES = [48, 96, 160, 256] as const;

export const TASK_RESOURCES: Record<BrowserAITask, BrowserAIResourceKey> = {
  countTokens: "tokenizers",
  embed: "embeddings",
  generate: "generation",
  retrieve: "embeddings",
  tokenize: "tokenizers",
};
