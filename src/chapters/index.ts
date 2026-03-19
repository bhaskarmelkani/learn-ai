import type { ComponentType } from "react";
import type { MDXProps } from "mdx/types";

interface ChapterModule {
  default: ComponentType<MDXProps>;
  frontmatter: {
    title: string;
    chapter: number;
    subtitle?: string;
  };
}

export interface Chapter {
  Component: ComponentType<MDXProps>;
  title: string;
  chapter: number;
  subtitle?: string;
}

const modules = import.meta.glob<ChapterModule>("./*.mdx", { eager: true });

export const chapters: Chapter[] = Object.values(modules)
  .map((mod) => ({
    Component: mod.default,
    title: mod.frontmatter.title,
    chapter: mod.frontmatter.chapter,
    subtitle: mod.frontmatter.subtitle,
  }))
  .sort((a, b) => a.chapter - b.chapter);
