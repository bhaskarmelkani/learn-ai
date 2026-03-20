import { useEffect, useState } from "react";
import { Graph, PlotLine, PlotPoints } from "./Graph";
import { Slider } from "./Slider";
import { HOUSE_LINEAR_DATA, HOUSE_X_LABEL, HOUSE_Y_LABEL } from "./data";
import { GuidedPrediction } from "./GuidedPrediction";
import { useLearning } from "../../learning/LearningContext";

const INITIAL_W = 1.2;
const INITIAL_B = 0.6;

export function LinearRegressionDemo() {
  const {
    state: { guidedMode },
  } = useLearning();
  const [w, setW] = useState(INITIAL_W);
  const [b, setB] = useState(INITIAL_B);
  const [guidedLocked, setGuidedLocked] = useState(guidedMode);

  useEffect(() => {
    setGuidedLocked(guidedMode);
  }, [guidedMode]);

  const fn = (x: number) => w * x + b;
  const controlsDisabled = guidedMode && guidedLocked;

  const mse =
    HOUSE_LINEAR_DATA.reduce((sum, [x, y]) => sum + (y - fn(x)) ** 2, 0) /
    HOUSE_LINEAR_DATA.length;
  const prediction = fn(3.2);

  return (
    <div className="my-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
              Prediction First
            </p>
            <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">
              Draw the simplest line through the house-price story
            </h3>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-gray-400">
              Imagine we know several house sizes and prices. The question is simple: if a new house is 3.2 thousand sqft, where should its price land?
            </p>
          </div>

          {guidedMode && (
            <GuidedPrediction
              title="Predict the first visible change"
              prompt="If you increase only the weight while keeping the bias fixed, what should change first in the graph?"
              compareText="Unlock the sliders, move only w, then move only b and compare the kind of movement each parameter causes."
              onUnlockChange={setGuidedLocked}
              choices={[
                {
                  value: "tilt",
                  label: "The line tilts more steeply around the same baseline.",
                  explanation: "That is the right instinct. Weight changes how fast the prediction rises as x increases.",
                },
                {
                  value: "lift",
                  label: "The whole line lifts upward without changing tilt.",
                  explanation: "That is what bias does, not weight. Bias shifts the entire line up or down.",
                },
                {
                  value: "points",
                  label: "The data points themselves move to fit the line.",
                  explanation: "The training data stays fixed. We move the model, not the examples.",
                },
              ]}
            />
          )}

          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-100">
            What to notice: <strong>weight</strong> changes the tilt of the line, and <strong>bias</strong> lifts the whole line up or down.
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                Equation
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-stone-900 dark:text-white">
                y = {w.toFixed(2)}x + {b.toFixed(2)}
              </p>
            </div>
            <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                Price at 3.2
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-stone-900 dark:text-white">
                ${(prediction * 100).toFixed(0)}k
              </p>
            </div>
            <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                Mean squared error
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-stone-900 dark:text-white">
                {mse.toFixed(3)}
              </p>
            </div>
          </div>

          <Slider label="w" value={w} min={0.4} max={1.8} step={0.05} onChange={setW} disabled={controlsDisabled} />
          <Slider label="b" value={b} min={-0.4} max={1.8} step={0.05} onChange={setB} disabled={controlsDisabled} />

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
          <p className="text-xs text-center text-stone-500 dark:text-gray-500">
            Units: x is house size in thousands of sqft, y is price in hundreds of thousands of dollars.
          </p>
        </div>
        <div className="flex-1">
          <Graph
            xMin={0.6}
            xMax={5}
            yMin={1}
            yMax={7.4}
            xLabel={HOUSE_X_LABEL}
            yLabel={HOUSE_Y_LABEL}
            caption="Try to fit the blue line so it sits close to the red price examples."
          >
            {({ toX, toY, xMin, xMax }: { toX: (x: number) => number; toY: (y: number) => number; xMin: number; xMax: number }) => (
              <>
                <PlotLine fn={fn} toX={toX} toY={toY} xMin={xMin} xMax={xMax} />
                <PlotPoints data={HOUSE_LINEAR_DATA} toX={toX} toY={toY} />
                <line
                  x1={toX(3.2)}
                  y1={toY(1)}
                  x2={toX(3.2)}
                  y2={toY(prediction)}
                  stroke="rgb(34, 197, 94)"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                />
                <circle
                  cx={toX(3.2)}
                  cy={toY(prediction)}
                  r={5}
                  fill="rgb(34, 197, 94)"
                  stroke="white"
                  strokeWidth={1.5}
                />
              </>
            )}
          </Graph>
        </div>
      </div>
    </div>
  );
}
