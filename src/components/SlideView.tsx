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
    <div className="chapter-content mx-auto max-w-6xl px-4 pb-32 pt-6 md:px-8 md:pb-36 md:pt-10">
      <article className="overflow-hidden rounded-[2.25rem] border border-stone-200/80 bg-white/92 shadow-[0_28px_80px_-40px_rgba(15,23,42,0.28)] ring-1 ring-white/80 dark:border-gray-800/80 dark:bg-gray-900/88 dark:ring-white/5">
        <div className="border-b border-stone-200/70 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.12),_transparent_30%),linear-gradient(135deg,rgba(248,250,252,0.96),rgba(255,255,255,0.9))] px-6 py-6 dark:border-gray-800/70 dark:bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.14),_transparent_28%),linear-gradient(135deg,rgba(17,24,39,0.96),rgba(17,24,39,0.88))] md:px-12 md:py-10">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-300">
              <span>Chapter {chapter.chapter}</span>
              <span className="h-px w-10 bg-cyan-300/80 dark:bg-cyan-500/40" />
              <span className="text-stone-500 dark:text-gray-400">
                {chapter.subtitle ??
                  "Narrative lesson with checkpoints and interactive demos."}
              </span>
            </div>
          </div>
        </div>
        <div className="px-6 py-8 md:px-12 md:py-10">
          <Component components={mdxComponents} />
        </div>
      </article>
    </div>
  );
}
