import { mdxComponents } from "./mdx/MDXComponents";
import type { Chapter } from "../chapters";

export function SlideView({ chapter }: { chapter: Chapter }) {
  const { Component } = chapter;
  return (
    <div className="chapter-content mx-auto max-w-5xl px-4 py-6 pb-28 md:px-8 md:py-8">
      <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-gray-500">
        <span>Chapter {chapter.chapter}</span>
        {chapter.subtitle && <span className="truncate">{chapter.subtitle}</span>}
      </div>
      <Component components={mdxComponents} />
    </div>
  );
}
