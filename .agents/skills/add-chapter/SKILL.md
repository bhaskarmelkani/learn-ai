---
name: add-chapter
description: Add the next numbered MDX chapter to an existing course and update the manifest chapter count.
---

# add-chapter

Use this skill to add a new chapter to an existing course.

## Steps

1. Identify the course slug and current chapter count from `src/courses/{slug}/course.ts`.
2. Determine the next chapter number (current `chapterCount` + 1).
3. Create `src/courses/{slug}/chapters/{NN}-{chapter-slug}.mdx` with frontmatter:
   ```yaml
   ---
   title: "Chapter Title"
   chapter: {NN}
   subtitle: "Brief subtitle"
   ---
   ```
4. Update `chapterCount` in the course manifest to reflect the new total.
5. Follow the chapter structure from the `course-authoring-ui` skill.
6. Run `pnpm build` to verify.

## Naming Convention

Chapter files are zero-padded two-digit prefixed: `01-`, `02-`, ..., `13-`.

## Checklist

- [ ] Frontmatter `chapter` number is sequential
- [ ] `chapterCount` in manifest matches actual file count
- [ ] Chapter follows theory → example → interactive → checkpoint → recap structure
- [ ] Build passes
