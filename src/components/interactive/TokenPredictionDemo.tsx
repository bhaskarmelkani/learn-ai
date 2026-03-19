import { useState } from "react";

const SEQUENCES: Record<string, { tokens: string[]; predictions: Record<string, number> }> = {
  "The cat sat on the": {
    tokens: ["The", "cat", "sat", "on", "the"],
    predictions: { mat: 0.25, floor: 0.18, roof: 0.12, table: 0.08, bed: 0.07, couch: 0.06, ground: 0.05, chair: 0.04, rug: 0.03, other: 0.12 },
  },
  "To be or not to": {
    tokens: ["To", "be", "or", "not", "to"],
    predictions: { be: 0.72, mention: 0.05, worry: 0.04, say: 0.03, do: 0.03, have: 0.02, think: 0.02, know: 0.02, fear: 0.01, other: 0.06 },
  },
  "The quick brown fox": {
    tokens: ["The", "quick", "brown", "fox"],
    predictions: { jumps: 0.45, jumped: 0.20, is: 0.08, ran: 0.05, was: 0.04, runs: 0.03, and: 0.03, who: 0.02, then: 0.02, other: 0.08 },
  },
  "import numpy as": {
    tokens: ["import", "numpy", "as"],
    predictions: { np: 0.92, numpy: 0.03, npy: 0.01, n: 0.01, nump: 0.005, other: 0.025 },
  },
};

const PROMPTS = Object.keys(SEQUENCES);

export function TokenPredictionDemo() {
  const [promptIdx, setPromptIdx] = useState(0);
  const [generated, setGenerated] = useState<string[]>([]);
  const [showProbs, setShowProbs] = useState(true);

  const prompt = PROMPTS[promptIdx];
  const seq = SEQUENCES[prompt];
  const preds = Object.entries(seq.predictions).sort((a, b) => b[1] - a[1]);
  const maxProb = preds[0][1];

  const selectToken = (token: string) => {
    setGenerated((g) => [...g, token]);
  };

  const reset = () => {
    setGenerated([]);
  };

  const changePrompt = (idx: number) => {
    setPromptIdx(idx);
    setGenerated([]);
  };

  return (
    <div className="my-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-6 space-y-4">
      {/* Prompt selector */}
      <div className="flex flex-wrap gap-2">
        {PROMPTS.map((p, i) => (
          <button
            key={p}
            onClick={() => changePrompt(i)}
            className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
              i === promptIdx
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {p}...
          </button>
        ))}
      </div>

      {/* Generated sequence */}
      <div className="flex flex-wrap items-center gap-1 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 min-h-[48px]">
        {seq.tokens.map((t, i) => (
          <span key={i} className="px-2 py-1 rounded text-sm font-mono text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700">
            {t}
          </span>
        ))}
        {generated.map((t, i) => (
          <span key={`g${i}`} className="px-2 py-1 rounded text-sm font-mono text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-500/20 font-bold">
            {t}
          </span>
        ))}
        <span className="w-2 h-5 bg-blue-500 animate-pulse rounded-sm" />
      </div>

      {/* Probability distribution */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Next token probabilities:</span>
          <button
            onClick={() => setShowProbs((s) => !s)}
            className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {showProbs ? "Hide" : "Show"} probabilities
          </button>
        </div>
        {showProbs && (
          <div className="space-y-1.5">
            {preds.map(([token, prob]) => (
              <button
                key={token}
                onClick={() => token !== "other" && selectToken(token)}
                className="w-full flex items-center gap-2 group"
                disabled={token === "other"}
              >
                <span className="w-16 text-right text-xs font-mono text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {token}
                </span>
                <div className="flex-1 h-6 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                  <div
                    className="h-full bg-blue-400 dark:bg-blue-500 rounded transition-all group-hover:bg-blue-500 dark:group-hover:bg-blue-400"
                    style={{ width: `${(prob / maxProb) * 100}%` }}
                  />
                </div>
                <span className="w-12 text-right text-xs font-mono text-gray-500 dark:text-gray-400">
                  {(prob * 100).toFixed(1)}%
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Click a token to "generate" it. This is how LLMs work — one token at a time!
        </p>
        <button onClick={reset} className="text-xs px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600">
          Reset
        </button>
      </div>
    </div>
  );
}
