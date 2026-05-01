import { ArrowLeft, ArrowRight } from "lucide-react";

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
      className={`pointer-events-none fixed bottom-3 right-0 z-20 px-3 md:bottom-4 md:px-8 ${
        isDesktop && sidebarVisible
          ? sidebarCollapsed
            ? "left-[4.5rem]"
            : "left-72"
          : "left-0"
      }`}
    >
      <div className="premium-panel pointer-events-auto mx-auto flex max-w-5xl items-center justify-between gap-2 rounded-2xl px-3 py-2 sm:gap-3 sm:py-3 md:px-6">
        <button
          onClick={onPrev}
          disabled={current === 0}
          aria-label={`Previous${previousTitle ? `: ${previousTitle}` : ""}`}
          className="soft-button min-h-9 min-w-0 justify-start border-transparent bg-transparent px-2 text-left text-sm shadow-none hover:bg-stone-50 dark:bg-transparent dark:hover:bg-gray-900 sm:min-h-10 sm:px-3"
        >
          <span className="flex items-center gap-1.5 font-semibold">
            <ArrowLeft className="h-4 w-4" />
            Previous
          </span>
          {previousTitle && (
            <span className="hidden truncate text-xs text-stone-400 dark:text-gray-500 sm:block">
              {previousTitle}
            </span>
          )}
        </button>
        <div className="hidden text-center sm:block">
          <p className="overline">Reading progress</p>
          <p className="mt-1 text-sm font-semibold text-stone-800 dark:text-gray-100">
            Chapter {current + 1} of {total}
          </p>
        </div>
        <button
          onClick={onNext}
          disabled={current === total - 1}
          aria-label={`Next →${nextTitle ? ` ${nextTitle}` : ""}`}
          className="soft-button min-h-9 min-w-0 justify-end border-transparent bg-transparent px-2 text-right text-sm shadow-none hover:bg-stone-50 dark:bg-transparent dark:hover:bg-gray-900 sm:min-h-10 sm:px-3"
        >
          <span className="flex items-center justify-end gap-1.5 font-semibold">
            Next
            <ArrowRight className="h-4 w-4" />
          </span>
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
