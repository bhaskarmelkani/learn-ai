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
      className={`fixed bottom-0 right-0 z-10 flex h-16 items-center justify-between border-t border-stone-200 bg-stone-100/92 px-4 backdrop-blur dark:border-gray-800 dark:bg-gray-950/92 md:px-8 ${
        isDesktop && sidebarVisible ? (sidebarCollapsed ? "left-20" : "left-80") : "left-0"
      }`}
    >
      <button
        onClick={onPrev}
        disabled={current === 0}
        className="min-w-0 text-left text-sm text-stone-500 transition-colors hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-400 dark:hover:text-gray-100"
      >
        <span className="block font-medium">← Previous</span>
        {previousTitle && <span className="block truncate text-xs text-stone-400 dark:text-gray-500">{previousTitle}</span>}
      </button>
      <span className="text-sm text-stone-500 dark:text-gray-500">
        Chapter {current + 1} of {total}
      </span>
      <button
        onClick={onNext}
        disabled={current === total - 1}
        className="min-w-0 text-right text-sm text-stone-500 transition-colors hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-400 dark:hover:text-gray-100"
      >
        <span className="block font-medium">Next →</span>
        {nextTitle && <span className="block truncate text-xs text-stone-400 dark:text-gray-500">{nextTitle}</span>}
      </button>
    </div>
  );
}
