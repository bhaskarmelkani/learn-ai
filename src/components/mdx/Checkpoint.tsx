import { type ReactNode } from "react";

export function Checkpoint({
  prompt,
  children,
}: {
  prompt: string;
  children: ReactNode;
}) {
  return (
    <details className="my-6 rounded-2xl border border-amber-200 bg-amber-50/80 px-5 py-4 shadow-sm open:bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/10 dark:open:bg-amber-500/10">
      <summary className="cursor-pointer list-none text-base font-semibold text-amber-900 marker:hidden dark:text-amber-100">
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm shadow-sm dark:bg-gray-900">
            ?
          </span>
          {prompt}
        </span>
      </summary>
      <div className="mt-4 border-t border-amber-200 pt-4 text-base leading-7 text-stone-700 dark:border-amber-500/20 dark:text-gray-200 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
        {children}
      </div>
    </details>
  );
}
