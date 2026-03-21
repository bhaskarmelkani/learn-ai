import type { ComponentType } from "react";
import type { MDXProps } from "mdx/types";
import type { AudienceTrack } from "../learning/LearningContext";

export type CourseProfession = "engineering" | "product" | "business" | "general";
export type CourseSlug = string;

export type CourseManifest = {
  slug: CourseSlug;
  title: string;
  subtitle: string;
  profession: CourseProfession;
  supportedTracks: AudienceTrack[];
  authors: string[];
  chapterCount: number;
  estimatedMinutes?: number;
  tags: string[];
  heroColor?: string;
  featured?: boolean;
};

export type CourseChapter = {
  Component: ComponentType<MDXProps>;
  title: string;
  chapter: number;
  subtitle?: string;
  courseSlug: CourseSlug;
};
