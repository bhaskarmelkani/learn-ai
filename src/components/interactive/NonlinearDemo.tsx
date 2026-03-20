import { useEffect, useState } from "react";
import { Graph, PlotLine, PlotPoints } from "./Graph";
import { Slider } from "./Slider";
import { HOUSE_CURVED_DATA, HOUSE_X_LABEL, HOUSE_Y_LABEL } from "./data";
import { GuidedPrediction } from "./GuidedPrediction";
import { useLearning } from "../../learning/LearningContext";

const INITIAL_A = 0.2;
const INITIAL_B = 0.3;
const INITIAL_C = 1.2;

export function NonlinearDemo() {
  const {
    state: { guidedMode },
  } = useLearning();
  const [a, setA] = useState(INITIAL_A);
  const [b, setB] = useState(INITIAL_B);
  const [c, setC] = useState(INITIAL_C);
  const [guidedLocked, setGuidedLocked] = useState(guidedMode);

  useEffect(() => {
    setGuidedLocked(guidedMode);
  }, [guidedMode]);

  const fn = (x: number) => a * x * x + b * x + c;
  const controlsDisabled = guidedMode && guidedLocked;

  const mse =
    HOUSE_CURVED_DATA.reduce((sum, [x, y]) => sum + (y - fn(x)) ** 2, 0) /
    HOUSE_CURVED_DATA.length;

  return (
    <div className="my-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
              Curves, Not Just Lines
            </p>
            <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">
              Fit a curved price pattern
            </h3>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-gray-400">
              On very expensive homes, price can rise faster than square footage alone would suggest. A straight line starts to miss the bend.
            </p>
          </div>

          {guidedMode && (
            <GuidedPrediction
              title="Predict the effect of removing curvature"
              prompt="If you set the curved term a to 0, what should happen to the premium-home end of the fit?"
              compareText="Unlock the sliders, move a to 0, and compare the right-hand side of the graph with the premium-home data points."
              onUnlockChange={setGuidedLocked}
              choices={[
                {
                  value: "flatten",
                  label: "The fit loses its bend and starts underfitting the expensive homes.",
                  explanation: "Right. Removing the squared term forces the model back into a straight-line shape.",
                },
                {
                  value: "same",
                  label: "Almost nothing changes because b and c already control the shape.",
                  explanation: "b and c shift and tilt the curve, but they cannot create the same upward bend without a.",
                },
                {
                  value: "points",
                  label: "The data rearranges into a line because the model is simpler.",
                  explanation: "The examples do not change. Simpler models change what can be fit, not what was observed.",
                },
              ]}
            />
          )}

          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-100">
            What to notice: the new curved term lets the line bend upward instead of forcing one straight trend through every point.
          </div>

          <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
            <p className="font-mono text-sm text-stone-800 dark:text-gray-200">
              y = {a.toFixed(2)}x² + {b.toFixed(2)}x + {c.toFixed(2)}
            </p>
            <p className="mt-2 text-xs text-stone-500 dark:text-gray-500">
              Mean squared error: {mse.toFixed(3)}
            </p>
          </div>

          <Slider label="a" value={a} min={-0.1} max={0.6} step={0.02} onChange={setA} disabled={controlsDisabled} />
          <Slider label="b" value={b} min={-0.4} max={1.0} step={0.05} onChange={setB} disabled={controlsDisabled} />
          <Slider label="c" value={c} min={0} max={2.2} step={0.05} onChange={setC} disabled={controlsDisabled} />

          <div className="flex justify-center">
            <button
              disabled={controlsDisabled}
              onClick={() => {
                setA(INITIAL_A);
                setB(INITIAL_B);
                setC(INITIAL_C);
              }}
              className="rounded-full border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-700 transition-colors hover:border-stone-400 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Reset sliders
            </button>
          </div>
          <p className="text-center text-xs text-stone-500 dark:text-gray-500">
            Set <span className="font-mono">a = 0</span> first to feel the straight-line limit, then add the curve back in.
          </p>
        </div>
        <div className="flex-1">
          <Graph
            xMin={0.8}
            xMax={4.9}
            yMin={1.4}
            yMax={10.2}
            xLabel={HOUSE_X_LABEL}
            yLabel={HOUSE_Y_LABEL}
            caption="Same house-price story, but now the premium end bends upward."
          >
            {({ toX, toY, xMin, xMax }: { toX: (x: number) => number; toY: (y: number) => number; xMin: number; xMax: number }) => (
              <>
                <PlotLine fn={fn} toX={toX} toY={toY} xMin={xMin} xMax={xMax} />
                <PlotPoints data={HOUSE_CURVED_DATA} toX={toX} toY={toY} />
              </>
            )}
          </Graph>
        </div>
      </div>
    </div>
  );
}
