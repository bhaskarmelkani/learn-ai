export type BrowserAITask =
  | "tokenize"
  | "countTokens"
  | "embed"
  | "generate"
  | "retrieve";

export type BrowserAIResourceKey =
  | "tokenizers"
  | "embeddings"
  | "generation";

export type BrowserAIRuntimeLabel = "WASM" | "WebGPU" | "WASM fallback" | "mock";

export interface BrowserAICapabilities {
  mock: boolean;
  offline: boolean;
  webgpu: boolean;
  worker: boolean;
}

export interface BrowserAIStatusSnapshot {
  capabilities: BrowserAICapabilities;
  loadedTasks: BrowserAITask[];
}

export interface ChatMessage {
  content: string;
  role: "system" | "user" | "assistant";
}

export interface TokenComparison {
  id: string;
  label: string;
  tokenCount: number;
  tokenIds: number[];
  tokens: string[];
}

export interface TokenizeTaskInput {
  text: string;
}

export interface TokenizeTaskResult {
  comparisons: TokenComparison[];
}

export interface TokenBudgetBreakdown {
  chatOverhead: number;
  contextBudget: number;
  exampleTokens: number;
  fits: boolean;
  outputAllowance: number;
  promptTokens: number;
  remaining: number;
  systemTokens: number;
  tokenizerId: string;
  tokenizerLabel: string;
  totalWithOutput: number;
  truncatedBy: number;
  userTokens: number;
}

export interface CountTokensTaskInput {
  contextBudget: number;
  example: string;
  outputAllowance: number;
  systemPrompt: string;
  userPrompt: string;
}

export interface CountTokensTaskResult {
  breakdowns: TokenBudgetBreakdown[];
}

export interface EmbedTaskInput {
  texts: string[];
}

export interface EmbedTaskResult {
  runtimeLabel: BrowserAIRuntimeLabel;
  vectors: number[][];
}

export interface GenerateTaskInput {
  maxNewTokens: number;
  prompt: string;
  temperature: number;
  topK: number;
}

export interface GenerateTaskResult {
  runtimeLabel: BrowserAIRuntimeLabel;
  text: string;
}

export interface RetrievalDocument {
  id: string;
  text: string;
  title: string;
}

export interface RetrievedDocument extends RetrievalDocument {
  score: number;
}

export interface RetrieveTaskInput {
  documents: RetrievalDocument[];
  query: string;
  topK: number;
}

export interface RetrieveTaskResult {
  matches: RetrievedDocument[];
  runtimeLabel: BrowserAIRuntimeLabel;
}

export interface BrowserAIWorkerRequestMap {
  countTokens: CountTokensTaskInput;
  embed: EmbedTaskInput;
  generate: GenerateTaskInput;
  retrieve: RetrieveTaskInput;
  tokenize: TokenizeTaskInput;
}

export interface BrowserAIWorkerResponseMap {
  countTokens: CountTokensTaskResult;
  embed: EmbedTaskResult;
  generate: GenerateTaskResult;
  retrieve: RetrieveTaskResult;
  tokenize: TokenizeTaskResult;
}

export type BrowserAIWorkerControlMessage =
  | {
      id: string;
      type: "cancel";
    }
  | {
      id: string;
      type: "dispose";
      task?: BrowserAITask;
    }
  | {
      id: string;
      task: BrowserAITask;
      type: "load";
    }
  | {
      id: string;
      task: BrowserAITask;
      type: "run";
      input: BrowserAIWorkerRequestMap[BrowserAITask];
    }
  | {
      id: string;
      type: "status";
    };

export type BrowserAIWorkerResponse =
  | {
      id: string;
      result: BrowserAIStatusSnapshot;
      type: "status";
    }
  | {
      id: string;
      result: BrowserAIWorkerResponseMap[BrowserAITask];
      task: BrowserAITask;
      type: "load" | "run";
    }
  | {
      id: string;
      result: null;
      task?: BrowserAITask;
      type: "cancel" | "dispose";
    }
  | {
      error: string;
      id: string;
      task?: BrowserAITask;
      type: "error";
    };
