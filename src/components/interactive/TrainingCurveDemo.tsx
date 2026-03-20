import { useMemo, useState } from "react";
import { Graph, PlotLine, PlotPoints } from "./Graph";
import { Slider } from "./Slider";

type Mode = "underfit" | "balanced" | "overfit";

const X_VALUES = Array.from({ length: 28 }, (_, i) => -1 + (i / 27) * 2);

function target(x: number) {
  return Math.sin(x * Math.PI * 1.5) * 0.6 + x * 0.2;
}

function noiseForIndex(index: number) {
  return ((index * 37) % 11 - 5) / 50;
}

const DATA = X_VALUES.map((x, index) => [x, target(x) + noiseForIndex(index)] as [number, number]);

function predict(weights: number[], x: number) {
  return weights.reduce((sum, weight, i) => sum + weight * x ** i, 0);
}

function trainModel(degree: number, validationSplit: number, epochs: number, learningRate: number, regularization: number) {
  const splitIndex = Math.max(4, Math.min(DATA.length - 4, Math.round(DATA.length * (1 - validationSplit))));
  const train = DATA.slice(0, splitIndex);
  const validation = DATA.slice(splitIndex);
  const weights = Array.from({ length: degree + 1 }, () => 0);
  const trainLossHistory: number[] = [];
  const valLossHistory: number[] = [];

  for (let epoch = 0; epoch < epochs; epoch += 1) {
    const gradients = Array.from({ length: degree + 1 }, () => 0);

    for (const [x, y] of train) {
      const pred = predict(weights, x);
      const error = pred - y;
      for (let i = 0; i <= degree; i += 1) {
        gradients[i] += (2 / train.length) * error * x ** i;
      }
    }

    for (let i = 1; i <= degree; i += 1) {
      gradients[i] += 2 * regularization * weights[i];
    }

    for (let i = 0; i <= degree; i += 1) {
      weights[i] -= learningRate * gradients[i];
    }

    const trainLoss =
      train.reduce((sum, [x, y]) => sum + (y - predict(weights, x)) ** 2, 0) / train.length;
    const valLoss =
      validation.reduce((sum, [x, y]) => sum + (y - predict(weights, x)) ** 2, 0) /
      validation.length;
    trainLossHistory.push(trainLoss);
    valLossHistory.push(valLoss);
  }

  return { weights, train, validation, trainLossHistory, valLossHistory };
}

export function TrainingCurveDemo() {
  const [mode, setMode] = useState<Mode>("balanced");
  const [validationSplit, setValidationSplit] = useState(0.3);
  const [regularization, setRegularization] = useState(0.0);

  const degree = mode === "underfit" ? 1 : mode === "balanced" ? 3 : 8;
  const { weights, train, validation, trainLossHistory, valLossHistory } = useMemo(
    () => trainModel(degree, validationSplit, 200, 0.04, regularization),
    [degree, validationSplit, regularization]
  );

  const maxLoss = Math.max(...trainLossHistory, ...valLossHistory, 0.01) * 1.1;
  const finalTrain = trainLossHistory[trainLossHistory.length - 1] ?? 0;
  const finalVal = valLossHistory[valLossHistory.length - 1] ?? 0;

  const lossPoints = (history: number[]) =>
    history.map((loss, epoch) => `${40 + (epoch / (history.length - 1)) * 480},${220 - (loss / maxLoss) * 170}`).join(" ");

  return (
    <div className="my-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
              Training Curve Lab
            </p>
            <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">
              Watch underfitting and overfitting separate
            </h3>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-gray-400">
              Change capacity, regularization, and validation split. The curves tell the story better than a paragraph does.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(["underfit", "balanced", "overfit"] as Mode[]).map((item) => (
              <button
                key={item}
                onClick={() => setMode(item)}
                className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                  mode === item
                    ? "bg-cyan-600 text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <Slider
            label="split"
            value={validationSplit}
            min={0.15}
            max={0.45}
            step={0.05}
            onChange={setValidationSplit}
          />
          <Slider
            label="reg"
            value={regularization}
            min={0}
            max={0.2}
            step={0.01}
            onChange={setRegularization}
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">Train loss</p>
              <p className="mt-1 font-mono text-lg font-semibold text-stone-900 dark:text-white">{finalTrain.toFixed(3)}</p>
            </div>
            <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">Val loss</p>
              <p className="mt-1 font-mono text-lg font-semibold text-stone-900 dark:text-white">{finalVal.toFixed(3)}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-100">
            Underfitting keeps both losses high. Overfitting drives train loss down while validation loss stays worse. Balanced capacity sits in the middle.
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
              Train vs validation loss
            </p>
            <svg viewBox="0 0 560 260" className="mt-3 w-full">
              <line x1="40" y1="220" x2="520" y2="220" stroke="currentColor" className="text-stone-300 dark:text-gray-700" />
              <line x1="40" y1="30" x2="40" y2="220" stroke="currentColor" className="text-stone-300 dark:text-gray-700" />
              <polyline points={lossPoints(trainLossHistory)} fill="none" stroke="rgb(6, 182, 212)" strokeWidth={3} />
              <polyline points={lossPoints(valLossHistory)} fill="none" stroke="rgb(245, 158, 11)" strokeWidth={3} />
              <text x="42" y="20" className="fill-stone-500 dark:fill-gray-400 text-xs">loss</text>
              <text x="510" y="238" className="fill-stone-500 dark:fill-gray-400 text-xs">epochs</text>
            </svg>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
              Data split
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">Training points</p>
                <div className="h-20 rounded-2xl border border-dashed border-cyan-300 bg-cyan-50 p-2 dark:border-cyan-500/20 dark:bg-cyan-500/10">
                  {train.map(([x]) => (
                    <span key={x} className="mr-1 inline-block rounded-full bg-cyan-600 px-2 py-0.5 text-[10px] text-white">
                      {x.toFixed(1)}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">Validation points</p>
                <div className="h-20 rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-2 dark:border-amber-500/20 dark:bg-amber-500/10">
                  {validation.map(([x]) => (
                    <span key={x} className="mr-1 inline-block rounded-full bg-amber-600 px-2 py-0.5 text-[10px] text-white">
                      {x.toFixed(1)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Graph xMin={-1.1} xMax={1.1} yMin={-1.6} yMax={1.6}>
            {({ toX, toY, xMin, xMax }) => (
              <>
                <PlotLine fn={(x) => predict(weights, x)} toX={toX} toY={toY} xMin={xMin} xMax={xMax} color="rgb(6,182,212)" />
                <PlotPoints data={DATA} toX={toX} toY={toY} color="rgb(245,158,11)" />
              </>
            )}
          </Graph>
        </div>
      </div>
    </div>
  );
}
