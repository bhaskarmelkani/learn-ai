---
name: course-authoring-ui
description: Create lesson and chapter UI for the AI learning product with theory, examples, try-it sections, checkpoints, and next-step flows.
---

# course-authoring-ui

Use this skill when creating or revising lesson, chapter, or curriculum-facing UI.

## Preferred Structure

- theory section
- examples or worked intuition
- try-it or interactive area
- quiz or checkpoint
- recap or next-step CTA

## Workflow

1. Inspect existing MDX chapters in `src/chapters/` before authoring a new learning flow.
2. Reuse components from `src/components/mdx/` such as callouts, checkpoints, recaps, and bridges.
3. Keep educational language concise and supportive.
4. Put interactive teaching widgets in `src/components/interactive/`.
5. Preserve chapter progress, navigation, and sidebar behaviors.
6. If a lesson adds forms or answer validation, use `react-hook-form` with `zod`.

## Quality Bar

- pedagogy is stepwise and clear
- the UI does not overwhelm the lesson content
- interactive pieces reinforce the theory section
- accessibility and mobile readability are preserved
