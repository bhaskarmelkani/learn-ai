import { useState, type ReactNode } from "react";

export function Exercise({
  title = "Try This",
  hint,
  children,
}: {
  title?: string;
  hint?: string;
  children: ReactNode;
}) {
  const [response, setResponse] = useState("");
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="my-8 overflow-hidden rounded-[1.5rem] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 shadow-sm dark:border-emerald-500/20 dark:from-emerald-500/10 dark:via-gray-900 dark:to-cyan-500/10">
      <div className="border-b border-emerald-200/70 px-5 py-3 dark:border-emerald-500/20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700 dark:text-emerald-300">
          {title}
        </p>
      </div>
      <div className="px-5 py-4 text-base leading-7 text-stone-700 dark:text-gray-200 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0 [&_strong]:text-stone-950 dark:[&_strong]:text-white">
        {children}
      </div>
      <div className="border-t border-emerald-200/70 px-5 py-4 dark:border-emerald-500/20">
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          rows={3}
          placeholder="Write your answer here..."
          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm leading-6 text-stone-800 outline-none transition-colors placeholder:text-stone-400 focus:border-emerald-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-emerald-500"
        />
        <div className="mt-3 flex items-center gap-3">
          {response.trim().length > 0 && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400">
              {response.trim().split(/\s+/).length} words
            </span>
          )}
          {hint && (
            <button
              type="button"
              onClick={() => setShowHint((v) => !v)}
              className="ml-auto rounded-full border border-emerald-200 px-3 py-1 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-50 dark:border-emerald-500/20 dark:text-emerald-300 dark:hover:bg-emerald-500/10"
            >
              {showHint ? "Hide example" : "Show example answer"}
            </button>
          )}
        </div>
        {showHint && hint && (
          <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-100">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Example answer</p>
            <p className="mt-1">{hint}</p>
          </div>
        )}
      </div>
    </div>
  );
}
