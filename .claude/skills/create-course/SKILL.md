---
name: create-course
description: Scaffold a new course with manifest, chapter folder, starter chapter, and registry-compatible structure.
---

# create-course

Use this skill to scaffold a brand-new course inside the multi-course platform.

## Steps

1. Choose a slug (lowercase, hyphenated, e.g. `ml-advanced`).
2. Create `src/courses/{slug}/course.ts` exporting a `CourseManifest`:
   ```ts
   import type { CourseManifest } from "../types";

   export const course: CourseManifest = {
     slug: "{slug}",
     title: "Course Title",
     subtitle: "One-line course description.",
     profession: "general",          // or "engineering" | "product" | "business"
     supportedTracks: ["conceptual", "builder"],
     authors: ["Author Name"],
     chapterCount: 1,
     estimatedMinutes: 30,
     tags: ["tag1", "tag2"],
     heroColor: "cyan",
     featured: false,
   };
   ```
3. Create `src/courses/{slug}/chapters/01-first-chapter.mdx` with frontmatter:
   ```yaml
   ---
   title: "Chapter Title"
   chapter: 1
   subtitle: "Chapter subtitle"
   ---
   ```
4. The registry at `src/courses/registry.ts` auto-discovers new courses via `import.meta.glob` — no manual registration needed.
5. Run `pnpm build` to verify the course appears in the catalog.

## Checklist

- [ ] Manifest has all required fields
- [ ] At least one chapter MDX exists with valid frontmatter
- [ ] `chapterCount` matches the actual number of chapter files
- [ ] Build passes
- [ ] Course appears in the catalog at `/`
