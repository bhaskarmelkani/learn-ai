import { useMemo, useState } from "react";
import { Graph, PlotLine, PlotPoints } from "./Graph";
import { Slider } from "./Slider";

type Mode = "single" | "detectors";

const POSITIVE_POINTS: [number, number][] = [
  [4.0, 1.2],
  [4.5, 1.8],
  [4.2, 2.3],
  [1.2, 4.1],
  [1.7, 4.6],
  [2.1, 4.0],
];

const NEGATIVE_POINTS: [number, number][] = [
  [0.8, 1.0],
  [1.4, 1.6],
  [2.0, 2.1],
  [2.6, 2.7],
  [3.2, 3.0],
  [2.6, 1.2],
];

function linearPrediction(x: number, y: number, slope: number, intercept: number) {
  return y >= slope * x + intercept ? 1 : 0;
}

function detectorPrediction(x: number, y: number, xThreshold: number, yThreshold: number) {
  return x >= xThreshold || y >= yThreshold ? 1 : 0;
}

export function DecisionBoundaryBridgeDemo() {
  const [mode, setMode] = useState<Mode>("single");
  const [slope, setSlope] = useState(0.9);
  const [intercept, setIntercept] = useState(0.5);
  const [xThreshold, setXThreshold] = useState(3.3);
  const [yThreshold, setYThreshold] = useState(3.4);

  const accuracy = useMemo(() => {
    const singleCorrect =
      POSITIVE_POINTS.filter(([x, y]) => linearPrediction(x, y, slope, intercept) === 1).length +
      NEGATIVE_POINTS.filter(([x, y]) => linearPrediction(x, y, slope, intercept) === 0).length;

    const detectorCorrect =
      POSITIVE_POINTS.filter(([x, y]) => detectorPrediction(x, y, xThreshold, yThreshold) === 1)
        .length +
      NEGATIVE_POINTS.filter(([x, y]) => detectorPrediction(x, y, xThreshold, yThreshold) === 0)
        .length;

    return mode === "single" ? singleCorrect / 12 : detectorCorrect / 12;
  }, [intercept, mode, slope, xThreshold, yThreshold]);

  return (
    <div className="my-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
              Boundary Bridge
            </p>
            <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">
              One boundary can fail, but multiple detectors can work together
            </h3>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-gray-400">
              Imagine approving applicants if they have either very strong income or very strong savings. That creates two “good” regions, not one clean line.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setMode("single")}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                mode === "single"
                  ? "bg-cyan-600 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              One boundary
            </button>
            <button
              onClick={() => setMode("detectors")}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                mode === "detectors"
                  ? "bg-cyan-600 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              Two detectors
            </button>
          </div>

          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-100">
            What to notice: a single boundary tries to summarize everything with one line. Two detectors can look for two different useful signals and combine them.
          </div>

          <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
              Accuracy
            </p>
            <p className="mt-1 font-mono text-sm font-semibold text-stone-900 dark:text-white">
              {(accuracy * 100).toFixed(0)}%
            </p>
          </div>

          {mode === "single" ? (
            <>
              <Slider label="m" value={slope} min={-0.2} max={1.8} step={0.05} onChange={setSlope} />
              <Slider
                label="b"
                value={intercept}
                min={-0.8}
                max={3.5}
                step={0.05}
                onChange={setIntercept}
              />
              <p className="text-xs text-stone-500 dark:text-gray-500">
                This is the “one score, one boundary” world.
              </p>
            </>
          ) : (
            <>
              <Slider
                label="x>"
                value={xThreshold}
                min={2.4}
                max={4.4}
                step={0.05}
                onChange={setXThreshold}
              />
              <Slider
                label="y>"
                value={yThreshold}
                min={2.4}
                max={4.4}
                step={0.05}
                onChange={setYThreshold}
              />
              <p className="text-xs text-stone-500 dark:text-gray-500">
                Detector A fires for high income. Detector B fires for high savings. Final decision = either detector fires.
              </p>
            </>
          )}
        </div>

        <div className="flex-1">
          <Graph
            xMin={0.5}
            xMax={5}
            yMin={0.5}
            yMax={5}
            xLabel="Income signal"
            yLabel="Savings signal"
            caption="Blue points should be accepted. Red points should be rejected."
          >
            {({ toX, toY, xMin, xMax }) => (
              <>
                {mode === "single" ? (
                  <PlotLine
                    fn={(x) => slope * x + intercept}
                    toX={toX}
                    toY={toY}
                    xMin={xMin}
                    xMax={xMax}
                    color="rgb(6, 182, 212)"
                  />
                ) : (
                  <>
                    <line
                      x1={toX(xThreshold)}
                      y1={toY(0.5)}
                      x2={toX(xThreshold)}
                      y2={toY(5)}
                      stroke="rgb(6, 182, 212)"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                    />
                    <line
                      x1={toX(xMin)}
                      y1={toY(yThreshold)}
                      x2={toX(xMax)}
                      y2={toY(yThreshold)}
                      stroke="rgb(16, 185, 129)"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                    />
                  </>
                )}
                <PlotPoints data={NEGATIVE_POINTS} toX={toX} toY={toY} color="rgb(239, 68, 68)" />
                <PlotPoints data={POSITIVE_POINTS} toX={toX} toY={toY} color="rgb(59, 130, 246)" />
              </>
            )}
          </Graph>
        </div>
      </div>
    </div>
  );
}
