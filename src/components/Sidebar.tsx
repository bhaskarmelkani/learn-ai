import { useState } from "react";
import type { Chapter } from "../chapters";
import type { AudienceTrack } from "../learning/LearningContext";
import { getTrackLabel } from "../learning/LearningContext";

const TRACK_HELPER_COPY: Record<AudienceTrack, string> = {
  conceptual: "Intuition-first notes with lighter technical detail.",
  builder: "More hands-on labs, code framing, and implementation cues.",
  educator: "Teaching, product, and decision-making framing for teams.",
};

export function Sidebar({
  chapters,
  current,
  onSelect,
  visible,
  collapsed,
  dark,
  isDesktop,
  progress,
  onToggleSidebar,
  onToggleTheme,
  track,
  onSelectTrack,
  guidedMode,
  onToggleGuidedMode,
}: {
  chapters: Chapter[];
  current: number;
  onSelect: (i: number) => void;
  visible: boolean;
  collapsed: boolean;
  dark: boolean;
  isDesktop: boolean;
  progress: number;
  onToggleSidebar: () => void;
  onToggleTheme: () => void;
  track: AudienceTrack;
  onSelectTrack: (track: AudienceTrack) => void;
  guidedMode: boolean;
  onToggleGuidedMode: () => void;
}) {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 z-30 flex h-full flex-col border-r border-stone-200 bg-stone-50/98 shadow-xl backdrop-blur transition-[transform,width] duration-200 dark:border-gray-800 dark:bg-gray-950/98 ${
        collapsed ? "w-20" : "w-80"
      } ${
        visible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        className={`border-b border-stone-200 bg-gradient-to-br from-sky-50 via-white to-emerald-50 dark:border-gray-800 dark:from-sky-950/30 dark:via-gray-950 dark:to-emerald-950/20 ${
          collapsed ? "px-3 py-4" : "px-6 py-5"
        }`}
      >
        <div className={`flex items-start justify-between gap-4 ${collapsed ? "flex-col items-center text-center" : ""}`}>
          <div className={collapsed ? "w-full" : ""}>
            {collapsed ? (
              <div className="flex flex-col items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[1.45rem] bg-white shadow-md ring-1 ring-sky-200 dark:bg-gray-900 dark:ring-sky-900/60"
                  title="AI In-tuition"
                >
                  <span className="bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 bg-clip-text text-base font-bold tracking-[0.2em] text-transparent">
                    AI
                  </span>
                </div>
                <div className="h-px w-10 bg-gradient-to-r from-sky-200 via-cyan-200 to-emerald-200 dark:from-sky-900/60 dark:via-cyan-900/60 dark:to-emerald-900/60" />
              </div>
            ) : (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500 dark:text-gray-500">
                  Training
                </p>
                <h1 className="mt-2 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 bg-clip-text text-lg font-bold text-transparent">
                  AI In-tuition
                </h1>
              </>
            )}
            {!collapsed && (
              <p className="mt-2 max-w-[15rem] text-sm leading-6 text-stone-600 dark:text-gray-400">
                Short chapters and live demos for self-study and teaching sessions.
              </p>
            )}
          </div>
          <div className={`flex items-center gap-2 ${collapsed ? "w-full flex-col justify-center gap-3" : ""}`}>
            {!isDesktop && (
              <button
                type="button"
                onClick={onToggleSidebar}
                className="rounded-lg p-2 text-stone-500 transition-colors hover:bg-stone-200 hover:text-stone-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                title="Close navigation"
              >
                ✕
              </button>
            )}
            {isDesktop && (
              <button
                type="button"
                onClick={onToggleSidebar}
                className={`text-stone-600 transition-colors hover:text-stone-900 dark:text-gray-300 dark:hover:text-gray-100 ${
                  collapsed
                    ? "flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-sky-200 hover:bg-sky-50 dark:bg-gray-900 dark:ring-sky-900/60 dark:hover:bg-gray-800"
                    : "rounded-lg p-2 hover:bg-stone-200 dark:hover:bg-gray-800"
                }`}
                title={collapsed ? "Expand chapter rail" : "Collapse chapter rail"}
              >
                {collapsed ? "→" : "←"}
              </button>
            )}
            <button
              onClick={onToggleTheme}
              className={`text-stone-600 transition-colors hover:text-stone-900 dark:text-gray-300 dark:hover:text-gray-100 ${
                collapsed
                  ? "flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-sky-200 hover:bg-sky-50 dark:bg-gray-900 dark:ring-sky-900/60 dark:hover:bg-gray-800"
                  : "rounded-lg p-2 hover:bg-stone-200 dark:hover:bg-gray-800"
              }`}
              title={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {!collapsed ? (
        <section className="mt-5 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <button
            type="button"
            onClick={() => setToolsOpen((open) => !open)}
            className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left"
            aria-expanded={toolsOpen}
          >
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                Course Tools
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700 dark:bg-gray-800 dark:text-gray-300">
                  {Math.round(progress)}% complete
                </span>
                <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700 dark:bg-gray-800 dark:text-gray-300">
                  {getTrackLabel(track)}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    guidedMode
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-200"
                      : "bg-stone-100 text-stone-700 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  Guided {guidedMode ? "on" : "off"}
                </span>
              </div>
              {!toolsOpen && (
                <p className="mt-3 text-xs text-stone-500 dark:text-gray-500">
                  Track changes the teaching angle. Guided mode asks learners to predict before key demos unlock.
                </p>
              )}
            </div>
            <span className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 text-stone-600 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-950/60 dark:text-gray-300">
              <svg
                className={`h-5 w-5 transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m5 7 5 6 5-6" />
              </svg>
            </span>
          </button>
          {toolsOpen && (
            <div className="border-t border-stone-200 px-4 py-4 dark:border-gray-800">
              <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                <span>Course progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-stone-200 dark:bg-gray-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 transition-[width] duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-3 text-xs text-stone-500 dark:text-gray-500">
                Keyboard shortcuts: arrow keys navigate, <kbd className="rounded bg-stone-100 px-1 py-0.5 font-mono dark:bg-gray-800">Esc</kbd> toggles this panel, <kbd className="rounded bg-stone-100 px-1 py-0.5 font-mono dark:bg-gray-800">f</kbd> enters fullscreen.
              </p>

              <div className="mt-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                      Audience Track
                    </p>
                    <p className="mt-1 text-xs text-stone-500 dark:text-gray-500">
                      Pick the teaching angle that best matches your goal.
                    </p>
                  </div>
                  <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700 dark:bg-gray-800 dark:text-gray-300">
                    {getTrackLabel(track)}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(["conceptual", "builder", "educator"] as AudienceTrack[]).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => onSelectTrack(option)}
                      className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                        option === track
                          ? "bg-cyan-600 text-white"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                      }`}
                    >
                      {getTrackLabel(option)}
                    </button>
                  ))}
                </div>
                <div className="mt-3 rounded-2xl bg-stone-50 px-3 py-3 text-sm text-stone-600 dark:bg-gray-950/60 dark:text-gray-300">
                  {TRACK_HELPER_COPY[track]}
                </div>
              </div>

              <button
                type="button"
                onClick={onToggleGuidedMode}
                className={`mt-4 w-full rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                  guidedMode
                    ? "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-100"
                    : "border-stone-200 bg-stone-50 text-stone-700 dark:border-gray-800 dark:bg-gray-950/60 dark:text-gray-300"
                }`}
              >
                <p className="font-semibold">Guided mode {guidedMode ? "on" : "off"}</p>
                <p className="mt-1 text-xs opacity-80">
                  {guidedMode
                    ? "Learners must predict first, then test their ideas in the demo."
                    : "Open exploration. Demos unlock immediately without a prediction step."}
                </p>
              </button>
            </div>
          )}
        </section>
        ) : null}
      </div>
      {(!toolsOpen || collapsed) && (
      <nav className={`flex-1 overflow-y-auto ${collapsed ? "px-2 py-4" : "px-3 py-4"}`}>
        {chapters.map((ch, i) => (
          <button
            key={ch.chapter}
            onClick={() => onSelect(i)}
            title={collapsed ? `${ch.chapter}. ${ch.title}` : undefined}
            className={`mb-2 w-full transition-colors ${
              collapsed
                ? i === current
                  ? "rounded-2xl bg-cyan-50 text-cyan-800 dark:bg-cyan-500/10 dark:text-cyan-200"
                  : "rounded-2xl text-stone-600 hover:bg-white hover:text-stone-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100"
                : i === current
                  ? "rounded-2xl border border-cyan-200 bg-cyan-50 text-cyan-800 shadow-sm dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-200"
                  : "rounded-2xl border border-transparent text-stone-600 hover:border-stone-200 hover:bg-white hover:text-stone-900 dark:text-gray-400 dark:hover:border-gray-800 dark:hover:bg-gray-900 dark:hover:text-gray-100"
            } ${collapsed ? "px-1 py-2.5" : "px-4 py-3 text-left"}`}
          >
            {collapsed ? (
              <div className="relative flex items-center justify-center">
                {i === current && (
                  <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-cyan-500" />
                )}
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-[1.15rem] text-sm font-bold shadow-md ring-1 transition-colors ${
                    i === current
                      ? "bg-cyan-600 text-white ring-cyan-200 dark:bg-cyan-500 dark:text-white dark:ring-cyan-400/30"
                      : "bg-white text-stone-600 ring-stone-200 dark:bg-gray-900 dark:text-gray-300 dark:ring-gray-800"
                  }`}
                >
                  {String(ch.chapter).padStart(2, "0")}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] bg-white text-sm font-bold text-stone-600 shadow-md ring-1 ring-stone-200 dark:bg-gray-900 dark:text-gray-300 dark:ring-gray-800">
                  {String(ch.chapter).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{ch.title}</p>
                  {ch.subtitle && (
                    <p className="mt-1 line-clamp-2 text-xs text-stone-500 dark:text-gray-500">
                      {ch.subtitle}
                    </p>
                  )}
                </div>
              </div>
            )}
          </button>
        ))}
        
      </nav>
      )}
      {collapsed ? (
        <div className="border-t border-stone-200 px-2 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400 dark:border-gray-800 dark:text-gray-500">
          {String(current + 1).padStart(2, "0")}/{String(chapters.length).padStart(2, "0")}
        </div>
      ) : null}
    </aside>
  );
}
