import { mdxComponents } from "./mdx/MDXComponents";
import type { Chapter } from "../chapters";

export function SlideView({ chapter }: { chapter: Chapter }) {
  const { Component } = chapter;
  return (
    <div className="chapter-content max-w-4xl mx-auto px-8 py-12 pb-24">
      {chapter.subtitle && (
        <p className="text-gray-500 text-sm uppercase tracking-widest mb-4">
          Chapter {chapter.chapter}
        </p>
      )}
      <Component components={mdxComponents} />
    </div>
  );
}
