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
    <div className="chapter-content mx-auto max-w-[74rem] px-4 pb-32 pt-7 md:px-8 md:pb-36 md:pt-10">
      <article className="overflow-hidden rounded-[2.2rem] border border-stone-200/85 bg-white antialiased shadow-[0_28px_70px_-46px_rgba(15,23,42,0.2)] [text-rendering:optimizeLegibility] dark:border-gray-800/80 dark:bg-gray-900">
        <div className="border-b border-stone-200/70 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.12),_transparent_30%),linear-gradient(135deg,#f8fafc,#ffffff)] px-4 py-5 dark:border-gray-800/70 dark:bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.14),_transparent_28%),linear-gradient(135deg,rgba(17,24,39,0.98),rgba(17,24,39,0.94))] md:px-8 md:py-8">
          <div className="max-w-5xl">
            <div className="flex flex-wrap items-center gap-3 text-[8px] font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300 md:text-[0.64rem]">
              <span>Chapter {chapter.chapter}</span>
              <span className="h-px w-10 bg-cyan-300/80 dark:bg-cyan-500/40" />
              <span className="text-[0.62rem] text-stone-500 dark:text-gray-400 md:text-[0.66rem]">
                {chapter.subtitle ??
                  "Narrative lesson with checkpoints and interactive demos."}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white px-4 py-8 dark:bg-gray-900 md:px-8 md:py-10">
          <Component components={mdxComponents} />
        </div>
      </article>
    </div>
  );
}
