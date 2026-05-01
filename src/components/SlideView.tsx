import type { ComponentType } from "react";
import type { MDXProps } from "mdx/types";
import { mdxComponents } from "./mdx/MDXComponents";

interface SlideChapter {
  Component: ComponentType<MDXProps>;
  chapter: number;
  subtitle?: string;
}

export function SlideView({ chapter }: { chapter: SlideChapter }) {
  const { Component } = chapter;
  return (
    <div className="chapter-content min-w-0 pb-32 pt-5 md:pb-36 md:pt-6">
      <article className="premium-panel overflow-hidden rounded-[1.35rem] antialiased [text-rendering:optimizeLegibility]">
        <div className="editorial-panel border-x-0 border-t-0 px-4 py-5 md:px-8 md:py-7">
          <div className="max-w-5xl">
            <div className="flex flex-wrap items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300 md:gap-3 md:text-[0.64rem] md:tracking-[0.2em]">
              <span>Chapter {chapter.chapter}</span>
              <span className="h-px w-10 bg-cyan-300/80 dark:bg-cyan-500/40" />
              <span className="max-w-[26ch] truncate text-[0.56rem] text-stone-500 dark:text-gray-400 sm:max-w-none md:text-[0.66rem]">
                {chapter.subtitle ??
                  "Narrative lesson with checkpoints and interactive demos."}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white px-4 py-7 text-stone-900 dark:bg-gray-900 dark:text-gray-100 md:px-8 md:py-9">
          <Component components={mdxComponents} />
        </div>
      </article>
    </div>
  );
}
