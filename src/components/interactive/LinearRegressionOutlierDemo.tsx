import { useMemo, useRef, useState } from "react";
import { GRAPH_PAD, Graph, PlotLine, PlotPoints } from "./Graph";

const BASE_DATA: [number, number][] = [
  [1, 2.2],
  [1.5, 2.8],
  [2, 3.4],
  [2.5, 4.0],
  [3, 4.7],
  [3.5, 5.0],
  [4, 5.8],
  [4.5, 6.2],
  [5, 7.0],
];

function fitLine(data: [number, number][]) {
  const n = data.length;
  const sumX = data.reduce((sum, [x]) => sum + x, 0);
  const sumY = data.reduce((sum, [, y]) => sum + y, 0);
  const sumXX = data.reduce((sum, [x]) => sum + x * x, 0);
  const sumXY = data.reduce((sum, [x, y]) => sum + x * y, 0);
  const denominator = n * sumXX - sumX * sumX || 1;
  const w = (n * sumXY - sumX * sumY) / denominator;
  const b = (sumY - w * sumX) / n;
  return { w, b };
}

function mse(data: [number, number][], fn: (x: number) => number) {
  return data.reduce((sum, [x, y]) => sum + (y - fn(x)) ** 2, 0) / data.length;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function LinearRegressionOutlierDemo() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [outlier, setOutlier] = useState<[number, number]>([6.2, 8.5]);
  const [dragging, setDragging] = useState(false);

  const data = useMemo(() => [...BASE_DATA, outlier], [outlier]);
  const { w, b } = useMemo(() => fitLine(data), [data]);
  const loss = mse(data, (x) => w * x + b);
  const yAtOutlier = w * outlier[0] + b;

  const updateFromPointer = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const xMin = 0;
    const xMax = 7;
    const yMin = 0;
    const yMax = 10;
    const plotWidth = rect.width - GRAPH_PAD.left - GRAPH_PAD.right;
    const plotHeight = rect.height - GRAPH_PAD.top - GRAPH_PAD.bottom;

    const x = xMin + ((clientX - rect.left - GRAPH_PAD.left) / plotWidth) * (xMax - xMin);
    const y = yMax - ((clientY - rect.top - GRAPH_PAD.top) / plotHeight) * (yMax - yMin);
    setOutlier([clamp(x, xMin, xMax), clamp(y, yMin, yMax)]);
  };

  return (
    <div className="my-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
              Move One Point
            </p>
            <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">
              Watch the line react to an outlier
            </h3>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-gray-400">
              Drag the red point around. The slope and intercept update immediately, so learners can feel how one unusual example affects the fit.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">Slope</p>
              <p className="mt-1 font-mono text-lg font-semibold text-stone-900 dark:text-white">{w.toFixed(2)}</p>
            </div>
            <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">Bias</p>
              <p className="mt-1 font-mono text-lg font-semibold text-stone-900 dark:text-white">{b.toFixed(2)}</p>
            </div>
            <div className="rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">MSE</p>
              <p className="mt-1 font-mono text-lg font-semibold text-stone-900 dark:text-white">{loss.toFixed(3)}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-100">
            If the point moves far away from the cluster, the fitted line bends toward it. That is the tangible reason outliers matter.
          </div>
        </div>
        <div className="flex-1">
          <Graph ref={svgRef} xMin={0} xMax={7} yMin={0} yMax={10}>
            {({ toX, toY, xMin, xMax }) => (
              <>
                <PlotLine fn={(x) => w * x + b} toX={toX} toY={toY} xMin={xMin} xMax={xMax} />
                <PlotPoints data={BASE_DATA} toX={toX} toY={toY} />
                <circle
                  cx={toX(outlier[0])}
                  cy={toY(outlier[1])}
                  r={7}
                  fill="rgb(239, 68, 68)"
                  stroke="white"
                  strokeWidth={2}
                  style={{ cursor: dragging ? "grabbing" : "grab" }}
                  onPointerDown={(event) => {
                    event.currentTarget.setPointerCapture(event.pointerId);
                    setDragging(true);
                  }}
                  onPointerMove={(event) => {
                    if (!dragging) return;
                    updateFromPointer(event.clientX, event.clientY);
                  }}
                  onPointerUp={() => setDragging(false)}
                  onPointerLeave={() => setDragging(false)}
                />
                <line
                  x1={toX(outlier[0])}
                  y1={toY(outlier[1])}
                  x2={toX(outlier[0])}
                  y2={toY(yAtOutlier)}
                  stroke="rgb(239, 68, 68)"
                  strokeDasharray="4 4"
                  strokeOpacity={0.45}
                />
              </>
            )}
          </Graph>
        </div>
      </div>
    </div>
  );
}
