import { learningTracks } from "./catalog";
import type { Chapter, ChapterModule, CourseLevel, TrackLevelContent } from "./types";

export { learningTracks } from "./catalog";
export {
  COURSE_LEVELS,
  COURSE_LEVEL_LABELS,
  PROFESSION_LABELS,
} from "./types";
export type {
  Chapter,
  CourseLevel,
  LearningTrack,
  PlannedModule,
  Profession,
  TrackLevelContent,
} from "./types";

const legacyModules = import.meta.glob<ChapterModule>("../chapters/*.mdx", { eager: true });
const trackModules = import.meta.glob<ChapterModule>("./tracks/**/*.mdx", { eager: true });

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function isCourseLevel(value: string): value is CourseLevel {
  return value === "conceptual" || value === "builder";
}

function createChapter(path: string, mod: ChapterModule): Chapter {
  return {
    id: `${path}:${mod.frontmatter.chapter}`,
    slug: slugify(mod.frontmatter.title),
    Component: mod.default,
    title: mod.frontmatter.title,
    chapter: mod.frontmatter.chapter,
    subtitle: mod.frontmatter.subtitle,
    summary: mod.frontmatter.summary,
    estimatedMinutes: mod.frontmatter.estimatedMinutes,
  };
}

function createKey(trackId: string, level: CourseLevel) {
  return `${trackId}:${level}`;
}

const chapterEntries = [
  ...Object.entries(legacyModules).map(([path, mod]) => ({
    trackId: "ai-foundations",
    level: "conceptual" as const,
    chapter: createChapter(path, mod),
  })),
  ...Object.entries(trackModules)
    .map(([path, mod]) => {
      const match = path.match(/^\.\/tracks\/([^/]+)\/([^/]+)\/.+\.mdx$/);
      if (!match) return null;

      const [, trackId, rawLevel] = match;
      if (!isCourseLevel(rawLevel)) return null;

      return {
        trackId,
        level: rawLevel,
        chapter: createChapter(path, mod),
      };
    })
    .filter((entry): entry is { trackId: string; level: CourseLevel; chapter: Chapter } => Boolean(entry)),
];

const chaptersByTrackLevel = new Map<string, Chapter[]>();

for (const entry of chapterEntries) {
  const key = createKey(entry.trackId, entry.level);
  const existing = chaptersByTrackLevel.get(key) ?? [];
  existing.push(entry.chapter);
  chaptersByTrackLevel.set(key, existing);
}

for (const chapters of chaptersByTrackLevel.values()) {
  chapters.sort((a, b) => a.chapter - b.chapter);
}

export function getDefaultTrackId() {
  return learningTracks[0]?.id ?? "ai-foundations";
}

export function getTrackById(trackId: string) {
  return learningTracks.find((track) => track.id === trackId);
}

export function getTrackLevelContent(trackId: string, level: CourseLevel): TrackLevelContent {
  const track = getTrackById(trackId) ?? getTrackById(getDefaultTrackId());
  if (!track) {
    throw new Error("No learning tracks are configured.");
  }

  const chapters = chaptersByTrackLevel.get(createKey(track.id, level)) ?? [];

  return {
    track,
    level,
    chapters,
    hasPublishedContent: chapters.length > 0,
  };
}
