import { useMemo, useState } from "react";
import { Slider } from "./Slider";

type Scenario = {
  name: string;
  description: string;
  xLabel: string;
  positiveLabel: string;
  negativeLabel: string;
  center: number;
  scale: number;
  cases: { x: number; label: 0 | 1; note: string }[];
};

const SCENARIOS: Scenario[] = [
  {
    name: "Spam filter",
    description: "Higher feature values mean a more spam-like email.",
    xLabel: "Spam score",
    positiveLabel: "spam",
    negativeLabel: "not spam",
    center: 50,
    scale: 12,
    cases: [
      { x: 18, label: 0, note: "plain message" },
      { x: 28, label: 0, note: "short reply" },
      { x: 44, label: 0, note: "news update" },
      { x: 62, label: 1, note: "promo email" },
      { x: 76, label: 1, note: "lots of links" },
      { x: 88, label: 1, note: "urgent money request" },
    ],
  },
  {
    name: "Loan approval",
    description: "Higher credit scores mean lower risk.",
    xLabel: "Credit score",
    positiveLabel: "approve",
    negativeLabel: "reject",
    center: 650,
    scale: 45,
    cases: [
      { x: 520, label: 0, note: "high risk" },
      { x: 580, label: 0, note: "thin file" },
      { x: 640, label: 0, note: "borderline" },
      { x: 700, label: 1, note: "safe profile" },
      { x: 760, label: 1, note: "strong profile" },
      { x: 820, label: 1, note: "very safe" },
    ],
  },
  {
    name: "Medical triage",
    description: "Higher severity should trigger action sooner.",
    xLabel: "Severity score",
    positiveLabel: "urgent",
    negativeLabel: "routine",
    center: 55,
    scale: 10,
    cases: [
      { x: 16, label: 0, note: "mild cold" },
      { x: 30, label: 0, note: "routine check" },
      { x: 48, label: 0, note: "needs watchful wait" },
      { x: 61, label: 1, note: "needs clinician" },
      { x: 74, label: 1, note: "treat soon" },
      { x: 90, label: 1, note: "immediate attention" },
    ],
  },
];

function sigmoid(z: number) {
  return 1 / (1 + Math.exp(-z));
}

function confusionMatrix(cases: Scenario["cases"], threshold: number, center: number, scale: number) {
  let tp = 0;
  let fp = 0;
  let tn = 0;
  let fn = 0;

  const results = cases.map((item) => {
    const prob = sigmoid((item.x - center) / scale);
    const pred = prob >= threshold ? 1 : 0;
    if (pred === 1 && item.label === 1) tp += 1;
    if (pred === 1 && item.label === 0) fp += 1;
    if (pred === 0 && item.label === 0) tn += 1;
    if (pred === 0 && item.label === 1) fn += 1;
    return { ...item, prob, pred };
  });

  return { tp, fp, tn, fn, results };
}

export function ClassificationLab() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [threshold, setThreshold] = useState(0.5);

  const scenario = SCENARIOS[scenarioIndex];
  const { tp, fp, tn, fn, results } = useMemo(
    () => confusionMatrix(scenario.cases, threshold, scenario.center, scenario.scale),
    [scenario, threshold]
  );

  const total = tp + fp + tn + fn;
  const accuracy = total ? (tp + tn) / total : 0;
  const precision = tp + fp ? tp / (tp + fp) : 0;
  const recall = tp + fn ? tp / (tp + fn) : 0;

  return (
    <div className="my-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
              Threshold Lab
            </p>
            <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">
              See false positives and false negatives
            </h3>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-gray-400">
              Move the threshold and watch the confusion matrix change. The same underlying probabilities can lead to very different decisions.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {SCENARIOS.map((item, index) => (
              <button
                key={item.name}
                onClick={() => setScenarioIndex(index)}
                className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                  index === scenarioIndex
                    ? "bg-cyan-600 text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <Slider label="threshold" value={threshold} min={0.1} max={0.9} step={0.05} onChange={setThreshold} />

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">Accuracy</p>
              <p className="mt-1 font-mono text-lg font-semibold text-stone-900 dark:text-white">{(accuracy * 100).toFixed(0)}%</p>
            </div>
            <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">Precision</p>
              <p className="mt-1 font-mono text-lg font-semibold text-stone-900 dark:text-white">{(precision * 100).toFixed(0)}%</p>
            </div>
            <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">Recall</p>
              <p className="mt-1 font-mono text-lg font-semibold text-stone-900 dark:text-white">{(recall * 100).toFixed(0)}%</p>
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-100">
            At low thresholds you catch more positives, but you also raise false alarms. At high thresholds you are stricter, but you may miss important cases.
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
              Confusion matrix
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-900">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">Predicted positive</p>
                <p className="mt-2 text-stone-700 dark:text-gray-300">TP {tp}</p>
                <p className="text-stone-700 dark:text-gray-300">FP {fp}</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-900">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">Predicted negative</p>
                <p className="mt-2 text-stone-700 dark:text-gray-300">FN {fn}</p>
                <p className="text-stone-700 dark:text-gray-300">TN {tn}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
              Cases
            </p>
            <div className="mt-3 space-y-2">
              {results.map((item) => {
                const isCorrect = item.pred === item.label;
                return (
                  <div
                    key={`${item.x}-${item.note}`}
                    className={`flex items-center justify-between rounded-2xl px-3 py-2 text-sm ${
                      isCorrect
                        ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-100"
                        : "bg-rose-50 text-rose-900 dark:bg-rose-500/10 dark:text-rose-100"
                    }`}
                  >
                    <div>
                      <p className="font-medium">{item.note}</p>
                      <p className="text-xs opacity-80">
                        {scenario.xLabel}: {item.x}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {item.pred === 1 ? scenario.positiveLabel : scenario.negativeLabel}
                      </p>
                      <p className="text-xs opacity-80">p = {(item.prob * 100).toFixed(0)}%</p>
                    </div>
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
