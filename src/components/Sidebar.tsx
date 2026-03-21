import {
  COURSE_LEVELS,
  COURSE_LEVEL_LABELS,
  PROFESSION_LABELS,
  type Chapter,
  type CourseLevel,
  type LearningTrack,
  type PlannedModule,
} from "../content";

export function Sidebar({
  track,
  trackSummaries,
  level,
  chapters,
  current,
  onSelectChapter,
  onSelectTrack,
  onSelectLevel,
  visible,
  dark,
  isDesktop,
  progress,
  hasPublishedContent,
  blueprintModules,
  onToggleSidebar,
  onToggleTheme,
}: {
  track: LearningTrack;
  trackSummaries: Array<{
    track: LearningTrack;
    publishedLevels: Record<CourseLevel, boolean>;
  }>;
  level: CourseLevel;
  chapters: Chapter[];
  current: number;
  onSelectChapter: (i: number) => void;
  onSelectTrack: (trackId: string) => void;
  onSelectLevel: (level: CourseLevel) => void;
  visible: boolean;
  dark: boolean;
  isDesktop: boolean;
  progress: number;
  hasPublishedContent: boolean;
  blueprintModules: PlannedModule[];
  onToggleSidebar: () => void;
  onToggleTheme: () => void;
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
              Learning platform
            </p>
            <h1 className="mt-2 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 bg-clip-text text-lg font-bold text-transparent">
              Learn AI Studio
            </h1>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-gray-400">
              Profession-based learning tracks with conceptual and builder paths, designed to be expanded by coding agents.
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
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                Current track
              </p>
              <p className="mt-1 text-sm font-semibold text-stone-900 dark:text-gray-100">
                {track.title}
              </p>
            </div>
            <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-600 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300">
              {COURSE_LEVEL_LABELS[level]}
            </span>
          </div>
          <p className="mt-3 text-xs leading-6 text-stone-500 dark:text-gray-500">
            {track.tagline}
          </p>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div>
          <p className="px-3 text-xs font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-gray-500">
            Learning tracks
          </p>
          <div className="mt-3 space-y-2">
            {trackSummaries.map(({ track: option, publishedLevels }) => (
              <button
                key={option.id}
                onClick={() => onSelectTrack(option.id)}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                  option.id === track.id
                    ? "border-cyan-200 bg-cyan-50 text-cyan-900 shadow-sm dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-100"
                    : "border-transparent text-stone-600 hover:border-stone-200 hover:bg-white hover:text-stone-900 dark:text-gray-400 dark:hover:border-gray-800 dark:hover:bg-gray-900 dark:hover:text-gray-100"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{option.title}</p>
                    <p className="mt-1 text-xs text-stone-500 dark:text-gray-500">
                      {PROFESSION_LABELS[option.profession]}
                    </p>
                  </div>
                  <span className="rounded-full border border-stone-200 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
                    {option.shortTitle}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.18em]">
                  {COURSE_LEVELS.map((levelOption) => (
                    <span
                      key={levelOption}
                      className={`rounded-full px-2 py-1 ${
                        publishedLevels[levelOption]
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300"
                          : "bg-stone-200 text-stone-600 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {COURSE_LEVEL_LABELS[levelOption]} {publishedLevels[levelOption] ? "live" : "blueprint"}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-gray-500">
              Level
            </p>
            <p className="text-xs text-stone-500 dark:text-gray-500">
              Switch depth without leaving the track
            </p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {COURSE_LEVELS.map((levelOption) => (
              <button
                key={levelOption}
                onClick={() => onSelectLevel(levelOption)}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                  levelOption === level
                    ? "border-cyan-200 bg-cyan-50 text-cyan-900 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-100"
                    : "border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300 hover:text-stone-900 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-100"
                }`}
              >
                {COURSE_LEVEL_LABELS[levelOption]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          {hasPublishedContent ? (
            <>
              <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                <span>Track progress</span>
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
            </>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                Blueprint mode
              </p>
              <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-gray-400">
                This level is scaffolded for contribution. The planned modules below show the intended chapter arc.
              </p>
              <p className="mt-3 text-xs text-stone-500 dark:text-gray-500">
                Use the in-repo <code className="rounded bg-stone-100 px-1.5 py-0.5 dark:bg-gray-800">$course-authoring</code> skill to generate starter material.
              </p>
            </>
          )}
        </div>

        <div className="mt-6">
          <p className="px-3 text-xs font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-gray-500">
            {hasPublishedContent ? "Published chapters" : "Planned modules"}
          </p>
          <div className="mt-3 space-y-2">
            {hasPublishedContent
              ? chapters.map((ch, i) => (
                  <button
                    key={ch.id}
                    onClick={() => onSelectChapter(i)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
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
                ))
              : blueprintModules.map((module, index) => (
                  <div
                    key={module.title}
                    className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-950/70"
                  >
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-semibold text-stone-500 shadow-sm dark:bg-gray-900 dark:text-gray-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-stone-900 dark:text-gray-100">
                          {module.title}
                        </p>
                        <p className="mt-1 text-xs leading-6 text-stone-500 dark:text-gray-500">
                          {module.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </nav>
      <div className="border-t border-stone-200 px-6 py-4 text-xs text-stone-500 dark:border-gray-800 dark:text-gray-500">
        Built for learner-friendly delivery and agent-assisted contribution. Published lessons and scaffolded blueprints can live side by side.
      </div>
    </aside>
  );
}
