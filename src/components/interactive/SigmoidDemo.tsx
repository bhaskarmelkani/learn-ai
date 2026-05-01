import { useEffect, useState } from "react";
import { Graph, PlotLine, PlotPoints } from "./Graph";
import { Slider } from "./Slider";
import { GuidedPrediction } from "./GuidedPrediction";
import { useLearning } from "../../learning/LearningContext";

const DATA: [number, number][] = [
  [-4.0, 0],
  [-3.4, 0],
  [-2.7, 0],
  [-2.1, 0],
  [-1.6, 0],
  [-0.8, 0],
  [0.6, 1],
  [1.3, 1],
  [1.9, 1],
  [2.8, 1],
  [3.4, 1],
  [4.0, 1],
];

const THRESHOLD = 0.5;
const INITIAL_W = 1.1;
const INITIAL_B = -0.2;

function sigmoid(z: number) {
  return 1 / (1 + Math.exp(-z));
}

export function SigmoidDemo() {
  const {
    state: { guidedMode },
  } = useLearning();
  const [w, setW] = useState(INITIAL_W);
  const [b, setB] = useState(INITIAL_B);
  const [guidedLocked, setGuidedLocked] = useState(guidedMode);

  useEffect(() => {
    setGuidedLocked(guidedMode);
  }, [guidedMode]);

  const probability = (x: number) => sigmoid(w * x + b);
  const rawScore = (x: number) => w * x + b;
  const boundary = Math.abs(w) < 1e-9 ? null : -b / w;
  const controlsDisabled = guidedMode && guidedLocked;

  const correct = DATA.filter(([x, y]) => (probability(x) >= THRESHOLD ? 1 : 0) === y).length;
  const accuracy = correct / DATA.length;
  const midpointScore = rawScore(0);

  return (
    <div className="my-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
              Score {"->"} Threshold {"->"} Probability
            </p>
            <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">
              Turn one score into a smooth yes/no decision
            </h3>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-gray-400">
              First we compute a raw score <span className="font-mono">z = wx + b</span>. Then sigmoid turns that score into a probability between 0 and 1.
            </p>
          </div>

          {guidedMode && (
            <GuidedPrediction
              title="Predict the boundary shift"
              prompt="If you increase the bias while keeping the weight fixed, what should happen to the decision boundary?"
              compareText="Unlock the sliders, move only b, and compare the vertical decision-boundary line with the curve."
              onUnlockChange={setGuidedLocked}
              choices={[
                {
                  value: "left",
                  label: "The decision boundary moves left, so approval becomes easier.",
                  explanation: "Correct. A larger bias raises the raw score everywhere, so the 0.5 crossing happens earlier in x.",
                },
                {
                  value: "steeper",
                  label: "The curve gets steeper, but the boundary stays fixed.",
                  explanation: "Steepness mostly comes from weight. Bias shifts the curve left or right instead.",
                },
                {
                  value: "threshold",
                  label: "The 0.5 threshold itself moves upward on the graph.",
                  explanation: "The threshold line is fixed at 0.5. The curve and boundary move relative to that line.",
                },
              ]}
            />
          )}

          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-100">
            What to notice: the horizontal 0.5 line is just the <strong>probability threshold</strong>. The real decision boundary is the <strong>x-value</strong> where the curve crosses it.
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                Raw score at x = 0
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-stone-900 dark:text-white">
                z = {midpointScore.toFixed(2)}
              </p>
            </div>
            <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                Decision boundary
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-stone-900 dark:text-white">
                {boundary === null ? "undefined" : `x = ${boundary.toFixed(2)}`}
              </p>
            </div>
            <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                Threshold
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-stone-900 dark:text-white">
                p ≥ {THRESHOLD.toFixed(1)}
              </p>
            </div>
            <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                Accuracy
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-stone-900 dark:text-white">
                {(accuracy * 100).toFixed(0)}%
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
            <p className="font-mono text-sm text-stone-800 dark:text-gray-200">
              p(approve) = σ({w.toFixed(2)}x + {b.toFixed(2)})
            </p>
          </div>

          <Slider label="w" value={w} min={0.2} max={2.2} step={0.05} onChange={setW} disabled={controlsDisabled} />
          <Slider label="b" value={b} min={-2.5} max={2.5} step={0.05} onChange={setB} disabled={controlsDisabled} />

          <div className="flex justify-center">
            <button
              disabled={controlsDisabled}
              onClick={() => {
                setW(INITIAL_W);
                setB(INITIAL_B);
              }}
              className="rounded-full border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-700 transition-colors hover:border-stone-400 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Reset sliders
            </button>
          </div>
        </div>

        <div className="flex-1">
          <Graph
            xMin={-4.5}
            xMax={4.5}
            yMin={-0.1}
            yMax={1.1}
            xLabel="Affordability score (centered)"
            yLabel="Approval probability"
            caption="Vertical line = decision boundary in input space. Horizontal line = probability threshold."
          >
            {({ toX, toY, xMin, xMax }) => (
              <>
                <line
                  x1={toX(xMin)}
                  y1={toY(THRESHOLD)}
                  x2={toX(xMax)}
                  y2={toY(THRESHOLD)}
                  stroke="rgb(148, 163, 184)"
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                />
                {boundary !== null && boundary >= xMin && boundary <= xMax && (
                  <line
                    x1={toX(boundary)}
                    y1={toY(0)}
                    x2={toX(boundary)}
                    y2={toY(THRESHOLD)}
                    stroke="rgb(34, 197, 94)"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                  />
                )}
                <PlotLine fn={probability} toX={toX} toY={toY} xMin={xMin} xMax={xMax} />
                <PlotPoints
                  data={DATA.filter(([, y]) => y === 0)}
                  toX={toX}
                  toY={toY}
                  color="rgb(239, 68, 68)"
                />
                <PlotPoints
                  data={DATA.filter(([, y]) => y === 1)}
                  toX={toX}
                  toY={toY}
                  color="rgb(59, 130, 246)"
                />
              </>
            )}
          </Graph>
        </div>
      </div>
    </div>
  );
}
