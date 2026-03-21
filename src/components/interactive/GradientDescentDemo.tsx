import { useCallback, useEffect, useRef, useState } from "react";
import { Graph, PlotLine } from "./Graph";
import { Slider } from "./Slider";
import { HOUSE_LINEAR_DATA } from "./data";
import { GuidedPrediction } from "./GuidedPrediction";
import { useLearning } from "../../learning/LearningContext";

const FIXED_BIAS = 0.6;
const START_W = 1.5;
const TARGET_W = 1.26;

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
  const {
    state: { guidedMode },
  } = useLearning();
  const [w, setW] = useState(START_W);
  const [running, setRunning] = useState(false);
  const [lr, setLr] = useState(0.06);
  const [history, setHistory] = useState<number[]>([START_W]);
  const [guidedLocked, setGuidedLocked] = useState(guidedMode);
  const rafRef = useRef<number>(0);
  const wRef = useRef(w);

  useEffect(() => {
    setGuidedLocked(guidedMode);
  }, [guidedMode]);

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

  const setWeightManually = (nextW: number) => {
    setRunning(false);
    setW(nextW);
    wRef.current = nextW;
    setHistory([nextW]);
  };

  const controlsDisabled = guidedMode && guidedLocked;
  const valleyCoach = getValleyCoach(w);

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

          {guidedMode && (
            <GuidedPrediction
              title="Predict the effect of a high learning rate"
              prompt="If the learning rate is too high, what should happen as gradient descent moves across the loss curve?"
              compareText="Unlock the controls, raise the learning rate, and compare the path of the blue dots with the stable path at a lower rate."
              onUnlockChange={setGuidedLocked}
              choices={[
                {
                  value: "overshoot",
                  label: "The updates overshoot the good region and may bounce around instead of settling.",
                  explanation: "That is the classic failure mode. Big steps can keep jumping over the valley.",
                },
                {
                  value: "faster",
                  label: "Training always becomes better because larger steps reach the minimum faster.",
                  explanation: "Larger steps can help only until they become unstable. Past that point they work against convergence.",
                },
                {
                  value: "data",
                  label: "The loss curve itself changes shape because the learning rate changes the dataset.",
                  explanation: "The learning rate changes the update size, not the data or the underlying loss surface.",
                },
              ]}
            />
          )}

          <div className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${
            lossForWeight(w) < 0.05
              ? "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-100"
              : lr > 0.08
                ? "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-100"
                : "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-100"
          }`}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Challenge</p>
            <p className="mt-1">
              {lossForWeight(w) < 0.05
                ? "Challenge 1 complete! Now try Challenge 2: set the learning rate above 0.08 and press Run — watch the weight diverge instead of converging."
                : lr > 0.08 && running
                  ? "Notice the instability! High learning rates can cause the weight to bounce around instead of settling."
                  : "Get the loss below 0.05 using gradient descent. Then try raising the learning rate to see what happens when steps are too large."}
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-100">
            What to notice: the gradient tells us which way makes the house-price fit worse. Gradient descent walks in the opposite direction.
          </div>

          <div className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${valleyCoach.className}`}>
            <p className="font-semibold">{valleyCoach.title}</p>
            <p className="mt-1">{valleyCoach.detail}</p>
          </div>

          <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
            <p className="font-mono text-sm text-stone-800 dark:text-gray-200">
              Loss(w) = MSE of <span className="font-semibold">y = wx + {FIXED_BIAS.toFixed(1)}</span>
            </p>
            <p className="mt-2 text-xs text-stone-500 dark:text-gray-500">
              Start slightly away from the valley, move <span className="font-mono">w</span> yourself, then press run to watch gradient descent take over.
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

          <Slider
            label="w"
            value={w}
            min={0.8}
            max={1.8}
            step={0.02}
            onChange={setWeightManually}
            disabled={controlsDisabled || running}
          />

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
              max={0.1}
              step={0.01}
              value={lr}
              disabled={controlsDisabled}
              onChange={(event) => setLr(parseFloat(event.target.value))}
              className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-gray-200 accent-blue-500 disabled:cursor-not-allowed dark:bg-gray-700"
            />
          </div>

          <div className="flex justify-center gap-2">
            <button
              disabled={controlsDisabled}
              onClick={() => setRunning((current) => !current)}
              className="rounded-lg bg-cyan-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {running ? "Pause" : "Run"}
            </button>
            <button
              onClick={step}
              disabled={running || controlsDisabled}
              className="rounded-lg bg-stone-200 px-4 py-1.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-300 disabled:opacity-30 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Step
            </button>
            <button
              disabled={controlsDisabled}
              onClick={reset}
              className="rounded-lg bg-stone-200 px-4 py-1.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-300 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="flex-1">
          <Graph
            xMin={0.8}
            xMax={1.8}
            yMin={0}
            yMax={2.8}
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

function getValleyCoach(w: number) {
  const distance = Math.abs(w - TARGET_W);

  if (distance < 0.03) {
    return {
      title: "At the bottom.",
      detail: "You’re basically in the valley now. If the learning rate is gentle, the next steps should barely move.",
      className:
        "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-100",
    };
  }

  if (distance < 0.12) {
    return {
      title: "Very close.",
      detail:
        w > TARGET_W
          ? "You’re just to the right of the valley. A couple of leftward steps should settle it."
          : "You’re just to the left of the valley. A couple of rightward steps should settle it.",
      className:
        "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-100",
    };
  }

  return {
    title: "Still descending.",
    detail:
      w > TARGET_W
        ? "You’re well to the right of the valley, so the good direction is left."
        : "You’re well to the left of the valley, so the good direction is right.",
    className:
      "border-cyan-200 bg-cyan-50 text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-100",
  };
}
