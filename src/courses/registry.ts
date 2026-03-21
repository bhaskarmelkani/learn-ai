import type { ComponentType } from "react";
import type { MDXProps } from "mdx/types";
import type { CourseManifest, CourseChapter, CourseSlug } from "./types";

/* ------------------------------------------------------------------ */
/*  Manifest discovery                                                 */
/* ------------------------------------------------------------------ */

interface CourseModule {
  course: CourseManifest;
}

const manifestModules = import.meta.glob<CourseModule>("./*/course.ts", {
  eager: true,
});

export const courses: CourseManifest[] = Object.values(manifestModules)
  .map((m) => m.course)
  .sort((a, b) => a.slug.localeCompare(b.slug));

export function getCourse(slug: CourseSlug): CourseManifest | undefined {
  return courses.find((c) => c.slug === slug);
}

/* ------------------------------------------------------------------ */
/*  Chapter loading (lazy, per-course)                                 */
/* ------------------------------------------------------------------ */

interface ChapterModule {
  default: ComponentType<MDXProps>;
  frontmatter: {
    title: string;
    chapter: number;
    subtitle?: string;
  };
}

const chapterModules = import.meta.glob<ChapterModule>(
  "./*/chapters/*.mdx",
);

/** Build a map from course slug to its lazy chapter loaders. */
function buildChapterMap() {
  const map = new Map<CourseSlug, Array<() => Promise<ChapterModule>>>();

  for (const [path, loader] of Object.entries(chapterModules)) {
    // path looks like "./ai-fundamentals/chapters/01-what-is-a-model.mdx"
    const slug = path.split("/")[1];
    if (!slug) continue;
    let loaders = map.get(slug);
    if (!loaders) {
      loaders = [];
      map.set(slug, loaders);
    }
    loaders.push(loader as () => Promise<ChapterModule>);
  }

  return map;
}

const chapterMap = buildChapterMap();

const chapterCache = new Map<CourseSlug, CourseChapter[]>();

export async function loadCourseChapters(
  slug: CourseSlug,
): Promise<CourseChapter[]> {
  const cached = chapterCache.get(slug);
  if (cached) return cached;

  const loaders = chapterMap.get(slug);
  if (!loaders || loaders.length === 0) return [];

  const loaded = await Promise.all(loaders.map((load) => load()));

  const chapters: CourseChapter[] = loaded
    .map((mod) => ({
      Component: mod.default,
      title: mod.frontmatter.title,
      chapter: mod.frontmatter.chapter,
      subtitle: mod.frontmatter.subtitle,
      courseSlug: slug,
    }))
    .sort((a, b) => a.chapter - b.chapter);

  chapterCache.set(slug, chapters);
  return chapters;
}

export function getFirstChapterNumber(slug: CourseSlug): number {
  const cached = chapterCache.get(slug);
  if (cached && cached.length > 0) return cached[0].chapter;
  return 1;
}
