import { useMemo, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";

const PYODIDE_VERSION = "0.29.0";
const PYODIDE_INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

interface NotebookCell {
  title: string;
  code: string;
  packages?: string[];
  description?: string;
}

interface PythonNotebookProps {
  title: string;
  description: string;
  cells: NotebookCell[];
  globalPackages?: string[];
}

interface PyodideWindow extends Window {
  loadPyodide?: (options: { indexURL: string }) => Promise<PyodideApi>;
  __pyodideScriptPromise?: Promise<void>;
}

interface PyodideApi {
  loadPackage: (packages: string[] | string) => Promise<void>;
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (options: { batched: (message: string) => void }) => void;
  setStderr: (options: { batched: (message: string) => void }) => void;
}

async function ensurePyodideScript() {
  const pyodideWindow = window as PyodideWindow;

  if (pyodideWindow.loadPyodide) return;
  if (pyodideWindow.__pyodideScriptPromise) {
    await pyodideWindow.__pyodideScriptPromise;
    return;
  }

  pyodideWindow.__pyodideScriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `${PYODIDE_INDEX_URL}pyodide.js`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Unable to load the Pyodide runtime."));
    document.head.appendChild(script);
  });

  await pyodideWindow.__pyodideScriptPromise;
}

export function PythonNotebook({
  title,
  description,
  cells,
  globalPackages = [],
}: PythonNotebookProps) {
  const extensions = useMemo(() => [python()], []);
  const [codes, setCodes] = useState(cells.map((cell) => cell.code));
  const [outputs, setOutputs] = useState<string[]>(() => cells.map(() => ""));
  const [runningIndex, setRunningIndex] = useState<number | null>(null);
  const [kernelStatus, setKernelStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [kernelMessage, setKernelMessage] = useState("Python kernel is idle.");
  const kernelRef = useRef<PyodideApi | null>(null);
  const kernelPromiseRef = useRef<Promise<PyodideApi> | null>(null);
  const loadedPackagesRef = useRef<Set<string>>(new Set());

  const updateOutput = (index: number, value: string) => {
    setOutputs((current) =>
      current.map((output, outputIndex) => (outputIndex === index ? value : output))
    );
  };

  const getKernel = async () => {
    if (kernelRef.current) return kernelRef.current;
    if (kernelPromiseRef.current) return kernelPromiseRef.current;

    kernelPromiseRef.current = (async () => {
      setKernelStatus("loading");
      setKernelMessage("Loading the Python runtime for this notebook...");
      await ensurePyodideScript();
      const pyodideWindow = window as PyodideWindow;
      if (!pyodideWindow.loadPyodide) {
        throw new Error("Pyodide did not load correctly.");
      }
      const kernel = await pyodideWindow.loadPyodide({ indexURL: PYODIDE_INDEX_URL });
      kernelRef.current = kernel;
      setKernelStatus("ready");
      setKernelMessage("Kernel ready. Edit a cell and run it.");
      return kernel;
    })();

    try {
      return await kernelPromiseRef.current;
    } catch (error) {
      kernelPromiseRef.current = null;
      kernelRef.current = null;
      setKernelStatus("error");
      setKernelMessage(error instanceof Error ? error.message : "Kernel failed to load.");
      throw error;
    }
  };

  const ensurePackages = async (kernel: PyodideApi, packages: string[]) => {
    const missing = packages.filter((pkg) => !loadedPackagesRef.current.has(pkg));
    if (!missing.length) return;

    setKernelMessage(`Loading Python packages: ${missing.join(", ")}...`);
    await kernel.loadPackage(missing);
    missing.forEach((pkg) => loadedPackagesRef.current.add(pkg));
    setKernelMessage("Kernel ready. Edit a cell and run it.");
  };

  const executeCell = async (index: number) => {
    const buffer: string[] = [];
    const append = (message: string) => {
      const trimmed = message.trimEnd();
      if (trimmed) buffer.push(trimmed);
      updateOutput(index, buffer.join("\n"));
    };

    setRunningIndex(index);
    updateOutput(index, "Running...");

    try {
      const kernel = await getKernel();
      kernel.setStdout({ batched: append });
      kernel.setStderr({ batched: append });

      await ensurePackages(kernel, [...globalPackages, ...(cells[index].packages ?? [])]);

      const result = await kernel.runPythonAsync(codes[index]);
      if (typeof result !== "undefined" && result !== null) {
        append(String(result));
      }

      if (!buffer.length) {
        updateOutput(index, "Cell completed with no printed output.");
      }
    } catch (error) {
      updateOutput(
        index,
        error instanceof Error ? error.message : "This cell failed to execute."
      );
      setKernelStatus("error");
      setKernelMessage("Kernel hit an error. You can restart it and try again.");
    } finally {
      setRunningIndex(null);
    }
  };

  const runAllCells = async () => {
    for (let index = 0; index < cells.length; index += 1) {
      // eslint-disable-next-line no-await-in-loop
      await executeCell(index);
    }
  };

  const restartKernel = () => {
    kernelRef.current = null;
    kernelPromiseRef.current = null;
    loadedPackagesRef.current = new Set();
    setKernelStatus("idle");
    setKernelMessage("Kernel restarted. Run a cell to start a fresh Python session.");
    setOutputs(cells.map(() => ""));
  };

  return (
    <div className="not-prose my-10 overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="border-b border-stone-200 bg-gradient-to-r from-stone-50 via-white to-cyan-50 px-5 py-4 dark:border-gray-800 dark:from-gray-900 dark:via-gray-900 dark:to-cyan-500/10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
              Runnable Notebook
            </p>
            <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">{title}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600 dark:text-gray-400">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={runAllCells}
              disabled={runningIndex !== null}
              className="rounded-full bg-stone-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
            >
              Run all cells
            </button>
            <button
              onClick={restartKernel}
              disabled={runningIndex !== null}
              className="rounded-full border border-stone-300 px-4 py-2 text-xs font-medium text-stone-700 transition-colors hover:border-stone-400 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Restart kernel
            </button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-gray-500">
          <span
            className={`rounded-full px-3 py-1 font-medium ${
              kernelStatus === "ready"
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300"
                : kernelStatus === "error"
                  ? "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300"
                  : "bg-stone-200 text-stone-700 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            Kernel: {kernelStatus}
          </span>
          <span>{kernelMessage}</span>
        </div>
      </div>

      <div className="space-y-6 px-5 py-5">
        {cells.map((cell, index) => (
          <section key={cell.title} className="rounded-[1.5rem] border border-stone-200 bg-stone-50/80 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-gray-500">
                  Cell {index + 1}
                </p>
                <h4 className="mt-1 text-base font-semibold text-stone-900 dark:text-white">
                  {cell.title}
                </h4>
                {cell.description && (
                  <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-gray-400">
                    {cell.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => executeCell(index)}
                disabled={runningIndex !== null}
                className="rounded-full bg-cyan-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {runningIndex === index ? "Running..." : "Run cell"}
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white dark:border-gray-800 dark:bg-gray-900">
              <CodeMirror
                value={codes[index]}
                height="260px"
                theme="dark"
                extensions={extensions}
                basicSetup={{ foldGutter: false, autocompletion: false }}
                onChange={(value) =>
                  setCodes((current) =>
                    current.map((code, codeIndex) => (codeIndex === index ? value : code))
                  )
                }
              />
            </div>

            <div className="mt-3 overflow-hidden rounded-2xl border border-stone-200 bg-stone-950 dark:border-gray-800">
              <div className="border-b border-stone-800 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                Output
              </div>
              <pre className="max-h-72 overflow-auto px-4 py-4 text-sm leading-6 text-stone-100 whitespace-pre-wrap">
                {outputs[index] || "Run this cell to see its output."}
              </pre>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
