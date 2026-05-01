import { useMemo, useState } from "react";

type Mode = "single" | "network";

const XOR_INPUTS: [number, number, number][] = [
  [0, 0, 0],
  [0, 1, 1],
  [1, 0, 1],
  [1, 1, 0],
];

function sigmoid(value: number) {
  return 1 / (1 + Math.exp(-value));
}

function singleNeuron(x1: number, x2: number) {
  return sigmoid(1.0 * x1 + 1.0 * x2 - 0.5);
}

function tinyNetwork(x1: number, x2: number) {
  const h1 = sigmoid(6 * x1 - 6 * x2 - 3);
  const h2 = sigmoid(-6 * x1 + 6 * x2 - 3);
  const output = sigmoid(7 * h1 + 7 * h2 - 3);
  return { h1, h2, output };
}

export function XorDemo() {
  const [mode, setMode] = useState<Mode>("single");

  const results = useMemo(() => {
    return XOR_INPUTS.map(([x1, x2, label]) => {
      if (mode === "single") {
        const score = singleNeuron(x1, x2);
        return { x1, x2, label, score, pred: score >= 0.5 ? 1 : 0, hidden: [] as number[] };
      }

      const { h1, h2, output } = tinyNetwork(x1, x2);
      return {
        x1,
        x2,
        label,
        score: output,
        pred: output >= 0.5 ? 1 : 0,
        hidden: [h1, h2],
      };
    });
  }, [mode]);

  const correct = results.filter((row) => row.pred === row.label).length;
  const params = mode === "single" ? 3 : 9;

  return (
    <div className="my-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
              XOR Proof
            </p>
            <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">
              One detector fails, two hidden detectors can succeed
            </h3>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-gray-400">
              XOR is 1 only when the inputs are different. That pattern is the clean proof that one boundary can fail while a tiny two-layer network can still solve the problem.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setMode("single")}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                mode === "single"
                  ? "bg-cyan-600 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              Single neuron
            </button>
            <button
              onClick={() => setMode("network")}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                mode === "network"
                  ? "bg-cyan-600 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              Two-layer network
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                Parameters
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-stone-900 dark:text-white">
                {params}
              </p>
            </div>
            <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                Correct answers
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-stone-900 dark:text-white">
                {correct}/4
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-100">
            What to notice: the two-layer network is still tiny. Its power comes from combining two hidden detectors before making the final decision.
          </div>

          <p className="text-xs text-stone-500 dark:text-gray-500">
            The two-layer mode uses a fixed tiny network with explicit weights. It is not hand-scoring each XOR case separately.
          </p>
        </div>

        <div className="flex-1 space-y-4">
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
              Truth table
            </p>
            <div className="mt-3 grid gap-2 text-sm">
              {results.map((row) => {
                const isCorrect = row.pred === row.label;
                return (
                  <div
                    key={`${row.x1}-${row.x2}`}
                    className={`rounded-2xl px-3 py-3 ${
                      isCorrect
                        ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-100"
                        : "bg-rose-50 text-rose-900 dark:bg-rose-500/10 dark:text-rose-100"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">
                        {row.x1} XOR {row.x2}
                      </p>
                      <p className="font-mono text-xs">
                        pred {row.pred} | p = {(row.score * 100).toFixed(0)}%
                      </p>
                    </div>
                    {mode === "network" && (
                      <p className="mt-1 text-xs opacity-80">
                        hidden detectors: [{row.hidden[0].toFixed(2)}, {row.hidden[1].toFixed(2)}]
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
