import { useCallback, useEffect, useRef, useState } from "react";
import { Graph, PlotLine } from "./Graph";
import { HOUSE_LINEAR_DATA } from "./data";

const FIXED_BIAS = 0.6;
const START_W = 1.8;

function lossForWeight(w: number) {
  return (
    HOUSE_LINEAR_DATA.reduce((sum, [x, y]) => sum + (y - (w * x + FIXED_BIAS)) ** 2, 0) /
    HOUSE_LINEAR_DATA.length
  );
}

function gradientForWeight(w: number) {
  return (
    HOUSE_LINEAR_DATA.reduce((sum, [x, y]) => {
      const pred = w * x + FIXED_BIAS;
      return sum + (2 / HOUSE_LINEAR_DATA.length) * x * (pred - y);
    }, 0)
  );
}

export function GradientDescentDemo() {
  const [w, setW] = useState(START_W);
  const [running, setRunning] = useState(false);
  const [lr, setLr] = useState(0.08);
  const [history, setHistory] = useState<number[]>([START_W]);
  const rafRef = useRef<number>(0);
  const wRef = useRef(w);

  const step = useCallback(() => {
    const grad = gradientForWeight(wRef.current);
    const nextW = wRef.current - lr * grad;
    wRef.current = nextW;
    setW(nextW);
    setHistory((current) => [...current, nextW]);
  }, [lr]);

  useEffect(() => {
    if (!running) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    let lastTime = 0;
    const animate = (time: number) => {
      if (time - lastTime > 300) {
        step();
        lastTime = time;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running, step]);

  const reset = () => {
    setRunning(false);
    setW(START_W);
    wRef.current = START_W;
    setHistory([START_W]);
  };

  return (
    <div className="my-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
              Loss Slice
            </p>
            <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">
              Step downhill until the house-price line fits better
            </h3>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-gray-400">
              This demo freezes the bias and only moves the weight. That gives us one clean slice of the line-fitting loss landscape.
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-100">
            What to notice: the gradient tells us which way makes the house-price fit worse. Gradient descent walks in the opposite direction.
          </div>

          <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
            <p className="font-mono text-sm text-stone-800 dark:text-gray-200">
              Loss(w) = MSE of <span className="font-semibold">y = wx + {FIXED_BIAS.toFixed(1)}</span>
            </p>
          </div>

          <div className="text-sm space-y-1">
            <div>
              <span className="text-stone-500 dark:text-gray-400">weight = </span>
              <span className="font-mono font-semibold text-stone-900 dark:text-white">{w.toFixed(3)}</span>
            </div>
            <div>
              <span className="text-stone-500 dark:text-gray-400">loss = </span>
              <span className="font-mono font-semibold text-stone-900 dark:text-white">
                {lossForWeight(w).toFixed(3)}
              </span>
            </div>
            <div>
              <span className="text-stone-500 dark:text-gray-400">gradient = </span>
              <span className="font-mono font-semibold text-stone-900 dark:text-white">
                {gradientForWeight(w).toFixed(3)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-10 text-right font-mono text-sm text-stone-500 dark:text-gray-400 italic">
              lr
            </span>
            <span className="w-12 text-right font-mono text-sm font-medium text-stone-800 dark:text-gray-200">
              {lr.toFixed(2)}
            </span>
            <input
              type="range"
              min={0.01}
              max={0.2}
              step={0.01}
              value={lr}
              onChange={(event) => setLr(parseFloat(event.target.value))}
              className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-gray-200 accent-blue-500 dark:bg-gray-700"
            />
          </div>

          <div className="flex justify-center gap-2">
            <button
              onClick={() => setRunning((current) => !current)}
              className="rounded-lg bg-cyan-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-cyan-500"
            >
              {running ? "Pause" : "Run"}
            </button>
            <button
              onClick={step}
              disabled={running}
              className="rounded-lg bg-stone-200 px-4 py-1.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-300 disabled:opacity-30 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Step
            </button>
            <button
              onClick={reset}
              className="rounded-lg bg-stone-200 px-4 py-1.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="flex-1">
          <Graph
            xMin={0.4}
            xMax={2.0}
            yMin={0}
            yMax={1.8}
            xLabel="Weight"
            yLabel="Mean squared error"
            caption="Each blue dot shows where gradient descent visited this one-parameter loss curve."
          >
            {({ toX, toY, xMin, xMax }) => (
              <>
                <PlotLine
                  fn={lossForWeight}
                  toX={toX}
                  toY={toY}
                  xMin={xMin}
                  xMax={xMax}
                  color="rgb(148, 163, 184)"
                />
                {history.slice(-24).map((value, index) => (
                  <circle
                    key={`${value}-${index}`}
                    cx={toX(value)}
                    cy={toY(lossForWeight(value))}
                    r={2.2}
                    fill="rgb(59, 130, 246)"
                    fillOpacity={0.2 + (index / 24) * 0.5}
                  />
                ))}
                <circle
                  cx={toX(w)}
                  cy={toY(lossForWeight(w))}
                  r={6}
                  fill="rgb(59, 130, 246)"
                  stroke="white"
                  strokeWidth={2}
                />
              </>
            )}
          </Graph>
        </div>
      </div>
    </div>
  );
}
