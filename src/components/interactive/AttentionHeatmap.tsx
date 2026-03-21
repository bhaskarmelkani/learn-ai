import { useState, useMemo } from "react";

/**
 * Simplified, pre-computed attention weights for demonstration.
 * Each sentence has a matrix where rows = "attending token" and cols = "attended-to token".
 * Values are normalized per row (sum to ~1).
 */

type AttentionExample = {
  label: string;
  tokens: string[];
  weights: number[][];
};

const EXAMPLES: AttentionExample[] = [
  {
    label: "The cat sat on the mat",
    tokens: ["The", "cat", "sat", "on", "the", "mat"],
    weights: [
      [0.60, 0.15, 0.10, 0.05, 0.05, 0.05],
      [0.10, 0.45, 0.20, 0.05, 0.05, 0.15],
      [0.08, 0.35, 0.30, 0.12, 0.05, 0.10],
      [0.05, 0.10, 0.25, 0.30, 0.10, 0.20],
      [0.15, 0.05, 0.05, 0.10, 0.40, 0.25],
      [0.05, 0.15, 0.15, 0.15, 0.20, 0.30],
    ],
  },
  {
    label: "She gave him the book because he asked",
    tokens: ["She", "gave", "him", "the", "book", "because", "he", "asked"],
    weights: [
      [0.50, 0.15, 0.10, 0.05, 0.05, 0.05, 0.05, 0.05],
      [0.20, 0.25, 0.20, 0.05, 0.15, 0.05, 0.05, 0.05],
      [0.15, 0.20, 0.25, 0.05, 0.05, 0.05, 0.20, 0.05],
      [0.05, 0.05, 0.05, 0.30, 0.40, 0.05, 0.05, 0.05],
      [0.05, 0.15, 0.10, 0.25, 0.25, 0.05, 0.05, 0.10],
      [0.05, 0.15, 0.05, 0.05, 0.10, 0.30, 0.10, 0.20],
      [0.30, 0.05, 0.25, 0.05, 0.05, 0.05, 0.20, 0.05],
      [0.05, 0.10, 0.10, 0.05, 0.10, 0.10, 0.20, 0.30],
    ],
  },
  {
    label: "The bank by the river was closed",
    tokens: ["The", "bank", "by", "the", "river", "was", "closed"],
    weights: [
      [0.45, 0.30, 0.05, 0.05, 0.05, 0.05, 0.05],
      [0.10, 0.25, 0.10, 0.05, 0.30, 0.05, 0.15],
      [0.05, 0.20, 0.25, 0.15, 0.25, 0.05, 0.05],
      [0.05, 0.05, 0.05, 0.30, 0.40, 0.10, 0.05],
      [0.05, 0.30, 0.15, 0.15, 0.20, 0.05, 0.10],
      [0.05, 0.25, 0.05, 0.05, 0.10, 0.30, 0.20],
      [0.05, 0.25, 0.05, 0.05, 0.10, 0.20, 0.30],
    ],
  },
];

function heatColor(value: number, dark: boolean): string {
  // value 0..1 → color intensity
  const clamped = Math.max(0, Math.min(1, value));
  if (dark) {
    const r = Math.round(clamped * 120);
    const g = Math.round(clamped * 180);
    const b = Math.round(clamped * 255);
    return `rgb(${r}, ${g}, ${b})`;
  }
  const r = Math.round(255 - clamped * 180);
  const g = Math.round(255 - clamped * 120);
  const b = 255;
  return `rgb(${r}, ${g}, ${b})`;
}

export function AttentionHeatmap() {
  const [exampleIndex, setExampleIndex] = useState(0);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );

  // Watch for theme changes
  useMemo(() => {
    if (typeof window === "undefined") return;
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const example = EXAMPLES[exampleIndex];
  const { tokens, weights } = example;

  return (
    <div className="my-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
          Attention Heatmap
        </p>
        <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">
          Which tokens attend to which?
        </h3>
        <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-gray-400">
          Each row shows how much one token "pays attention to" every other token. Brighter cells mean stronger attention. Hover over a row to highlight the attention pattern for that token.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {EXAMPLES.map((ex, i) => (
          <button
            key={ex.label}
            type="button"
            onClick={() => { setExampleIndex(i); setHoveredRow(null); }}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              i === exampleIndex
                ? "border-cyan-300 bg-cyan-50 text-cyan-800 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-200"
                : "border-stone-200 text-stone-600 hover:border-stone-300 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600"
            }`}
          >
            {ex.label}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="px-1 py-1 text-right text-xs text-stone-400 dark:text-gray-500" />
              {tokens.map((token, j) => (
                <th
                  key={`h-${j}`}
                  className="px-1 py-1 text-center text-xs font-medium text-stone-600 dark:text-gray-300"
                  style={{ minWidth: 44 }}
                >
                  <span className="inline-block -rotate-45 origin-center whitespace-nowrap">
                    {token}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tokens.map((rowToken, i) => (
              <tr
                key={`r-${i}`}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                className="transition-opacity"
                style={{
                  opacity: hoveredRow === null || hoveredRow === i ? 1 : 0.3,
                }}
              >
                <td className="pr-2 py-1 text-right text-xs font-medium text-stone-600 dark:text-gray-300 whitespace-nowrap">
                  {rowToken}
                </td>
                {weights[i].map((w, j) => (
                  <td
                    key={`c-${i}-${j}`}
                    className="px-0.5 py-0.5"
                  >
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-[10px] font-mono transition-colors md:h-10 md:w-10"
                      style={{ backgroundColor: heatColor(w, isDark) }}
                      title={`${rowToken} → ${tokens[j]}: ${(w * 100).toFixed(0)}%`}
                    >
                      <span className={w > 0.25 ? "text-white" : "text-stone-600 dark:text-gray-300"}>
                        {(w * 100).toFixed(0)}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hoveredRow !== null && (
        <div className="mt-3 rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-100">
          <span className="font-semibold">"{tokens[hoveredRow]}"</span> attends most to{" "}
          <span className="font-semibold">
            "{tokens[weights[hoveredRow].indexOf(Math.max(...weights[hoveredRow]))]}"
          </span>{" "}
          ({(Math.max(...weights[hoveredRow]) * 100).toFixed(0)}%)
        </div>
      )}

      <div className="mt-4 rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-100">
        <p className="font-semibold">What to notice</p>
        <p className="mt-1">
          Tokens often attend strongly to themselves and to nearby context. In "The bank by the river was closed," notice how "bank" attends to "river" — the context changes its meaning from a financial institution to a riverbank.
        </p>
      </div>
    </div>
  );
}
