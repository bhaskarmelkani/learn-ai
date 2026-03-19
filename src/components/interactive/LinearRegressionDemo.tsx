import { useState } from "react";
import { Graph, PlotLine, PlotPoints } from "./Graph";
import { Slider } from "./Slider";

const DATA: [number, number][] = [
  [1, 2.1], [1.5, 2.8], [2, 3.4], [2.5, 4.2], [3, 4.8],
  [3.5, 5.1], [4, 6.2], [4.5, 6.5], [5, 7.1], [5.5, 7.8],
];

export function LinearRegressionDemo() {
  const [w, setW] = useState(1.0);
  const [b, setB] = useState(1.0);

  const fn = (x: number) => w * x + b;

  // Compute MSE
  const mse = DATA.reduce((sum, [x, y]) => sum + (y - fn(x)) ** 2, 0) / DATA.length;

  return (
    <div className="my-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-5">
          <div className="text-center text-lg font-mono text-gray-700 dark:text-gray-300">
            y = <span className="text-blue-600 dark:text-blue-400 font-bold">{w.toFixed(1)}</span>x + <span className="text-blue-600 dark:text-blue-400 font-bold">{b.toFixed(1)}</span>
          </div>
          <Slider label="w" value={w} min={-3} max={5} step={0.1} onChange={setW} />
          <Slider label="b" value={b} min={-5} max={10} step={0.1} onChange={setB} />
          <div className="text-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">MSE Loss: </span>
            <span className={`font-mono font-bold ${mse < 0.5 ? "text-green-600 dark:text-green-400" : mse < 2 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"}`}>
              {mse.toFixed(3)}
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
            Drag the sliders to fit the line to the red data points. Try to minimize the loss!
          </p>
        </div>
        <div className="flex-1">
          <Graph xMin={0} xMax={7} yMin={0} yMax={10}>
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
