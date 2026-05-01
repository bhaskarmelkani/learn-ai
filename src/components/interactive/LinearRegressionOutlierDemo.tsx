import { useMemo, useRef, useState } from "react";
import { GRAPH_PAD, Graph, PlotLine, PlotPoints } from "./Graph";
import { HOUSE_LINEAR_DATA, HOUSE_X_LABEL, HOUSE_Y_LABEL } from "./data";

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
  const [outlier, setOutlier] = useState<[number, number]>([4.8, 7.1]);
  const [dragging, setDragging] = useState(false);

  const data = useMemo(() => [...HOUSE_LINEAR_DATA, outlier], [outlier]);
  const { w, b } = useMemo(() => fitLine(data), [data]);
  const loss = mse(data, (x) => w * x + b);
  const yAtOutlier = w * outlier[0] + b;

  const updateFromPointer = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const xMin = 0.6;
    const xMax = 5.2;
    const yMin = 1.0;
    const yMax = 8.4;
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
              Drag the green point around and watch the fitted line react. One unusual sale can pull the whole story upward or downward.
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
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">Mean squared error (MSE)</p>
              <p className="mt-1 font-mono text-lg font-semibold text-stone-900 dark:text-white">{loss.toFixed(3)}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-100">
            What to notice: if the point moves far away from the cluster, the fitted line bends toward it. That is why outliers matter.
          </div>
        </div>
        <div className="flex-1">
          <Graph
            ref={svgRef}
            xMin={0.6}
            xMax={5.2}
            yMin={1}
            yMax={8.4}
            xLabel={HOUSE_X_LABEL}
            yLabel={HOUSE_Y_LABEL}
            caption="Move the unusual sale and watch how much the fitted line changes."
          >
            {({ toX, toY, xMin, xMax }) => (
              <>
                <PlotLine fn={(x) => w * x + b} toX={toX} toY={toY} xMin={xMin} xMax={xMax} />
                <PlotPoints data={HOUSE_LINEAR_DATA} toX={toX} toY={toY} />
                <circle
                  cx={toX(outlier[0])}
                  cy={toY(outlier[1])}
                  r={7}
                  fill="rgb(34, 197, 94)"
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
                  stroke="rgb(34, 197, 94)"
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
