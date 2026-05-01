# Add Chapter

Use this workflow to add the next chapter to an existing course.

## Steps

1. Open `src/courses/{slug}/course.ts`.
2. Determine the next chapter number from `chapterCount`.
3. Create a new MDX file in `src/courses/{slug}/chapters/` using a zero-padded prefix such as `07-hidden-representations.mdx`.
4. Add frontmatter with:
   - `title`
   - `chapter`
   - optional `subtitle`
5. Update `chapterCount` in the manifest.
6. Run `pnpm build`.

## Quality Bar

- Numbering stays sequential with no gaps
- The chapter matches the tone and structure of the existing course
- The chapter includes at least one recap, exercise, or checkpoint-style teaching surface
- Any new interactive demo lives in `src/components/interactive/`
