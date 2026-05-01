/* eslint-disable react-refresh/only-export-components */
import { forwardRef, useId, type ReactNode } from "react";

type PlotRenderProps = {
  toX: (x: number) => number;
  toY: (y: number) => number;
  xMin: number;
  xMax: number;
};

interface GraphProps {
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  width?: number;
  height?: number;
  xLabel?: string;
  yLabel?: string;
  caption?: string;
  children?: ReactNode | ((props: PlotRenderProps) => ReactNode);
}

export const GRAPH_PAD = { top: 20, right: 20, bottom: 58, left: 58 };

export const Graph = forwardRef<SVGSVGElement, GraphProps>(function Graph(
  {
    xMin = -10,
    xMax = 10,
    yMin = -10,
    yMax = 10,
    width = 400,
    height = 300,
    xLabel,
    yLabel,
    caption,
    children,
  }: GraphProps,
  ref
) {
  const clipPathId = useId();
  const w = width - GRAPH_PAD.left - GRAPH_PAD.right;
  const h = height - GRAPH_PAD.top - GRAPH_PAD.bottom;

  const toX = (x: number) => GRAPH_PAD.left + ((x - xMin) / (xMax - xMin)) * w;
  const toY = (y: number) => GRAPH_PAD.top + ((yMax - y) / (yMax - yMin)) * h;

  const xStep = niceStep(xMin, xMax);
  const yStep = niceStep(yMin, yMax);
  const xTicks = buildTicks(xMin, xMax, xStep);
  const yTicks = buildTicks(yMin, yMax, yStep);
  const gridLines: ReactNode[] = [];
  const labels: ReactNode[] = [];

  for (const x of xTicks) {
    const px = toX(x);
    gridLines.push(
      <line
        key={`gx${x}`}
        x1={px}
        y1={GRAPH_PAD.top}
        x2={px}
        y2={GRAPH_PAD.top + h}
        className="stroke-gray-200 dark:stroke-gray-700"
        strokeWidth={Math.abs(x) < xStep / 100 ? 1.5 : 0.5}
      />
    );
    labels.push(
      <text key={`lx${x}`} x={px} y={GRAPH_PAD.top + h + 16} textAnchor="middle" className="fill-gray-400 dark:fill-gray-500 text-[10px]">
        {formatTick(x, xStep)}
      </text>
    );
  }
  for (const y of yTicks) {
    const py = toY(y);
    gridLines.push(
      <line
        key={`gy${y}`}
        x1={GRAPH_PAD.left}
        y1={py}
        x2={GRAPH_PAD.left + w}
        y2={py}
        className="stroke-gray-200 dark:stroke-gray-700"
        strokeWidth={Math.abs(y) < yStep / 100 ? 1.5 : 0.5}
      />
    );
    labels.push(
      <text key={`ly${y}`} x={GRAPH_PAD.left - 8} y={py + 3} textAnchor="end" className="fill-gray-400 dark:fill-gray-500 text-[10px]">
        {formatTick(y, yStep)}
      </text>
    );
  }

  return (
    <svg ref={ref} viewBox={`0 0 ${width} ${height}`} className="w-full max-w-lg">
      {gridLines}
      {labels}
      {/* Axes */}
      {yMin <= 0 && yMax >= 0 && (
        <line
          x1={GRAPH_PAD.left}
          y1={toY(0)}
          x2={GRAPH_PAD.left + w}
          y2={toY(0)}
          className="stroke-gray-400 dark:stroke-gray-500"
          strokeWidth={1}
        />
      )}
      {xMin <= 0 && xMax >= 0 && (
        <line
          x1={toX(0)}
          y1={GRAPH_PAD.top}
          x2={toX(0)}
          y2={GRAPH_PAD.top + h}
          className="stroke-gray-400 dark:stroke-gray-500"
          strokeWidth={1}
        />
      )}
      {/* Clip area */}
      <defs>
        <clipPath id={clipPathId}>
          <rect x={GRAPH_PAD.left} y={GRAPH_PAD.top} width={w} height={h} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipPathId})`}>
        {typeof children === "function"
          ? children({ toX, toY, xMin, xMax })
          : children}
      </g>
      {xLabel && (
        <text
          x={GRAPH_PAD.left + w / 2}
          y={height - (caption ? 22 : 14)}
          textAnchor="middle"
          className="fill-gray-500 dark:fill-gray-400 text-[11px] font-medium"
        >
          {xLabel}
        </text>
      )}
      {yLabel && (
        <text
          x={18}
          y={GRAPH_PAD.top + h / 2}
          textAnchor="middle"
          transform={`rotate(-90 18 ${GRAPH_PAD.top + h / 2})`}
          className="fill-gray-500 dark:fill-gray-400 text-[11px] font-medium"
        >
          {yLabel}
        </text>
      )}
      {caption && (
        <text
          x={GRAPH_PAD.left + w / 2}
          y={height - 8}
          textAnchor="middle"
          className="fill-gray-400 dark:fill-gray-500 text-[10px]"
        >
          {caption}
        </text>
      )}
    </svg>
  );
});

function niceStep(min: number, max: number): number {
  const range = max - min;
  const rough = range / 6;
  const pow = Math.pow(10, Math.floor(Math.log10(rough)));
  const norm = rough / pow;
  if (norm < 1.5) return pow;
  if (norm < 3.5) return 2 * pow;
  if (norm < 7.5) return 5 * pow;
  return 10 * pow;
}

function buildTicks(min: number, max: number, step: number) {
  const first = Math.ceil(min / step) * step;
  const epsilon = step / 1000;
  const ticks: number[] = [];

  for (let value = first; value <= max + epsilon; value += step) {
    ticks.push(roundToStep(value, step));
  }

  return ticks;
}

function roundToStep(value: number, step: number) {
  const precision = getPrecision(step) + 1;
  return Number(value.toFixed(precision));
}

function formatTick(value: number, step: number) {
  const rounded = roundToStep(value, step);
  if (Math.abs(rounded) < step / 1000) return "0";

  const precision = getPrecision(step);
  return precision === 0 ? String(Math.round(rounded)) : rounded.toFixed(precision);
}

function getPrecision(step: number) {
  const stepString = step.toString();
  const fractional = stepString.split(".")[1];
  return fractional ? fractional.length : 0;
}

export function PlotLine({
  fn,
  toX,
  toY,
  xMin,
  xMax,
  color = "rgb(59, 130, 246)",
  strokeWidth = 2.5,
  steps = 200,
}: {
  fn: (x: number) => number;
  toX: (x: number) => number;
  toY: (y: number) => number;
  xMin: number;
  xMax: number;
  color?: string;
  strokeWidth?: number;
  steps?: number;
}) {
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + (i / steps) * (xMax - xMin);
    const y = fn(x);
    points.push(`${toX(x)},${toY(y)}`);
  }
  return <polyline points={points.join(" ")} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />;
}

export function PlotPoints({
  data,
  toX,
  toY,
  color = "rgb(239, 68, 68)",
  radius = 4,
}: {
  data: [number, number][];
  toX: (x: number) => number;
  toY: (y: number) => number;
  color?: string;
  radius?: number;
}) {
  return (
    <>
      {data.map(([x, y], i) => (
        <circle key={i} cx={toX(x)} cy={toY(y)} r={radius} fill={color} fillOpacity={0.8} stroke="white" strokeWidth={1.5} />
      ))}
    </>
  );
}
