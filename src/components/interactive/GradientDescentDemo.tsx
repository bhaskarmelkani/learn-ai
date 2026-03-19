import { useState, useCallback, useRef, useEffect } from "react";
import { Graph, PlotLine } from "./Graph";

export function GradientDescentDemo() {
  const [w, setW] = useState(4.0);
  const [running, setRunning] = useState(false);
  const [lr, setLr] = useState(0.1);
  const [history, setHistory] = useState<number[]>([4.0]);
  const rafRef = useRef<number>(0);
  const wRef = useRef(w);

  // Simple loss: L(w) = (w - 1.5)^2 + 0.5  (minimum at w=1.5)
  const loss = (w: number) => (w - 1.5) ** 2 + 0.5;
  const gradient = (w: number) => 2 * (w - 1.5);

  const step = useCallback(() => {
    const grad = gradient(wRef.current);
    const newW = wRef.current - lr * grad;
    wRef.current = newW;
    setW(newW);
    setHistory((h) => [...h, newW]);
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
    const start = 4.0;
    setW(start);
    wRef.current = start;
    setHistory([start]);
  };

  return (
    <div className="my-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="text-center font-mono text-sm text-gray-700 dark:text-gray-300">
            L(w) = (w - 1.5)&sup2; + 0.5
          </div>
          <div className="text-center text-sm space-y-1">
            <div>
              <span className="text-gray-500 dark:text-gray-400">w = </span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{w.toFixed(3)}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Loss = </span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{loss(w).toFixed(3)}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Gradient = </span>
              <span className="font-mono text-gray-600 dark:text-gray-300">{gradient(w).toFixed(3)}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 text-right font-mono text-sm text-gray-500 dark:text-gray-400 italic">lr</span>
            <span className="w-12 text-right font-mono text-sm font-medium text-gray-800 dark:text-gray-200">{lr.toFixed(2)}</span>
            <input
              type="range" min={0.01} max={0.5} step={0.01} value={lr}
              onChange={(e) => setLr(parseFloat(e.target.value))}
              className="flex-1 h-2 rounded-full appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700 accent-blue-500"
            />
          </div>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setRunning((r) => !r)}
              className="px-4 py-1.5 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              {running ? "Pause" : "Run"}
            </button>
            <button
              onClick={step}
              disabled={running}
              className="px-4 py-1.5 rounded-lg text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-30 transition-colors"
            >
              Step
            </button>
            <button
              onClick={reset}
              className="px-4 py-1.5 rounded-lg text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
          </div>
          <div className="text-center text-xs text-gray-400 dark:text-gray-500">
            Steps: {history.length - 1} &middot; Watch the ball roll downhill to the minimum!
          </div>
        </div>
        <div className="flex-1">
          <Graph xMin={-1} xMax={5} yMin={0} yMax={7}>
            {({ toX, toY, xMin, xMax }: { toX: (x: number) => number; toY: (y: number) => number; xMin: number; xMax: number }) => (
              <>
                <PlotLine fn={loss} toX={toX} toY={toY} xMin={xMin} xMax={xMax} color="rgb(156,163,175)" />
                {/* Trail */}
                {history.slice(-20).map((hw, i) => (
                  <circle
                    key={i}
                    cx={toX(hw)}
                    cy={toY(loss(hw))}
                    r={2}
                    fill="rgb(59,130,246)"
                    fillOpacity={0.2 + (i / 20) * 0.5}
                  />
                ))}
                {/* Current position */}
                <circle
                  cx={toX(w)}
                  cy={toY(loss(w))}
                  r={6}
                  fill="rgb(59,130,246)"
                  stroke="white"
                  strokeWidth={2}
                />
                {/* Minimum marker */}
                <circle cx={toX(1.5)} cy={toY(0.5)} r={3} fill="none" stroke="rgb(34,197,94)" strokeWidth={1.5} strokeDasharray="3 3" />
              </>
            )}
          </Graph>
        </div>
      </div>
    </div>
  );
}
