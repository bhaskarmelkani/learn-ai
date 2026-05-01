---
name: course-review
description: Validate manifest completeness, sequential chapter numbering, required pedagogical components, and project checks.
---

# course-review

Use this skill to review a course for completeness and quality before merge.

## Validation Steps

1. **Manifest completeness**: Verify all required `CourseManifest` fields are present and valid in `src/courses/{slug}/course.ts`.
2. **Chapter numbering**: Confirm chapters are numbered sequentially starting from 1 with no gaps.
3. **Chapter count match**: Verify `chapterCount` in the manifest matches the actual number of MDX files.
4. **Frontmatter**: Every chapter MDX has `title` and `chapter` in frontmatter.
5. **Pedagogical components**: Each chapter should include at least one of: `<Checkpoint>`, `<Exercise>`, `<ChapterRecap>`.
6. **Interactive components**: Verify any referenced interactive components exist in `src/components/interactive/`.
7. **Project checks**: Run `pnpm lint`, `pnpm test`, `pnpm build`.

## Quality Checks

- Language is concise, supportive, and beginner-accessible
- Interactive demos reinforce theory rather than replacing it
- Chapter recaps cover core concepts
- Checkpoints test understanding, not trivia
- Mobile and dark-mode rendering are preserved
