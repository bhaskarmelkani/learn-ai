import { useMemo, useState, type ReactNode } from "react";
import { Graph, PlotLine, PlotPoints } from "./Graph";
import { Slider } from "./Slider";

const DATA: [number, number][] = [
  [-3, 9.2], [-2.5, 6.5], [-2, 4.3], [-1.5, 2.5], [-1, 1.2],
  [-0.5, 0.4], [0, 0.1], [0.5, 0.3], [1, 0.9], [1.5, 2.1],
  [2, 3.8], [2.5, 6.1], [3, 8.8],
];

function mse(fn: (x: number) => number) {
  return DATA.reduce((sum, [x, y]) => sum + (y - fn(x)) ** 2, 0) / DATA.length;
}

function Panel({
  title,
  subtitle,
  children,
  fn,
  yMin,
  yMax,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  fn: (x: number) => number;
  yMin: number;
  yMax: number;
}) {
  const error = useMemo(() => mse(fn), [fn]);

  return (
    <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
      <div className="mb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">{title}</p>
        <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-gray-400">{subtitle}</p>
      </div>
      <div className="space-y-4">{children}</div>
      <div className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm text-stone-700 shadow-sm dark:bg-gray-900 dark:text-gray-200">
        MSE: <span className="font-mono font-semibold">{error.toFixed(3)}</span>
      </div>
      <Graph xMin={-3.5} xMax={3.5} yMin={yMin} yMax={yMax}>
        {({ toX, toY, xMin, xMax }) => (
          <>
            <PlotLine fn={fn} toX={toX} toY={toY} xMin={xMin} xMax={xMax} />
            <PlotPoints data={DATA} toX={toX} toY={toY} />
          </>
        )}
      </Graph>
    </div>
  );
}

export function NonlinearComparisonDemo() {
  const [linearW, setLinearW] = useState(2.5);
  const [linearB, setLinearB] = useState(1.5);
  const [quadA, setQuadA] = useState(1.0);
  const [quadB, setQuadB] = useState(0.0);
  const [quadC, setQuadC] = useState(0.0);
  const [pieceSlopeLeft, setPieceSlopeLeft] = useState(2.0);
  const [pieceSlopeRight, setPieceSlopeRight] = useState(3.0);
  const [pieceBias, setPieceBias] = useState(0.4);
  const [splitX, setSplitX] = useState(0.5);

  const linearFn = (x: number) => linearW * x + linearB;
  const quadFn = (x: number) => quadA * x * x + quadB * x + quadC;
  const pieceFn = (x: number) => {
    const yAtSplit = pieceSlopeLeft * splitX + pieceBias;
    if (x < splitX) return pieceSlopeLeft * x + pieceBias;
    return pieceSlopeRight * (x - splitX) + yAtSplit;
  };

  return (
    <div className="my-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
          Same data, three model shapes
        </p>
        <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">
          Compare linear, quadratic, and piecewise fits
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600 dark:text-gray-400">
          This keeps the same house-price world across all three panels so the learner can see exactly why non-linearity matters.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Panel
          title="Linear"
          subtitle="Good for straight trends, weak for curves."
          fn={linearFn}
          yMin={-1}
          yMax={11}
        >
          <Slider label="w" value={linearW} min={-1} max={5} step={0.1} onChange={setLinearW} />
          <Slider label="b" value={linearB} min={-2} max={6} step={0.1} onChange={setLinearB} />
        </Panel>
        <Panel
          title="Quadratic"
          subtitle="One extra curved term captures diminishing returns."
          fn={quadFn}
          yMin={-1}
          yMax={11}
        >
          <Slider label="a" value={quadA} min={-1} max={2} step={0.1} onChange={setQuadA} />
          <Slider label="b" value={quadB} min={-3} max={5} step={0.1} onChange={setQuadB} />
          <Slider label="c" value={quadC} min={-2} max={4} step={0.1} onChange={setQuadC} />
        </Panel>
        <Panel
          title="Piecewise"
          subtitle="Two straight segments joined together."
          fn={pieceFn}
          yMin={-1}
          yMax={11}
        >
          <Slider label="left" value={pieceSlopeLeft} min={0.5} max={4} step={0.1} onChange={setPieceSlopeLeft} />
          <Slider label="right" value={pieceSlopeRight} min={0.5} max={5} step={0.1} onChange={setPieceSlopeRight} />
          <Slider label="split" value={splitX} min={-1} max={2} step={0.1} onChange={setSplitX} />
          <Slider label="bias" value={pieceBias} min={-1} max={5} step={0.1} onChange={setPieceBias} />
        </Panel>
      </div>
    </div>
  );
}
