import { useEffect, useState } from "react";

export type GuidedChoice = {
  value: string;
  label: string;
  explanation: string;
};

export function GuidedPrediction({
  title,
  prompt,
  choices,
  compareText,
  onUnlockChange,
}: {
  title: string;
  prompt: string;
  choices: GuidedChoice[];
  compareText: string;
  onUnlockChange?: (locked: boolean) => void;
}) {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const selectedChoice = choices.find((choice) => choice.value === prediction) ?? null;
  const locked = !submitted;

  useEffect(() => {
    onUnlockChange?.(locked);
  }, [locked, onUnlockChange]);

  return (
    <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50/90 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-800 dark:text-amber-200">
            Guided Mode
          </p>
          <p className="mt-2 text-sm font-semibold text-stone-900 dark:text-white">{title}</p>
          <p className="mt-1 text-sm leading-6 text-stone-700 dark:text-gray-200">{prompt}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            locked
              ? "bg-white text-amber-800 dark:bg-gray-900 dark:text-amber-200"
              : "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300"
          }`}
        >
          {locked ? "Controls locked" : "Prediction captured"}
        </span>
      </div>

      <div className="mt-4 grid gap-2">
        {choices.map((choice) => {
          const active = prediction === choice.value;
          return (
            <button
              key={choice.value}
              type="button"
              onClick={() => setPrediction(choice.value)}
              disabled={submitted}
              className={`rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                active
                  ? "border-amber-400 bg-white text-stone-900 dark:border-amber-300 dark:bg-gray-900 dark:text-white"
                  : "border-transparent bg-white/70 text-stone-700 hover:border-amber-200 dark:bg-gray-900/50 dark:text-gray-300 dark:hover:border-amber-500/20"
              } ${submitted ? "cursor-default opacity-80" : ""}`}
            >
              {choice.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={!prediction || submitted}
          onClick={() => setSubmitted(true)}
          className="rounded-full bg-amber-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Unlock controls
        </button>
        {!submitted && (
          <p className="text-xs text-stone-600 dark:text-gray-300">
            Make a prediction first. The point is to compare your mental model with the demo.
          </p>
        )}
      </div>

      {submitted && selectedChoice && (
        <div className="mt-4 rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm leading-6 text-stone-700 dark:border-emerald-500/20 dark:bg-gray-900 dark:text-gray-200">
          <p>
            <strong>Your prediction:</strong> {selectedChoice.label}
          </p>
          <p className="mt-1">
            <strong>What to compare:</strong> {compareText}
          </p>
          <p className="mt-1">{selectedChoice.explanation}</p>
        </div>
      )}
    </div>
  );
}
