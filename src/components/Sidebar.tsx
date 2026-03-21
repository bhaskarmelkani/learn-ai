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
  const isMobileDrawer = !isDesktop;
  const iconControlClass =
    "flex h-11 w-11 items-center justify-center rounded-[1.25rem] border border-stone-300/80 bg-white/95 text-stone-500 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.55)] transition-[border-color,background-color,color,box-shadow] hover:border-stone-400/90 hover:bg-stone-50 hover:text-stone-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-100";
  const pillControlClass =
    "inline-flex min-h-11 items-center gap-2 rounded-full border border-stone-300/85 bg-white/95 px-4 py-2 text-[0.9rem] font-medium text-stone-700 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.55)] transition-[border-color,background-color,color,box-shadow] hover:border-stone-400/90 hover:bg-stone-50 hover:text-stone-950 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-100";

  return (
    <aside
      className={`fixed z-30 flex flex-col bg-stone-50/98 backdrop-blur transition-[transform,width] duration-200 dark:bg-gray-950/98 ${
        isMobileDrawer
          ? "bottom-3 left-3 top-3 h-auto w-[min(22rem,calc(100vw-1.5rem))] rounded-[2rem] border border-stone-200/90 shadow-[0_36px_80px_-32px_rgba(15,23,42,0.42)] dark:border-gray-800"
          : "left-0 top-0 h-full border-r border-stone-200 shadow-xl dark:border-gray-800"
      } ${
        visible ? "translate-x-0" : "-translate-x-full"
      } ${isMobileDrawer ? "" : collapsed ? "w-[4.5rem]" : "w-72"}`}
    >
      <div
        className={`border-b border-stone-200 ${
          collapsed ? "px-2 py-4" : isMobileDrawer ? "px-4 py-4" : "px-5 py-4"
        } dark:border-gray-800`}
      >
        {collapsed ? (
          <div className="flex flex-col items-center gap-3">
            {onBackToCatalog && (
              <button
                type="button"
                onClick={onBackToCatalog}
                className={iconControlClass}
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
                className={iconControlClass}
                title="Expand chapters"
                aria-label="Expand chapter navigation"
              >
                <PanelLeftOpen className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onToggleTheme}
              className={iconControlClass}
              title={themeActionLabel}
              aria-label={themeActionLabel}
            >
              <ThemeIcon className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <div
              className={`mb-5 ${
                isMobileDrawer
                  ? "grid grid-cols-2 gap-2.5"
                  : "flex flex-wrap items-center gap-2.5"
              }`}
            >
              {onBackToCatalog ? (
                <button
                  type="button"
                  onClick={onBackToCatalog}
                  className={`${pillControlClass} ${
                    isMobileDrawer ? "col-span-2 justify-center" : ""
                  }`}
                >
                  All courses
                </button>
              ) : (
                <span />
              )}
              <div
                className={`${
                  isMobileDrawer
                    ? "contents"
                    : "flex flex-wrap items-center gap-2.5"
                }`}
              >
                {isDesktop && (
                  <button
                    type="button"
                    onClick={onToggleSidebar}
                    className={pillControlClass}
                    aria-label="Collapse chapter navigation"
                  >
                    <PanelLeftClose className="h-4 w-4" />
                    Collapse
                  </button>
                )}
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className={`${pillControlClass} ${
                    isMobileDrawer ? "justify-center px-3" : ""
                  }`}
                  aria-label={themeActionLabel}
                >
                  <ThemeIcon className="h-4 w-4" />
                  {themeActionLabel}
                </button>
                {!isDesktop && (
                  <button
                    type="button"
                    onClick={onToggleSidebar}
                    className={`${pillControlClass} justify-center px-3`}
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
            <h1 className="mt-2 text-[1.05rem] font-semibold text-stone-900 dark:text-white">
              {courseTitle}
            </h1>
          </>
        )}

        {!collapsed && (
          <div
            className={`mt-5 rounded-[1.6rem] border border-stone-200/90 bg-white shadow-[0_16px_35px_-28px_rgba(15,23,42,0.6)] dark:border-gray-800 dark:bg-gray-900 ${
              isMobileDrawer ? "p-3.5" : "p-4"
            }`}
          >
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
          collapsed ? "px-2.5 py-5" : isMobileDrawer ? "px-3 py-4" : "px-3.5 py-5"
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
                  ? "rounded-[1.5rem] border border-cyan-200/90 bg-cyan-50/90 text-cyan-800 shadow-[0_14px_28px_-24px_rgba(6,182,212,0.55)] dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-200"
                  : "rounded-[1.5rem] border border-transparent text-stone-600 hover:border-stone-200/90 hover:bg-white hover:text-stone-900 dark:text-gray-400 dark:hover:border-gray-800 dark:hover:bg-gray-900 dark:hover:text-gray-100"
            } ${
              collapsed
                ? "px-1.5 py-2.5"
                : isMobileDrawer
                  ? "px-3 py-2.5 text-left"
                  : "px-3.5 py-3 text-left"
            }`}
          >
            {collapsed ? (
              <div className="relative flex items-center justify-center">
                {i === current && (
                  <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-cyan-500" />
                )}
                <span
                  className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm ring-1 transition-colors ${
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
                  className={`inline-flex shrink-0 items-center justify-center rounded-full text-sm font-semibold shadow-sm ring-1 ${
                    isMobileDrawer ? "h-10 w-10" : "h-11 w-11"
                  } ${
                    i === current
                      ? "bg-cyan-600 text-white ring-cyan-200 dark:bg-cyan-500 dark:text-white dark:ring-cyan-400/30"
                      : completedChapters[ch.chapter]
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                      : "bg-white text-stone-500 ring-stone-200 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-800"
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
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate font-semibold leading-[1.35] ${
                      isMobileDrawer ? "text-[0.83rem]" : "text-[0.88rem]"
                    }`}
                  >
                    {ch.title}
                  </p>
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
      ) : isMobileDrawer ? null : (
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
