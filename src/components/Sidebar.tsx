import type { Chapter } from "../chapters";
import type { AudienceTrack } from "../learning/LearningContext";
import { getTrackLabel } from "../learning/LearningContext";

export function Sidebar({
  chapters,
  current,
  onSelect,
  visible,
  dark,
  isDesktop,
  progress,
  onToggleSidebar,
  onToggleTheme,
  track,
  onSelectTrack,
  guidedMode,
  onToggleGuidedMode,
  masterySummary,
  reviewQueue,
}: {
  chapters: Chapter[];
  current: number;
  onSelect: (i: number) => void;
  visible: boolean;
  dark: boolean;
  isDesktop: boolean;
  progress: number;
  onToggleSidebar: () => void;
  onToggleTheme: () => void;
  track: AudienceTrack;
  onSelectTrack: (track: AudienceTrack) => void;
  guidedMode: boolean;
  onToggleGuidedMode: () => void;
  masterySummary: {
    completedChecks: number;
    attemptedChecks: number;
    reviewedChapters: number;
  };
  reviewQueue: Array<{
    concept: string;
    misses: number;
    chapter: number;
  }>;
}) {
  return (
    <aside
      className={`fixed left-0 top-0 z-30 flex h-full w-80 flex-col border-r border-stone-200 bg-stone-50/98 shadow-xl backdrop-blur transition-transform duration-200 dark:border-gray-800 dark:bg-gray-950/98 ${
        visible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="border-b border-stone-200 px-6 py-5 dark:border-gray-800">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500 dark:text-gray-500">
              Training
            </p>
            <h1 className="mt-2 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 bg-clip-text text-lg font-bold text-transparent">
              AI Intuition Journey
            </h1>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-gray-400">
              Short chapters, live demos, and checkpoints designed for teaching sessions and self-study.
            </p>
          </div>
          <div className="flex items-center gap-2">
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
            <button
              onClick={onToggleTheme}
              className="rounded-lg p-2 text-stone-500 transition-colors hover:bg-stone-200 hover:text-stone-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
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
        <div className="mt-5 rounded-2xl border border-stone-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
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
        </div>
        <div className="mt-4 rounded-2xl border border-stone-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                Audience Track
              </p>
              <p className="mt-1 text-xs text-stone-500 dark:text-gray-500">
                Tune the notes, labs, and recaps to your goal.
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
                ? "Learners must predict before touching key controls."
                : "Open exploration. Demos unlock immediately."}
            </p>
          </button>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {chapters.map((ch, i) => (
          <button
            key={ch.chapter}
            onClick={() => onSelect(i)}
            className={`mb-2 w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
              i === current
                ? "border-cyan-200 bg-cyan-50 text-cyan-800 shadow-sm dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-200"
                : "border-transparent text-stone-600 hover:border-stone-200 hover:bg-white hover:text-stone-900 dark:text-gray-400 dark:hover:border-gray-800 dark:hover:bg-gray-900 dark:hover:text-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-semibold text-stone-500 shadow-sm dark:bg-gray-900 dark:text-gray-400">
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
          </button>
        ))}
        <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
            Mastery
          </p>
          <div className="mt-3 grid gap-2 text-sm">
            <div className="rounded-2xl bg-stone-50 px-3 py-2 dark:bg-gray-950/60">
              Checks understood: {masterySummary.completedChecks}/{Math.max(masterySummary.attemptedChecks, 1)}
            </div>
            <div className="rounded-2xl bg-stone-50 px-3 py-2 dark:bg-gray-950/60">
              Chapter recaps reviewed: {masterySummary.reviewedChapters}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-500 dark:text-gray-500">
              Review queue
            </p>
            <div className="mt-2 space-y-2">
              {reviewQueue.length === 0 ? (
                <p className="rounded-2xl bg-stone-50 px-3 py-2 text-xs text-stone-500 dark:bg-gray-950/60 dark:text-gray-400">
                  No weak concepts yet. Miss a checkpoint and it will appear here for review.
                </p>
              ) : (
                reviewQueue.slice(0, 4).map((item) => {
                  const chapterIndex = chapters.findIndex((chapter) => chapter.chapter === item.chapter);
                  return (
                    <button
                      key={`${item.concept}-${item.chapter}`}
                      type="button"
                      onClick={() => chapterIndex >= 0 && onSelect(chapterIndex)}
                      className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2 text-left text-xs text-stone-700 transition-colors hover:border-stone-300 hover:bg-white dark:border-gray-800 dark:bg-gray-950/60 dark:text-gray-300 dark:hover:bg-gray-900"
                    >
                      <p className="font-semibold">{item.concept}</p>
                      <p className="mt-1 text-stone-500 dark:text-gray-400">
                        Missed {item.misses} time{item.misses === 1 ? "" : "s"} · revisit Chapter {item.chapter}
                      </p>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="border-t border-stone-200 px-6 py-4 text-xs text-stone-500 dark:border-gray-800 dark:text-gray-500">
        Built for workshop pacing and solo reading. You can jump out of order, and the app will remember where you stopped.
      </div>
    </aside>
  );
}
