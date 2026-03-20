import { type ReactNode } from "react";

export function Exercise({
  title = "Try This",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
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
    </div>
  );
}
