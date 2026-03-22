import { useEffect, useState } from "react";
import { getBrowserAIClient } from "./client";
import type {
  BrowserAIStatusSnapshot,
  BrowserAITask,
  BrowserAIWorkerRequestMap,
  BrowserAIWorkerResponseMap,
} from "./types";

type BrowserAIPhase =
  | "error"
  | "idle"
  | "loading"
  | "offline"
  | "ready"
  | "running"
  | "unsupported";

const EMPTY_STATUS: BrowserAIStatusSnapshot = {
  capabilities: {
    mock: false,
    offline: false,
    webgpu: false,
    worker: false,
  },
  loadedTasks: [],
};

export function useBrowserAI<T extends BrowserAITask>(task: T) {
  const [phase, setPhase] = useState<BrowserAIPhase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<BrowserAIStatusSnapshot>(EMPTY_STATUS);
  const [lastResult, setLastResult] = useState<
    BrowserAIWorkerResponseMap[T] | null
  >(null);

  useEffect(() => {
    let active = true;

    const syncStatus = async () => {
      try {
        const nextStatus = await getBrowserAIClient().getStatus();
        if (!active) return;

        setStatus(nextStatus);
        if (!nextStatus.capabilities.worker && !nextStatus.capabilities.mock) {
          setPhase("unsupported");
        } else if (nextStatus.capabilities.offline) {
          setPhase((current) => (current === "ready" ? current : "offline"));
        }
      } catch (nextError) {
        if (!active) return;

        setError(
          nextError instanceof Error
            ? nextError.message
            : "Browser AI status failed."
        );
        setPhase("error");
      }
    };

    syncStatus();
    const handleConnectionChange = () => {
      void syncStatus();
    };

    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    return () => {
      active = false;
      window.removeEventListener("online", handleConnectionChange);
      window.removeEventListener("offline", handleConnectionChange);
    };
  }, []);

  const load = async () => {
    setError(null);
    setPhase("loading");

    try {
      const result = await getBrowserAIClient().load(task);
      const nextStatus = await getBrowserAIClient().getStatus();
      setStatus(nextStatus);
      setPhase("ready");
      return result;
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : "Browser AI load failed."
      );
      setPhase("error");
      throw nextError;
    }
  };

  const run = async (input: BrowserAIWorkerRequestMap[T]) => {
    setError(null);
    setPhase(status.loadedTasks.includes(task) ? "running" : "loading");

    try {
      if (!status.loadedTasks.includes(task)) {
        await getBrowserAIClient().load(task);
      }

      const result = await getBrowserAIClient().run(task, input);
      const nextStatus = await getBrowserAIClient().getStatus();
      setStatus(nextStatus);
      setLastResult(result);
      setPhase("ready");
      return result;
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : "Browser AI task failed."
      );
      setPhase("error");
      throw nextError;
    }
  };

  const cancel = async () => {
    await getBrowserAIClient().cancel();
    setPhase("ready");
  };

  const dispose = async () => {
    await getBrowserAIClient().dispose(task);
    const nextStatus = await getBrowserAIClient().getStatus();
    setStatus(nextStatus);
    setPhase("idle");
  };

  return {
    cancel,
    dispose,
    error,
    isLoaded: status.loadedTasks.includes(task),
    lastResult,
    load,
    phase,
    run,
    status,
  };
}
