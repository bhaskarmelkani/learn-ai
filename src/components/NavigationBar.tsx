export function NavigationBar({
  current,
  total,
  onPrev,
  onNext,
  previousTitle,
  nextTitle,
  isDesktop,
  sidebarVisible,
  sidebarCollapsed,
}: {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  previousTitle?: string;
  nextTitle?: string;
  isDesktop: boolean;
  sidebarVisible: boolean;
  sidebarCollapsed: boolean;
}) {
  return (
    <div
      className={`pointer-events-none fixed bottom-4 right-0 z-20 px-4 md:px-8 ${
        isDesktop && sidebarVisible
          ? sidebarCollapsed
            ? "left-[4.5rem]"
            : "left-72"
          : "left-0"
      }`}
    >
      <div className="pointer-events-auto mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-[1.5rem] border border-stone-200/80 bg-white/92 px-4 py-2.5 shadow-[0_20px_45px_-25px_rgba(15,23,42,0.35)] backdrop-blur dark:border-gray-800/80 dark:bg-gray-950/92 sm:rounded-[1.75rem] sm:py-3 md:px-6">
        <button
          onClick={onPrev}
          disabled={current === 0}
          className="min-w-0 text-left text-xs text-stone-600 transition-colors hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-300 dark:hover:text-gray-50 sm:text-sm"
        >
          <span className="block font-semibold">← Previous</span>
          {previousTitle && (
            <span className="hidden truncate text-xs text-stone-400 dark:text-gray-500 sm:block">
              {previousTitle}
            </span>
          )}
        </button>
        <div className="hidden text-center sm:block">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-gray-500">
            Reading progress
          </p>
          <p className="mt-1 text-sm font-semibold text-stone-800 dark:text-gray-100">
            Chapter {current + 1} of {total}
          </p>
        </div>
        <button
          onClick={onNext}
          disabled={current === total - 1}
          className="min-w-0 text-right text-xs text-stone-600 transition-colors hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-300 dark:hover:text-gray-50 sm:text-sm"
        >
          <span className="block font-semibold">Next →</span>
          {nextTitle && (
            <span className="hidden truncate text-xs text-stone-400 dark:text-gray-500 sm:block">
              {nextTitle}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
