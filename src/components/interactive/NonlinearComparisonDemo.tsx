import { useMemo, useState, type ReactNode } from "react";
import { Graph, PlotLine, PlotPoints } from "./Graph";
import { Slider } from "./Slider";
import { HOUSE_CURVED_DATA, HOUSE_X_LABEL, HOUSE_Y_LABEL } from "./data";

function mse(fn: (x: number) => number) {
  return (
    HOUSE_CURVED_DATA.reduce((sum, [x, y]) => sum + (y - fn(x)) ** 2, 0) /
    HOUSE_CURVED_DATA.length
  );
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
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">
          {title}
        </p>
        <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-gray-400">
          {subtitle}
        </p>
      </div>
      <div className="space-y-4">{children}</div>
      <div className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm text-stone-700 shadow-sm dark:bg-gray-900 dark:text-gray-200">
        Mean squared error (MSE):{" "}
        <span className="font-mono font-semibold">{error.toFixed(3)}</span>
      </div>
      <Graph
        xMin={0.8}
        xMax={4.9}
        yMin={yMin}
        yMax={yMax}
        xLabel={HOUSE_X_LABEL}
        yLabel={HOUSE_Y_LABEL}
      >
        {({ toX, toY, xMin, xMax }) => (
          <>
            <PlotLine fn={fn} toX={toX} toY={toY} xMin={xMin} xMax={xMax} />
            <PlotPoints data={HOUSE_CURVED_DATA} toX={toX} toY={toY} />
          </>
        )}
      </Graph>
    </div>
  );
}

export function NonlinearComparisonDemo() {
  const [linearW, setLinearW] = useState(1.55);
  const [linearB, setLinearB] = useState(0.1);
  const [quadA, setQuadA] = useState(0.22);
  const [quadB, setQuadB] = useState(0.25);
  const [quadC, setQuadC] = useState(1.2);
  const [pieceSlopeLeft, setPieceSlopeLeft] = useState(1.2);
  const [pieceSlopeRight, setPieceSlopeRight] = useState(2.7);
  const [pieceBias, setPieceBias] = useState(0.8);
  const [splitX, setSplitX] = useState(3.0);

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
          Same story, three shapes
        </p>
        <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">
          Compare three ways to follow the same premium-home trend
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600 dark:text-gray-400">
          Keep the data fixed and compare how a straight line, a curve, and a piecewise rule respond to the same house-price pattern.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Panel
          title="Linear"
          subtitle="One overall trend, but no bend."
          fn={linearFn}
          yMin={1}
          yMax={10}
        >
          <Slider label="w" value={linearW} min={0.6} max={2.3} step={0.05} onChange={setLinearW} />
          <Slider label="b" value={linearB} min={-1} max={2} step={0.05} onChange={setLinearB} />
        </Panel>
        <Panel
          title="Quadratic"
          subtitle="One extra curved term captures the premium bend."
          fn={quadFn}
          yMin={1}
          yMax={10}
        >
          <Slider label="a" value={quadA} min={-0.1} max={0.5} step={0.02} onChange={setQuadA} />
          <Slider label="b" value={quadB} min={-0.5} max={1.2} step={0.05} onChange={setQuadB} />
          <Slider label="c" value={quadC} min={0} max={2.4} step={0.05} onChange={setQuadC} />
        </Panel>
        <Panel
          title="Piecewise"
          subtitle="One rule for regular homes, another for premium homes."
          fn={pieceFn}
          yMin={1}
          yMax={10}
        >
          <Slider
            label="left"
            value={pieceSlopeLeft}
            min={0.5}
            max={2.2}
            step={0.05}
            onChange={setPieceSlopeLeft}
          />
          <Slider
            label="right"
            value={pieceSlopeRight}
            min={1.4}
            max={3.5}
            step={0.05}
            onChange={setPieceSlopeRight}
          />
          <Slider
            label="split"
            value={splitX}
            min={1.8}
            max={4.2}
            step={0.1}
            onChange={setSplitX}
          />
          <Slider
            label="bias"
            value={pieceBias}
            min={0}
            max={2.2}
            step={0.05}
            onChange={setPieceBias}
          />
        </Panel>
      </div>
    </div>
  );
}
