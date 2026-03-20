export function Slider({
  label,
  value,
  min,
  max,
  step = 0.1,
  onChange,
  disabled = false,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 ${disabled ? "opacity-50" : ""}`}>
      <span className="w-8 text-right font-mono text-sm text-gray-500 dark:text-gray-400 italic">{label}</span>
      <span className="w-12 text-right font-mono text-sm font-medium text-gray-800 dark:text-gray-200">{value.toFixed(1)}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="flex-1 h-2 rounded-full appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700 accent-blue-500 disabled:cursor-not-allowed"
      />
    </div>
  );
}
