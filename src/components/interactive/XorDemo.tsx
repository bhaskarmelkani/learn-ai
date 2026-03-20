import { useMemo, useState } from "react";

type Activation = "linear" | "relu" | "sigmoid";
type Mode = "single" | "network";

const XOR_INPUTS: [number, number, number][] = [
  [0, 0, 0],
  [0, 1, 1],
  [1, 0, 1],
  [1, 1, 0],
];

function activate(value: number, activation: Activation) {
  if (activation === "relu") return Math.max(0, value);
  if (activation === "sigmoid") return 1 / (1 + Math.exp(-value));
  return value;
}

function sigmoid(value: number) {
  return 1 / (1 + Math.exp(-value));
}

export function XorDemo() {
  const [mode, setMode] = useState<Mode>("network");
  const [activation, setActivation] = useState<Activation>("relu");
  const [hiddenUnits, setHiddenUnits] = useState(2);
  const [w1, setW1] = useState(1.5);
  const [w2, setW2] = useState(1.5);
  const [b, setB] = useState(-1);

  const results = useMemo(() => {
    return XOR_INPUTS.map(([x1, x2, label]) => {
      let score = 0;
      if (mode === "single") {
        score = sigmoid(w1 * x1 + w2 * x2 + b);
      } else {
        const hidden: number[] = [];
        if (hiddenUnits >= 1) hidden.push(activate(x1 - x2, activation));
        if (hiddenUnits >= 2) hidden.push(activate(x2 - x1, activation));
        while (hidden.length < hiddenUnits) {
          hidden.push(activate(0, activation));
        }
        score = sigmoid(hidden.reduce((sum, value) => sum + value, 0) - 0.5);
      }
      const pred = score > 0.5 ? 1 : 0;
      return { x1, x2, label, score, pred };
    });
  }, [activation, b, hiddenUnits, mode, w1, w2]);

  const correct = results.filter((row) => row.pred === row.label).length;
  const params =
    mode === "single"
      ? 3
      : hiddenUnits * 2 + hiddenUnits + hiddenUnits + 1;

  return (
    <div className="my-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
              XOR Lab
            </p>
            <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">
              See why one neuron is not enough
            </h3>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-gray-400">
              XOR is the classic example that forces us to add a hidden layer. You can keep the network tiny and still see the reason for depth.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
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
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">Parameters</p>
              <p className="mt-1 font-mono text-lg font-semibold text-stone-900 dark:text-white">{params}</p>
            </div>
            <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">Score</p>
              <p className="mt-1 font-mono text-lg font-semibold text-stone-900 dark:text-white">{correct}/4 correct</p>
            </div>
          </div>

          {mode === "single" ? (
            <div className="space-y-3">
              <p className="text-sm text-stone-600 dark:text-gray-400">
                A single neuron can only draw one linear boundary.
              </p>
              <div className="grid gap-3">
                <label className="flex items-center gap-3 text-sm">
                  <span className="w-8 font-mono text-stone-500 dark:text-gray-400">w1</span>
                  <input type="range" min="-4" max="4" step="0.1" value={w1} onChange={(e) => setW1(parseFloat(e.target.value))} className="flex-1" />
                  <span className="w-14 font-mono text-stone-700 dark:text-gray-300">{w1.toFixed(1)}</span>
                </label>
                <label className="flex items-center gap-3 text-sm">
                  <span className="w-8 font-mono text-stone-500 dark:text-gray-400">w2</span>
                  <input type="range" min="-4" max="4" step="0.1" value={w2} onChange={(e) => setW2(parseFloat(e.target.value))} className="flex-1" />
                  <span className="w-14 font-mono text-stone-700 dark:text-gray-300">{w2.toFixed(1)}</span>
                </label>
                <label className="flex items-center gap-3 text-sm">
                  <span className="w-8 font-mono text-stone-500 dark:text-gray-400">b</span>
                  <input type="range" min="-4" max="4" step="0.1" value={b} onChange={(e) => setB(parseFloat(e.target.value))} className="flex-1" />
                  <span className="w-14 font-mono text-stone-700 dark:text-gray-300">{b.toFixed(1)}</span>
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-stone-600 dark:text-gray-400">
                A hidden layer with non-linearity can separate the XOR pattern.
              </p>
              <div className="flex flex-wrap gap-2">
                {(["linear", "relu", "sigmoid"] as Activation[]).map((item) => (
                  <button
                    key={item}
                    onClick={() => setActivation(item)}
                    className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                      activation === item
                        ? "bg-cyan-600 text-white"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-3 text-sm">
                <span className="w-24 font-mono text-stone-500 dark:text-gray-400">hidden</span>
                <input type="range" min="1" max="4" step="1" value={hiddenUnits} onChange={(e) => setHiddenUnits(parseInt(e.target.value, 10))} className="flex-1" />
                <span className="w-14 font-mono text-stone-700 dark:text-gray-300">{hiddenUnits}</span>
              </label>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-4">
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
              XOR truth table
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
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
                    <p className="font-medium">
                      {row.x1} XOR {row.x2}
                    </p>
                    <p className="text-xs opacity-80">
                      expected {row.label}, got {row.pred} ({(row.score * 100).toFixed(0)}%)
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-100">
            The key lesson is not that neural nets are complicated. It is that non-linearity lets them represent patterns a single straight line cannot.
          </div>
        </div>
      </div>
    </div>
  );
}
