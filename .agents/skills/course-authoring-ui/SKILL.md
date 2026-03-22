---
name: course-authoring-ui
description: Create lesson and chapter UI for the AI learning product with theory, examples, try-it sections, checkpoints, and next-step flows.
---

# course-authoring-ui

Use this skill when creating or revising lesson, chapter, or curriculum-facing UI.

## Course Structure

Courses live in `src/courses/{slug}/` with this layout:

```
src/courses/{slug}/
  course.ts          # CourseManifest export
  chapters/
    01-chapter-name.mdx
    02-chapter-name.mdx
    ...
```

The course registry at `src/courses/registry.ts` auto-discovers courses via `import.meta.glob`.

## Preferred Chapter Structure

- theory section
- examples or worked intuition
- try-it or interactive area
- quiz or checkpoint
- recap or next-step CTA

## Workflow

1. Inspect existing MDX chapters in `src/courses/ai-fundamentals/chapters/` before authoring a new learning flow.
2. Reuse components from `src/components/mdx/` such as callouts, checkpoints, recaps, and bridges.
3. Keep educational language concise and supportive.
4. Put interactive teaching widgets in `src/components/interactive/`.
5. Reuse the shared browser-AI labs and `src/lib/browser-ai/` runtime before inventing a one-off Gen AI interactive.
6. If a new browser-AI lab is necessary, follow [$browser-ai-labs](/Users/bhaskar.melkani/Documents/Projects/bhaskar/learn-ai/.agents/skills/browser-ai-labs/SKILL.md).
7. Preserve chapter progress, navigation, and sidebar behaviors.
8. If a lesson adds forms or answer validation, use `react-hook-form` with `zod`.
9. Chapter frontmatter requires `title`, `chapter` (number), and optional `subtitle`.
10. The `courseSlug` is injected by the registry loader — do not add it to frontmatter.

## Quality Bar

- pedagogy is stepwise and clear
- the UI does not overwhelm the lesson content
- interactive pieces reinforce the theory section
- accessibility and mobile readability are preserved
