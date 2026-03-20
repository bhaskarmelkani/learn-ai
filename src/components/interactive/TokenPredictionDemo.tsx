import { useEffect, useMemo, useState } from "react";

interface PredictionNode {
  predictions: Record<string, number>;
  next?: Record<string, PredictionNode>;
}

interface Scenario {
  tokens: string[];
  root: PredictionNode;
}

const TERMINAL_TOKEN = "<END>";

const SCENARIOS: Record<string, Scenario> = {
  "The cat sat on the": {
    tokens: ["The", "cat", "sat", "on", "the"],
    root: {
      predictions: {
        mat: 0.25,
        floor: 0.18,
        roof: 0.12,
        table: 0.08,
        bed: 0.07,
        couch: 0.06,
        ground: 0.05,
        chair: 0.04,
        rug: 0.03,
        other: 0.12,
      },
      next: {
        mat: {
          predictions: { ".": 0.46, and: 0.17, while: 0.08, because: 0.07, other: 0.22 },
          next: {
            ".": {
              predictions: { [TERMINAL_TOKEN]: 0.74, Then: 0.09, It: 0.08, Meanwhile: 0.04, other: 0.05 },
            },
          },
        },
        floor: {
          predictions: { ".": 0.39, and: 0.16, near: 0.11, beside: 0.09, other: 0.25 },
        },
        roof: {
          predictions: { ".": 0.22, watching: 0.18, above: 0.13, because: 0.09, other: 0.38 },
        },
      },
    },
  },
  "To be or not to": {
    tokens: ["To", "be", "or", "not", "to"],
    root: {
      predictions: {
        be: 0.72,
        mention: 0.05,
        worry: 0.04,
        say: 0.03,
        do: 0.03,
        have: 0.02,
        think: 0.02,
        know: 0.02,
        fear: 0.01,
        other: 0.06,
      },
      next: {
        be: {
          predictions: { ",": 0.48, ":": 0.16, ".": 0.1, that: 0.09, other: 0.17 },
          next: {
            ",": {
              predictions: { that: 0.41, this: 0.15, or: 0.11, and: 0.09, other: 0.24 },
            },
          },
        },
      },
    },
  },
  "The quick brown fox": {
    tokens: ["The", "quick", "brown", "fox"],
    root: {
      predictions: {
        jumps: 0.45,
        jumped: 0.2,
        is: 0.08,
        ran: 0.05,
        was: 0.04,
        runs: 0.03,
        and: 0.03,
        who: 0.02,
        then: 0.02,
        other: 0.08,
      },
      next: {
        jumps: {
          predictions: { over: 0.59, onto: 0.09, past: 0.08, through: 0.07, other: 0.17 },
          next: {
            over: {
              predictions: { the: 0.68, a: 0.09, another: 0.05, some: 0.04, other: 0.14 },
            },
          },
        },
      },
    },
  },
  "import numpy as": {
    tokens: ["import", "numpy", "as"],
    root: {
      predictions: { np: 0.92, numpy: 0.03, npy: 0.01, n: 0.01, nump: 0.005, other: 0.025 },
      next: {
        np: {
          predictions: { "\n": 0.51, array: 0.13, random: 0.09, ".": 0.08, other: 0.19 },
          next: {
            "\n": {
              predictions: { data: 0.22, x: 0.19, arr: 0.16, values: 0.11, other: 0.32 },
            },
            ".": {
              predictions: { array: 0.28, random: 0.26, zeros: 0.13, mean: 0.08, other: 0.25 },
            },
          },
        },
      },
    },
  },
};

const PROMPTS = Object.keys(SCENARIOS);

function formatToken(token: string) {
  if (token === TERMINAL_TOKEN) return "stop";
  if (token === "\n") return "\\n";
  return token;
}

function samplePrediction(entries: [string, number][]) {
  const total = entries.reduce((sum, [, prob]) => sum + prob, 0);
  let threshold = Math.random() * total;

  for (const [token, prob] of entries) {
    threshold -= prob;
    if (threshold <= 0) return token;
  }

  return entries[entries.length - 1]?.[0];
}

export function TokenPredictionDemo() {
  const [promptIdx, setPromptIdx] = useState(0);
  const [generated, setGenerated] = useState<string[]>([]);
  const [node, setNode] = useState<PredictionNode | null>(SCENARIOS[PROMPTS[0]].root);
  const [showProbs, setShowProbs] = useState(true);

  const prompt = PROMPTS[promptIdx];
  const scenario = SCENARIOS[prompt];

  useEffect(() => {
    setGenerated([]);
    setNode(scenario.root);
  }, [scenario]);

  const preds = useMemo(
    () => Object.entries(node?.predictions ?? {}).sort((a, b) => b[1] - a[1]),
    [node]
  );
  const sampleablePreds = preds.filter(([token]) => token !== "other");
  const maxProb = preds[0]?.[1] ?? 1;

  const selectToken = (token: string) => {
    if (!node) return;

    setGenerated((g) => [...g, token]);

    if (token === TERMINAL_TOKEN) {
      setNode(null);
      return;
    }

    setNode(node.next?.[token] ?? null);
  };

  const reset = () => {
    setGenerated([]);
    setNode(scenario.root);
  };

  const runGreedyStep = () => {
    if (!preds.length) return;
    selectToken(preds[0][0]);
  };

  const runSampleStep = () => {
    const choice = samplePrediction(sampleablePreds);
    if (choice) selectToken(choice);
  };

  return (
    <div className="my-8 space-y-5 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-wrap gap-2">
        {PROMPTS.map((p, i) => (
          <button
            key={p}
            onClick={() => setPromptIdx(i)}
            className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
              i === promptIdx
                ? "bg-cyan-600 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            {p}...
          </button>
        ))}
      </div>

      <div className="min-h-[60px] rounded-2xl border border-stone-200 bg-stone-50 p-3 dark:border-gray-800 dark:bg-gray-950/70">
        <div className="flex flex-wrap items-center gap-2">
          {scenario.tokens.map((t, i) => (
            <span key={i} className="rounded-lg bg-white px-2 py-1 text-sm font-mono text-stone-700 shadow-sm dark:bg-gray-800 dark:text-gray-300">
              {formatToken(t)}
            </span>
          ))}
          {generated.map((t, i) => (
            <span
              key={`g${i}`}
              className={`rounded-lg px-2 py-1 text-sm font-mono font-bold shadow-sm ${
                t === TERMINAL_TOKEN
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                  : "bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300"
              }`}
            >
              {formatToken(t)}
            </span>
          ))}
          {node && <span className="h-5 w-2 animate-pulse rounded-sm bg-cyan-500" />}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-950/60">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-gray-500">
            Generation mode
          </p>
          <p className="mt-1 text-sm text-stone-600 dark:text-gray-400">
            Compare greedy decoding with sampling and notice how the distribution changes after each choice.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={runGreedyStep}
            disabled={!preds.length}
            className="rounded-full bg-stone-900 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
          >
            Pick top token
          </button>
          <button
            onClick={runSampleStep}
            disabled={!sampleablePreds.length}
            className="rounded-full border border-stone-300 px-3 py-2 text-xs font-medium text-stone-700 transition-colors hover:border-stone-400 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-900"
          >
            Sample token
          </button>
          <button
            onClick={reset}
            className="rounded-full border border-stone-300 px-3 py-2 text-xs font-medium text-stone-700 transition-colors hover:border-stone-400 hover:bg-white dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-900"
          >
            Reset
          </button>
        </div>
      </div>

      {!node && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">
          This branch has ended. In a real model, the next distribution always depends on the full updated context.
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-stone-500 dark:text-gray-400">Next token probabilities:</span>
          <button
            onClick={() => setShowProbs((s) => !s)}
            className="text-xs text-stone-400 hover:text-stone-700 dark:hover:text-gray-300"
          >
            {showProbs ? "Hide" : "Show"} probabilities
          </button>
        </div>
        {showProbs && (
          <div className="space-y-2">
            {preds.length > 0 ? (
              preds.map(([token, prob]) => (
                <button
                  key={token}
                  onClick={() => token !== "other" && selectToken(token)}
                  className="group flex w-full items-center gap-2"
                  disabled={token === "other"}
                >
                  <span className="w-16 text-right text-xs font-mono text-stone-600 transition-colors group-hover:text-cyan-700 dark:text-gray-400 dark:group-hover:text-cyan-300">
                    {formatToken(token)}
                  </span>
                  <div className="h-7 flex-1 overflow-hidden rounded-full bg-stone-200 dark:bg-gray-800">
                    <div
                      className="h-full rounded-full bg-cyan-500 transition-all group-hover:bg-cyan-400"
                      style={{ width: `${(prob / maxProb) * 100}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-xs font-mono text-stone-500 dark:text-gray-400">
                    {(prob * 100).toFixed(1)}%
                  </span>
                </button>
              ))
            ) : (
              <p className="text-sm text-stone-500 dark:text-gray-400">No further tokens in this mini-demo.</p>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-stone-500 dark:text-gray-500">
          Click a token manually, pick the top token, or sample from the distribution. The key lesson is that the probabilities update after every step.
        </p>
        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600 dark:bg-gray-800 dark:text-gray-400">
          Step {generated.length + 1}
        </span>
      </div>
    </div>
  );
}
