import {
  disposeMockTask,
  getMockCapabilities,
  getMockStatusSnapshot,
  loadMockTask,
  runMockTask,
} from "./mock";
import type {
  BrowserAICapabilities,
  BrowserAIStatusSnapshot,
  BrowserAITask,
  BrowserAIWorkerControlMessage,
  BrowserAIWorkerRequestMap,
  BrowserAIWorkerResponse,
  BrowserAIWorkerResponseMap,
} from "./types";

declare global {
  interface Window {
    __LEARN_AI_BROWSER_AI_MOCK__?: boolean;
  }
}

type PendingRequest = {
  reject: (reason?: unknown) => void;
  resolve: (value: unknown) => void;
};

function createRequestId() {
  return `browser-ai-${Math.random().toString(36).slice(2)}-${Date.now()}`;
}

function getCapabilities(): BrowserAICapabilities {
  if (typeof window === "undefined") {
    return {
      mock: false,
      offline: false,
      webgpu: false,
      worker: false,
    };
  }

  if (window.__LEARN_AI_BROWSER_AI_MOCK__) {
    return getMockCapabilities();
  }

  return {
    mock: false,
    offline: navigator.onLine === false,
    webgpu: "gpu" in navigator,
    worker: typeof Worker !== "undefined",
  };
}

class BrowserAIClient {
  private pending = new Map<string, PendingRequest>();

  private worker: Worker | null = null;

  private ensureWorker() {
    if (
      this.worker ||
      typeof window === "undefined" ||
      window.__LEARN_AI_BROWSER_AI_MOCK__
    ) {
      return this.worker;
    }

    this.worker = new Worker(new URL("./worker.ts", import.meta.url), {
      type: "module",
    });

    this.worker.addEventListener(
      "message",
      (event: MessageEvent<BrowserAIWorkerResponse>) => {
        const response = event.data;
        const pending = this.pending.get(response.id);
        if (!pending) return;

        this.pending.delete(response.id);

        if (response.type === "error") {
          pending.reject(new Error(response.error));
          return;
        }

        pending.resolve(response.result);
      }
    );

    this.worker.addEventListener("error", (event) => {
      const error =
        event.error instanceof Error
          ? event.error
          : new Error("Browser AI worker failed.");
      this.pending.forEach(({ reject }) => reject(error));
      this.pending.clear();
    });

    return this.worker;
  }

  private async send<TResponse>(
    message: BrowserAIWorkerControlMessage,
    fallback: () => TResponse | Promise<TResponse>
  ) {
    const capabilities = getCapabilities();

    if (capabilities.mock) {
      return await fallback();
    }

    if (!capabilities.worker) {
      throw new Error(
        "This browser does not support Web Workers, so the browser AI labs cannot run."
      );
    }

    const worker = this.ensureWorker();
    if (!worker) {
      throw new Error("Browser AI worker could not be created.");
    }

    return await new Promise<TResponse>((resolve, reject) => {
      this.pending.set(message.id, {
        reject,
        resolve: (value) => resolve(value as TResponse),
      });
      worker.postMessage(message);
    });
  }

  async getStatus() {
    const id = createRequestId();
    const capabilities = getCapabilities();

    const result = await this.send<BrowserAIStatusSnapshot>(
      { id, type: "status" },
      () => getMockStatusSnapshot()
    );

    return {
      ...result,
      capabilities,
    } satisfies BrowserAIStatusSnapshot;
  }

  async load<T extends BrowserAITask>(task: T) {
    const id = createRequestId();
    return await this.send<BrowserAIWorkerResponseMap[T]>(
      { id, task, type: "load" },
      () => loadMockTask(task)
    );
  }

  async run<T extends BrowserAITask>(
    task: T,
    input: BrowserAIWorkerRequestMap[T]
  ) {
    const id = createRequestId();
    return await this.send<BrowserAIWorkerResponseMap[T]>(
      { id, input, task, type: "run" },
      () => runMockTask(task, input)
    );
  }

  async cancel() {
    const id = createRequestId();
    await this.send<null>({ id, type: "cancel" }, async () => null);
  }

  async dispose(task?: BrowserAITask) {
    const id = createRequestId();
    await this.send<null>({ id, task, type: "dispose" }, async () => {
      disposeMockTask(task);
      return null;
    });
  }
}

let singletonClient: BrowserAIClient | null = null;

export function getBrowserAIClient() {
  if (!singletonClient) {
    singletonClient = new BrowserAIClient();
  }

  return singletonClient;
}
