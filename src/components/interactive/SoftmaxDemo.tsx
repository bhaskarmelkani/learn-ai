import { useMemo, useState } from "react";
import { Slider } from "./Slider";

const LABELS = ["Cat", "Dog", "Bird"] as const;

function softmax(values: number[]) {
  const max = Math.max(...values);
  const exps = values.map((value) => Math.exp(value - max));
  const total = exps.reduce((sum, value) => sum + value, 0) || 1;
  return exps.map((value) => value / total);
}

export function SoftmaxDemo() {
  const [cat, setCat] = useState(2.2);
  const [dog, setDog] = useState(1.1);
  const [bird, setBird] = useState(0.2);

  const logits = [cat, dog, bird];
  const probs = useMemo(() => softmax(logits), [cat, dog, bird]);
  const winnerIndex = probs.indexOf(Math.max(...probs));

  return (
    <div className="my-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
              Softmax Lab
            </p>
            <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">
              Turn scores into probabilities for several classes
            </h3>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-gray-400">
              Softmax does for multiple classes what sigmoid does for yes/no: it turns raw scores into probabilities that add up to 1.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            {LABELS.map((label, index) => (
              <div key={label} className="mb-3 last:mb-0">
                <Slider
                  label={label.toLowerCase()}
                  value={logits[index]}
                  min={-2}
                  max={4}
                  step={0.1}
                  onChange={(value) => {
                    if (index === 0) setCat(value);
                    if (index === 1) setDog(value);
                    if (index === 2) setBird(value);
                  }}
                />
              </div>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {LABELS.map((label, index) => {
              const isWinner = index === winnerIndex;
              return (
                <div
                  key={label}
                  className={`rounded-2xl px-4 py-3 ${
                    isWinner
                      ? "bg-cyan-50 text-cyan-950 dark:bg-cyan-500/10 dark:text-cyan-100"
                      : "bg-stone-50 text-stone-700 dark:bg-gray-950/60 dark:text-gray-200"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">{label}</p>
                  <p className="mt-1 font-mono text-lg font-semibold">{(probs[index] * 100).toFixed(0)}%</p>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-100">
            The biggest raw score does not just win by a fixed threshold. Softmax turns all scores into a probability distribution, so we can compare several answers at once.
          </div>
        </div>

        <div className="flex-1 rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
            Probability view
          </p>
          <div className="mt-4 space-y-4">
            {LABELS.map((label, index) => {
              const probability = probs[index];
              return (
                <div key={label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-stone-800 dark:text-gray-200">{label}</span>
                    <span className="font-mono text-stone-500 dark:text-gray-400">
                      z = {logits[index].toFixed(1)} | p = {(probability * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="mt-2 h-4 overflow-hidden rounded-full bg-stone-200 dark:bg-gray-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-[width] duration-300"
                      style={{ width: `${probability * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-sm leading-6 text-stone-600 dark:text-gray-400">
            This is the same idea as sigmoid, but stretched across multiple possible classes instead of just yes/no.
          </p>
        </div>
      </div>
    </div>
  );
}
