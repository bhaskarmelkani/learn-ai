import type { ReactNode } from "react";
import type { BrowserAIStatusSnapshot } from "../../lib/browser-ai";

type BrowserAIPhase =
  | "error"
  | "idle"
  | "loading"
  | "offline"
  | "ready"
  | "running"
  | "unsupported";

export function BrowserAILabFrame({
  eyebrow,
  title,
  description,
  badge,
  children,
}: {
  badge?: ReactNode;
  children: ReactNode;
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="my-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
            {eyebrow}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">
            {title}
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600 dark:text-gray-400">
            {description}
          </p>
        </div>
        {badge}
      </div>
      {children}
    </div>
  );
}

export function BrowserAIModelBadge({
  detail,
  title,
}: {
  detail: string;
  title: string;
}) {
  return (
    <div className="min-w-[14rem] rounded-[1.25rem] border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-950 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-100">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-xs leading-5 text-cyan-800 dark:text-cyan-200">
        {detail}
      </p>
    </div>
  );
}

export function BrowserAIStatusPanel({
  message,
  phase,
  status,
}: {
  message: string;
  phase: BrowserAIPhase;
  status: BrowserAIStatusSnapshot;
}) {
  const phaseTone =
    phase === "error"
      ? "border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-100"
      : phase === "offline"
        ? "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-100"
        : "border-stone-200 bg-stone-50 text-stone-900 dark:border-gray-800 dark:bg-gray-950/60 dark:text-gray-100";

  return (
    <div className={`mt-4 rounded-[1.5rem] border p-4 ${phaseTone}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-white/80 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-stone-700 dark:bg-gray-900 dark:text-gray-200">
          {phase}
        </span>
        {status.capabilities.mock ? (
          <span className="rounded-full bg-cyan-100 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cyan-900 dark:bg-cyan-500/20 dark:text-cyan-100">
            Mock mode
          </span>
        ) : null}
        {status.capabilities.webgpu ? (
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-100">
            WebGPU available
          </span>
        ) : (
          <span className="rounded-full bg-stone-200 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-stone-700 dark:bg-gray-800 dark:text-gray-300">
            WASM-safe path
          </span>
        )}
      </div>
      <p className="mt-3 text-sm leading-6">{message}</p>
    </div>
  );
}

export function ScenarioPills({
  activeIndex,
  items,
  onSelect,
}: {
  activeIndex: number;
  items: string[];
  onSelect: (index: number) => void;
}) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {items.map((item, index) => (
        <button
          key={item}
          type="button"
          onClick={() => onSelect(index)}
          className={`rounded-full px-4 py-2 text-sm transition-colors ${
            activeIndex === index
              ? "bg-cyan-600 text-white"
              : "bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export function ControlGrid({ children }: { children: ReactNode }) {
  return <div className="mt-6 grid gap-4 lg:grid-cols-2">{children}</div>;
}

export function Panel({
  children,
  title,
  tone = "stone",
}: {
  children: ReactNode;
  title: string;
  tone?: "amber" | "cyan" | "emerald" | "rose" | "stone";
}) {
  const tones = {
    amber:
      "border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/10",
    cyan: "border-cyan-200 bg-cyan-50 dark:border-cyan-500/20 dark:bg-cyan-500/10",
    emerald:
      "border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/10",
    rose: "border-rose-200 bg-rose-50 dark:border-rose-500/20 dark:bg-rose-500/10",
    stone:
      "border-stone-200 bg-stone-50 dark:border-gray-800 dark:bg-gray-950/60",
  } as const;

  const copyTones = {
    amber:
      "text-amber-800 dark:text-amber-200 [&_p]:text-amber-950 dark:[&_p]:text-amber-100",
    cyan: "text-cyan-800 dark:text-cyan-200 [&_p]:text-cyan-950 dark:[&_p]:text-cyan-100",
    emerald:
      "text-emerald-700 dark:text-emerald-300 [&_p]:text-emerald-950 dark:[&_p]:text-emerald-100",
    rose: "text-rose-700 dark:text-rose-300 [&_p]:text-rose-950 dark:[&_p]:text-rose-100",
    stone:
      "text-stone-500 dark:text-gray-500 [&_p]:text-stone-800 dark:[&_p]:text-gray-200",
  } as const;

  return (
    <div className={`rounded-[1.5rem] border p-4 ${tones[tone]}`}>
      <p
        className={`text-xs font-semibold uppercase tracking-[0.2em] ${copyTones[tone]}`}
      >
        {title}
      </p>
      <div className="mt-3 text-sm leading-6">{children}</div>
    </div>
  );
}

export function TokenPills({ tokens }: { tokens: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {tokens.map((token, index) => (
        <span
          key={`${token}-${index}`}
          className="rounded-full border border-stone-200 bg-white px-2.5 py-1 font-mono text-xs text-stone-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
        >
          {token === " " ? "<space>" : token === "\n" ? "<newline>" : token}
        </span>
      ))}
    </div>
  );
}

export function NoticeList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2 text-sm leading-6 text-cyan-950 dark:text-cyan-100">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
