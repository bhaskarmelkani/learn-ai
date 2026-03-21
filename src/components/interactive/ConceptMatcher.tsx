import { useState } from "react";

const TARGETS = ["input", "output", "parameter", "architecture"] as const;

const ITEMS = [
  { prompt: "House features: size, bedrooms, location", answer: "input" },
  { prompt: "Spam or not spam", answer: "output" },
  { prompt: "Weights and biases like w and b", answer: "parameter" },
  { prompt: "Linear model, neural network, transformer", answer: "architecture" },
] as const;

const EVERYDAY_MODELS = [
  {
    name: "Weather forecast",
    input: "temperature, pressure, humidity, cloud patterns",
    output: "tomorrow's rain chance or temperature",
  },
  {
    name: "Recommendation system",
    input: "clicks, watch history, likes, skips",
    output: "a ranked list of suggested items",
  },
  {
    name: "Spam filter",
    input: "email text, links, sender signals",
    output: "spam or not spam",
  },
] as const;

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
            Match each example to its role in a model
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600 dark:text-gray-400">
            The point is not memorization. It is to build the instinct of asking: what goes in, what comes out, what numbers get learned, and what overall shape did we choose?
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
              <div className="mt-3 flex flex-wrap gap-2">
                {TARGETS.map((target) => (
                  <button
                    key={target}
                    onClick={() =>
                      setAnswers((current) => ({ ...current, [index]: target }))
                    }
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      value === target
                        ? "bg-cyan-600 text-white"
                        : "bg-white text-stone-600 hover:bg-stone-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    {target}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-stone-500 dark:text-gray-400">
                {value ? (isCorrect ? "Correct" : "Not quite yet") : "Choose the best role"}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500 dark:text-gray-500">
          Everyday model snapshots
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {EVERYDAY_MODELS.map((model) => (
            <div key={model.name} className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-900">
              <p className="font-semibold text-stone-900 dark:text-white">{model.name}</p>
              <div className="mt-4 space-y-3 text-sm leading-6 text-stone-600 dark:text-gray-400">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
                    Input
                  </p>
                  <p className="mt-1">{model.input}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-700 dark:text-emerald-300">
                    Output
                  </p>
                  <p className="mt-1">{model.output}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
