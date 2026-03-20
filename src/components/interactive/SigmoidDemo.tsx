import { useState } from "react";
import { Graph, PlotLine, PlotPoints } from "./Graph";
import { Slider } from "./Slider";

const DATA: [number, number][] = [
  [-4, 0], [-3.5, 0], [-3, 0], [-2, 0], [-1.5, 0], [-1, 0],
  [1, 1], [1.5, 1], [2, 1], [3, 1], [3.5, 1], [4, 1],
  [-0.5, 0], [0.5, 1],
];

const INITIAL_W = 1.0;
const INITIAL_B = 0.0;

export function SigmoidDemo() {
  const [w, setW] = useState(INITIAL_W);
  const [b, setB] = useState(INITIAL_B);

  const sigmoid = (x: number) => 1 / (1 + Math.exp(-(w * x + b)));
  const boundary = Math.abs(w) < 1e-9 ? null : -b / w;

  // Compute accuracy
  const correct = DATA.filter(([x, y]) => {
    const pred = sigmoid(x) > 0.5 ? 1 : 0;
    return pred === y;
  }).length;
  const accuracy = correct / DATA.length;

  return (
    <div className="my-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-5">
          <div className="text-center text-lg font-mono text-gray-700 dark:text-gray-300">
            &sigma;(<span className="text-blue-600 dark:text-blue-400 font-bold">{w.toFixed(1)}</span>x + <span className="text-blue-600 dark:text-blue-400 font-bold">{b.toFixed(1)}</span>)
          </div>
          <Slider label="w" value={w} min={-5} max={5} step={0.1} onChange={setW} />
          <Slider label="b" value={b} min={-5} max={5} step={0.1} onChange={setB} />
          <div className="text-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">Accuracy: </span>
            <span className={`font-mono font-bold ${accuracy === 1 ? "text-green-600 dark:text-green-400" : accuracy >= 0.8 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"}`}>
              {(accuracy * 100).toFixed(0)}%
            </span>
            <span className="text-gray-400 dark:text-gray-500 ml-1">({correct}/{DATA.length})</span>
          </div>
          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            Decision boundary: {boundary === null ? "undefined (w = 0)" : `x = ${boundary.toFixed(2)}`}
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => {
                setW(INITIAL_W);
                setB(INITIAL_B);
              }}
              className="rounded-full border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-700 transition-colors hover:border-stone-400 hover:bg-white dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Reset sliders
            </button>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
            Adjust the sigmoid to separate the two classes (red = 0, blue = 1). The decision boundary is at 0.5.
          </p>
        </div>
        <div className="flex-1">
          <Graph xMin={-5} xMax={5} yMin={-0.2} yMax={1.2}>
            {({ toX, toY, xMin, xMax }: { toX: (x: number) => number; toY: (y: number) => number; xMin: number; xMax: number }) => (
              <>
                {/* Decision boundary line */}
                <line x1={toX(xMin)} y1={toY(0.5)} x2={toX(xMax)} y2={toY(0.5)} stroke="rgb(156,163,175)" strokeWidth={1} strokeDasharray="4 4" />
                <PlotLine fn={sigmoid} toX={toX} toY={toY} xMin={xMin} xMax={xMax} />
                {/* Class 0 points */}
                <PlotPoints
                  data={DATA.filter(([, y]) => y === 0)}
                  toX={toX}
                  toY={toY}
                  color="rgb(239, 68, 68)"
                />
                {/* Class 1 points */}
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
