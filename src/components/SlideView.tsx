import { mdxComponents } from "./mdx/MDXComponents";
import {
  COURSE_LEVEL_LABELS,
  PROFESSION_LABELS,
  type Chapter,
  type CourseLevel,
  type Profession,
} from "../content";

export function SlideView({
  chapter,
  trackTitle,
  level,
  profession,
}: {
  chapter: Chapter;
  trackTitle: string;
  level: CourseLevel;
  profession: Profession;
}) {
  const { Component } = chapter;
  return (
    <div className="chapter-content mx-auto max-w-5xl px-4 py-8 pb-28 md:px-8 md:py-10">
      <div className="mb-10 rounded-[2rem] border border-stone-200 bg-white px-6 py-8 shadow-sm dark:border-gray-800 dark:bg-gray-900/70 md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500 dark:text-gray-500">
          {trackTitle} • {PROFESSION_LABELS[profession]} • {COURSE_LEVEL_LABELS[level]}
        </p>
        <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
          Chapter {chapter.chapter}
          {chapter.estimatedMinutes ? ` • ${chapter.estimatedMinutes} min` : ""}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 dark:text-gray-50 md:text-4xl">
          {chapter.title}
        </h1>
        {chapter.subtitle && (
          <p className="mt-3 max-w-3xl text-base leading-7 text-stone-600 dark:text-gray-400 md:text-lg">
            {chapter.subtitle}
          </p>
        )}
      </div>
      <Component components={mdxComponents} />
    </div>
  );
}
