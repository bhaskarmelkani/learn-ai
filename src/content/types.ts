import type { ComponentType } from "react";
import type { MDXProps } from "mdx/types";

export const COURSE_LEVELS = ["conceptual", "builder"] as const;
export type CourseLevel = (typeof COURSE_LEVELS)[number];

export const COURSE_LEVEL_LABELS: Record<CourseLevel, string> = {
  conceptual: "Conceptual",
  builder: "Builder",
};

export const PROFESSIONS = ["foundations", "engineering", "product", "business"] as const;
export type Profession = (typeof PROFESSIONS)[number];

export const PROFESSION_LABELS: Record<Profession, string> = {
  foundations: "Foundations",
  engineering: "Engineering",
  product: "Product",
  business: "Business",
};

export interface ChapterFrontmatter {
  title: string;
  chapter: number;
  subtitle?: string;
  summary?: string;
  estimatedMinutes?: number;
}

export interface ChapterModule {
  default: ComponentType<MDXProps>;
  frontmatter: ChapterFrontmatter;
}

export interface Chapter {
  id: string;
  slug: string;
  Component: ComponentType<MDXProps>;
  title: string;
  chapter: number;
  subtitle?: string;
  summary?: string;
  estimatedMinutes?: number;
}

export interface PlannedModule {
  title: string;
  summary: string;
}

export interface LevelBlueprint {
  label: string;
  audience: string;
  description: string;
  outcomes: string[];
  plannedModules: PlannedModule[];
  contributionPrompt: string;
}

export interface LearningTrack {
  id: string;
  title: string;
  shortTitle: string;
  profession: Profession;
  tagline: string;
  description: string;
  levels: Record<CourseLevel, LevelBlueprint>;
}

export interface TrackLevelContent {
  track: LearningTrack;
  level: CourseLevel;
  chapters: Chapter[];
  hasPublishedContent: boolean;
}
