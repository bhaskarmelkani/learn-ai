import { useMemo, useState } from "react";
import { useLearning } from "../../learning/LearningContext";

export function Checkpoint({
  id,
  chapter,
  prompt,
  concepts,
  options,
}: {
  id: string;
  chapter: number;
  prompt: string;
  concepts: string[];
  options: Array<{
    label: string;
    explanation: string;
    correct?: boolean;
  }>;
}) {
  const {
    recordCheckpoint,
    state: { checkpoints },
  } = useLearning();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const stored = checkpoints[id];
  const selectedOption =
    selectedIndex === null ? null : options[selectedIndex] ?? null;

  const status = useMemo(() => {
    if (!stored) return null;
    return stored.correct ? "correct" : "retry";
  }, [stored]);

  return (
    <div className="my-6 rounded-2xl border border-amber-200 bg-amber-50/80 px-5 py-4 shadow-sm dark:border-amber-500/20 dark:bg-amber-500/10">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-800 dark:text-amber-200">
            Checkpoint
          </p>
          <p className="mt-2 text-base font-semibold text-amber-950 dark:text-amber-100">
            {prompt}
          </p>
        </div>
        {status && (
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              status === "correct"
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300"
                : "bg-rose-100 text-rose-800 dark:bg-rose-500/10 dark:text-rose-200"
            }`}
          >
            {status === "correct" ? "Understood" : "Review again"}
          </span>
        )}
      </div>

      <div className="mt-4 grid gap-2">
        {options.map((option, index) => {
          const active = selectedIndex === index;
          return (
            <button
              key={option.label}
              type="button"
              onClick={() => {
                setSelectedIndex(index);
                recordCheckpoint({
                  id,
                  chapter,
                  prompt,
                  concepts,
                  correct: Boolean(option.correct),
                  explanation: option.explanation,
                });
              }}
              className={`rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                active
                  ? option.correct
                    ? "border-emerald-300 bg-white text-stone-900 dark:border-emerald-400 dark:bg-gray-900 dark:text-white"
                    : "border-rose-300 bg-white text-stone-900 dark:border-rose-400 dark:bg-gray-900 dark:text-white"
                  : "border-transparent bg-white/70 text-stone-700 hover:border-amber-200 dark:bg-gray-900/40 dark:text-gray-300 dark:hover:border-amber-500/20"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {selectedOption && (
        <div
          className={`mt-4 rounded-2xl border px-4 py-3 text-sm leading-6 ${
            selectedOption.correct
              ? "border-emerald-200 bg-white text-emerald-950 dark:border-emerald-500/20 dark:bg-gray-900 dark:text-emerald-100"
              : "border-rose-200 bg-white text-rose-950 dark:border-rose-500/20 dark:bg-gray-900 dark:text-rose-100"
          }`}
        >
          <p className="font-semibold">
            {selectedOption.correct
              ? "Yes. That matches the intended mental model."
              : "Not quite. This is the misconception to correct."}
          </p>
          <p className="mt-1">{selectedOption.explanation}</p>
        </div>
      )}
    </div>
  );
}
