import { useState } from "react";
import { Graph, PlotLine, PlotPoints } from "./Graph";
import { Slider } from "./Slider";

const DATA: [number, number][] = [
  [-3, 9.2], [-2.5, 6.5], [-2, 4.3], [-1.5, 2.5], [-1, 1.2],
  [-0.5, 0.4], [0, 0.1], [0.5, 0.3], [1, 0.9], [1.5, 2.1],
  [2, 3.8], [2.5, 6.1], [3, 8.8],
];

export function NonlinearDemo() {
  const [a, setA] = useState(1.0);
  const [b, setB] = useState(0.0);
  const [c, setC] = useState(0.0);

  const fn = (x: number) => a * x * x + b * x + c;

  const mse = DATA.reduce((sum, [x, y]) => sum + (y - fn(x)) ** 2, 0) / DATA.length;

  return (
    <div className="my-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-5">
          <div className="text-center text-lg font-mono text-gray-700 dark:text-gray-300">
            y = <span className="text-blue-600 dark:text-blue-400 font-bold">{a.toFixed(1)}</span>x&sup2; + <span className="text-blue-600 dark:text-blue-400 font-bold">{b.toFixed(1)}</span>x + <span className="text-blue-600 dark:text-blue-400 font-bold">{c.toFixed(1)}</span>
          </div>
          <Slider label="a" value={a} min={-3} max={3} step={0.1} onChange={setA} />
          <Slider label="b" value={b} min={-5} max={5} step={0.1} onChange={setB} />
          <Slider label="c" value={c} min={-5} max={5} step={0.1} onChange={setC} />
          <div className="text-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">MSE Loss: </span>
            <span className={`font-mono font-bold ${mse < 1 ? "text-green-600 dark:text-green-400" : mse < 5 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"}`}>
              {mse.toFixed(3)}
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
            Fit the parabola to the data. Notice how a linear model (set a=0) can't capture this shape!
          </p>
        </div>
        <div className="flex-1">
          <Graph xMin={-4} xMax={4} yMin={-2} yMax={12}>
            {({ toX, toY, xMin, xMax }: { toX: (x: number) => number; toY: (y: number) => number; xMin: number; xMax: number }) => (
              <>
                <PlotLine fn={fn} toX={toX} toY={toY} xMin={xMin} xMax={xMax} />
                <PlotPoints data={DATA} toX={toX} toY={toY} />
              </>
            )}
          </Graph>
        </div>
      </div>
    </div>
  );
}
