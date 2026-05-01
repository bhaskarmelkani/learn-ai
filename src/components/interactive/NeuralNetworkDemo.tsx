import { useState, useMemo } from "react";

const COLORS = {
  input: "rgb(59, 130, 246)",
  hidden: "rgb(168, 85, 247)",
  output: "rgb(34, 197, 94)",
  weight: "rgb(156, 163, 175)",
  weightActive: "rgb(59, 130, 246)",
};

export function NeuralNetworkDemo() {
  const [layers, setLayers] = useState([3, 4, 4, 1]);
  const [activatedNeuron, setActivatedNeuron] = useState<[number, number] | null>(null);

  const paramCount = useMemo(() => {
    let count = 0;
    for (let i = 1; i < layers.length; i++) {
      count += layers[i - 1] * layers[i] + layers[i]; // weights + biases
    }
    return count;
  }, [layers]);

  const updateLayer = (idx: number, delta: number) => {
    setLayers((prev) => {
      const next = [...prev];
      next[idx] = Math.max(1, Math.min(8, next[idx] + delta));
      return next;
    });
  };

  const width = 500;
  const height = 280;
  const layerSpacing = width / (layers.length + 1);

  const neuronPositions = layers.map((count, li) => {
    const x = layerSpacing * (li + 1);
    return Array.from({ length: count }, (_, ni) => {
      const totalH = (count - 1) * 40;
      const y = height / 2 - totalH / 2 + ni * 40;
      return { x, y };
    });
  });

  return (
    <div className="my-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center flex-wrap">
            {layers.map((count, i) => (
              <div key={i} className="flex items-center gap-1">
                {i > 0 && i < layers.length - 1 && (
                  <div className="flex flex-col gap-0.5">
                    <button onClick={() => updateLayer(i, 1)} className="w-5 h-5 rounded text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600">+</button>
                    <button onClick={() => updateLayer(i, -1)} className="w-5 h-5 rounded text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600">-</button>
                  </div>
                )}
                <span className="text-xs font-mono px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                  {i === 0 ? "in" : i === layers.length - 1 ? "out" : `h${i}`}: {count}
                </span>
              </div>
            ))}
            <button
              onClick={() => setLayers((l) => l.length < 6 ? [...l.slice(0, -1), 4, l[l.length - 1]] : l)}
              className="text-xs px-2 py-1 rounded bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-500/30"
            >
              + layer
            </button>
            <button
              onClick={() => setLayers((l) => l.length > 2 ? [...l.slice(0, -2), l[l.length - 1]] : l)}
              className="text-xs px-2 py-1 rounded bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-500/30"
            >
              - layer
            </button>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-mono font-bold text-gray-700 dark:text-gray-300">{paramCount.toLocaleString()}</span> params
          </div>
        </div>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-2xl mx-auto">
          {/* Connections */}
          {neuronPositions.slice(1).map((layer, li) =>
            layer.map((to, ni) =>
              neuronPositions[li].map((from, pi) => {
                const isActive =
                  (activatedNeuron?.[0] === li + 1 && activatedNeuron?.[1] === ni) ||
                  (activatedNeuron?.[0] === li && activatedNeuron?.[1] === pi);
                return (
                  <line
                    key={`${li}-${pi}-${ni}`}
                    x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke={isActive ? COLORS.weightActive : COLORS.weight}
                    strokeWidth={isActive ? 1.5 : 0.5}
                    strokeOpacity={isActive ? 0.8 : 0.3}
                  />
                );
              })
            )
          )}
          {/* Neurons */}
          {neuronPositions.map((layer, li) =>
            layer.map((pos, ni) => {
              const color = li === 0 ? COLORS.input : li === layers.length - 1 ? COLORS.output : COLORS.hidden;
              const isActive = activatedNeuron?.[0] === li && activatedNeuron?.[1] === ni;
              return (
                <circle
                  key={`n${li}-${ni}`}
                  cx={pos.x} cy={pos.y}
                  r={isActive ? 10 : 8}
                  fill={color}
                  fillOpacity={isActive ? 1 : 0.7}
                  stroke="white"
                  strokeWidth={1.5}
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setActivatedNeuron([li, ni])}
                  onMouseLeave={() => setActivatedNeuron(null)}
                />
              );
            })
          )}
          {/* Layer labels */}
          {neuronPositions.map((layer, li) => (
            <text
              key={`label${li}`}
              x={layer[0].x}
              y={height - 5}
              textAnchor="middle"
              className="fill-gray-400 dark:fill-gray-500 text-[10px]"
            >
              {li === 0 ? "Input" : li === layers.length - 1 ? "Output" : `Hidden ${li}`}
            </text>
          ))}
        </svg>
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
          Add/remove layers and neurons to see how parameter count changes. Hover over neurons to see connections.
        </p>
      </div>
    </div>
  );
}
