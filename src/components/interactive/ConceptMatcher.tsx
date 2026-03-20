import { useState } from "react";

const TARGETS = ["input", "output", "parameter", "architecture"] as const;

const ITEMS = [
  { prompt: "House features: square footage, bedrooms, location", answer: "input" },
  { prompt: "Spam / not spam", answer: "output" },
  { prompt: "Weights and biases like w and b", answer: "parameter" },
  { prompt: "Linear model, neural network, transformer", answer: "architecture" },
] as const;

const EVERYDAY_MODELS = [
  { name: "Weather forecast", text: "Input: weather data. Output: tomorrow's temperature or rain chance." },
  { name: "Recommendation system", text: "Input: your clicks and history. Output: a ranked list of items." },
  { name: "Spam filter", text: "Input: email text. Output: spam or not spam." },
];

export function ConceptMatcher() {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const correct = ITEMS.filter((item, index) => answers[index] === item.answer).length;

  return (
    <div className="my-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
            Sort It
          </p>
          <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">
            Match the concept to the role
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600 dark:text-gray-400">
            Pick the right bucket for each example. This is the simplest way to make the model/input/output/parameter/architecture idea tangible.
          </p>
        </div>
        <div className="rounded-full bg-stone-100 px-4 py-2 text-sm font-medium text-stone-700 dark:bg-gray-800 dark:text-gray-200">
          Score: {correct}/{ITEMS.length}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {ITEMS.map((item, index) => {
          const value = answers[index] ?? "";
          const isCorrect = value === item.answer;

          return (
            <div
              key={item.prompt}
              className={`rounded-2xl border p-4 ${
                value
                  ? isCorrect
                    ? "border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/10"
                    : "border-rose-200 bg-rose-50 dark:border-rose-500/20 dark:bg-rose-500/10"
                  : "border-stone-200 bg-stone-50 dark:border-gray-800 dark:bg-gray-950/60"
              }`}
            >
              <p className="text-sm font-semibold text-stone-900 dark:text-white">{item.prompt}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                  Role
                </label>
                <select
                  value={value}
                  onChange={(e) =>
                    setAnswers((current) => ({ ...current, [index]: e.target.value }))
                  }
                  className="rounded-full border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 outline-none transition-colors focus:border-cyan-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                >
                  <option value="">Choose one</option>
                  {TARGETS.map((target) => (
                    <option key={target} value={target}>
                      {target}
                    </option>
                  ))}
                </select>
                <span className="text-xs text-stone-500 dark:text-gray-400">
                  {value ? (isCorrect ? "Correct" : "Try again") : "Pick a bucket"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500 dark:text-gray-500">
          Everyday models
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {EVERYDAY_MODELS.map((model) => (
            <div key={model.name} className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-900">
              <p className="font-semibold text-stone-900 dark:text-white">{model.name}</p>
              <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-gray-400">{model.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
