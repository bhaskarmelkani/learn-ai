import {
  House,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  SunMedium,
} from "lucide-react";
import type { AudienceTrack } from "../learning/LearningContext";
import { getTrackLabel } from "../learning/LearningContext";

interface SidebarChapter {
  chapter: number;
  title: string;
  subtitle?: string;
}

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
  completedChapters,
  courseTitle = "AI In-tuition",
  onBackToCatalog,
}: {
  chapters: SidebarChapter[];
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
  completedChapters: Record<number, boolean>;
  courseTitle?: string;
  onBackToCatalog?: () => void;
}) {
  const themeActionLabel = dark ? "Light mode" : "Dark mode";
  const ThemeIcon = dark ? SunMedium : Moon;

  return (
    <aside
      className={`fixed left-0 top-0 z-30 flex h-full flex-col border-r border-stone-200 bg-stone-50/98 shadow-xl backdrop-blur transition-[transform,width] duration-200 dark:border-gray-800 dark:bg-gray-950/98 ${
        visible ? "translate-x-0" : "-translate-x-full"
      } ${collapsed ? "w-[4.5rem]" : "w-72"}`}
    >
      <div
        className={`border-b border-stone-200 ${
          collapsed ? "px-2 py-4" : "px-5 py-4"
        } dark:border-gray-800`}
      >
        {collapsed ? (
          <div className="flex flex-col items-center gap-2.5">
            {onBackToCatalog && (
              <button
                type="button"
                onClick={onBackToCatalog}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-stone-500 shadow-sm ring-1 ring-stone-200 transition-colors hover:bg-stone-50 hover:text-stone-900 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                title="All courses"
                aria-label="Back to course catalog"
              >
                <House className="h-4 w-4" />
              </button>
            )}
            {isDesktop && (
              <button
                type="button"
                onClick={onToggleSidebar}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-stone-500 shadow-sm ring-1 ring-stone-200 transition-colors hover:bg-stone-50 hover:text-stone-900 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                title="Expand chapters"
                aria-label="Expand chapter navigation"
              >
                <PanelLeftOpen className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onToggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-stone-500 shadow-sm ring-1 ring-stone-200 transition-colors hover:bg-stone-50 hover:text-stone-900 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-100"
              title={themeActionLabel}
              aria-label={themeActionLabel}
            >
              <ThemeIcon className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between gap-2">
              {onBackToCatalog ? (
                <button
                  type="button"
                  onClick={onBackToCatalog}
                  className="inline-flex items-center rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 transition-colors hover:border-stone-300 hover:text-stone-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-700 dark:hover:text-gray-100"
                >
                  All courses
                </button>
              ) : (
                <span />
              )}
              <div className="flex items-center gap-2">
                {isDesktop && (
                  <button
                    type="button"
                    onClick={onToggleSidebar}
                    className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 transition-colors hover:border-stone-300 hover:text-stone-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-700 dark:hover:text-gray-100"
                    aria-label="Collapse chapter navigation"
                  >
                    <PanelLeftClose className="h-3.5 w-3.5" />
                    Collapse
                  </button>
                )}
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 transition-colors hover:border-stone-300 hover:text-stone-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-700 dark:hover:text-gray-100"
                  aria-label={themeActionLabel}
                >
                  <ThemeIcon className="h-3.5 w-3.5" />
                  {themeActionLabel}
                </button>
                {!isDesktop && (
                  <button
                    type="button"
                    onClick={onToggleSidebar}
                    className="inline-flex items-center rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 transition-colors hover:border-stone-300 hover:text-stone-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-700 dark:hover:text-gray-100"
                    title="Close navigation"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500 dark:text-gray-500">
              Learn AI
            </p>
            <h1 className="mt-2 text-lg font-semibold text-stone-900 dark:text-white">
              {courseTitle}
            </h1>
          </>
        )}

        {!collapsed && (
          <div className="mt-4 rounded-[1.5rem] border border-stone-200 bg-white p-3.5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-gray-500">
              <span>Course progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="mt-2.5 h-1.5 rounded-full bg-stone-200 dark:bg-gray-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-gray-500">
              <span>Track</span>
              <button
                type="button"
                onClick={onToggleGuidedMode}
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium normal-case tracking-normal transition-colors ${
                  guidedMode
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-200"
                    : "bg-stone-100 text-stone-600 dark:bg-gray-800 dark:text-gray-300"
                }`}
              >
                {guidedMode ? "Guided on" : "Open mode"}
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["conceptual", "builder"] as AudienceTrack[]).map((option) => (
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
          </div>
        )}
      </div>

      <nav
        className={`flex-1 overflow-y-auto ${
          collapsed ? "px-2 py-4" : "px-3 py-4"
        }`}
      >
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
                  ? "rounded-[1.35rem] border border-cyan-200 bg-cyan-50 text-cyan-800 shadow-sm dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-200"
                  : "rounded-[1.35rem] border border-transparent text-stone-600 hover:border-stone-200 hover:bg-white hover:text-stone-900 dark:text-gray-400 dark:hover:border-gray-800 dark:hover:bg-gray-900 dark:hover:text-gray-100"
            } ${collapsed ? "px-1 py-2.5" : "px-3 py-2.5 text-left"}`}
          >
            {collapsed ? (
              <div className="relative flex items-center justify-center">
                {i === current && (
                  <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-cyan-500" />
                )}
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-[1rem] text-sm font-bold shadow-sm ring-1 transition-colors ${
                    i === current
                      ? "bg-cyan-600 text-white ring-cyan-200 dark:bg-cyan-500 dark:text-white dark:ring-cyan-400/30"
                      : completedChapters[ch.chapter]
                        ? "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30"
                        : "bg-white text-stone-600 ring-stone-200 dark:bg-gray-900 dark:text-gray-300 dark:ring-gray-800"
                  }`}
                >
                  {completedChapters[ch.chapter] && i !== current ? (
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    String(ch.chapter).padStart(2, "0")
                  )}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold shadow-sm ${
                    completedChapters[ch.chapter] && i !== current
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                      : "bg-white text-stone-500 dark:bg-gray-900 dark:text-gray-400"
                  }`}
                >
                  {completedChapters[ch.chapter] && i !== current ? (
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    String(ch.chapter).padStart(2, "0")
                  )}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{ch.title}</p>
                </div>
              </div>
            )}
          </button>
        ))}
      </nav>

      {collapsed ? (
        <div className="border-t border-stone-200 px-2 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400 dark:border-gray-800 dark:text-gray-500">
          {String(current + 1).padStart(2, "0")}/
          {String(chapters.length).padStart(2, "0")}
        </div>
      ) : (
        <div className="border-t border-stone-200 px-5 py-4 text-[11px] text-stone-500 dark:border-gray-800 dark:text-gray-500">
          Arrow keys navigate.{" "}
          <kbd className="rounded bg-stone-100 px-1 py-0.5 font-mono dark:bg-gray-800">
            f
          </kbd>{" "}
          toggles fullscreen.
        </div>
      )}
    </aside>
  );
}
