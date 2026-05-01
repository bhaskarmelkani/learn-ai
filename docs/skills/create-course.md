# Create Course

Use this workflow to scaffold a new course in the multi-course platform.

## Steps

1. Choose a lowercase, hyphenated slug such as `ml-advanced`.
2. Create `src/courses/{slug}/course.ts` exporting a `CourseManifest`.
3. Create `src/courses/{slug}/chapters/01-first-chapter.mdx`.
4. Set `chapterCount` to match the real number of chapter files.
5. Run `pnpm build` and confirm the course appears in the catalog.

## Manifest Fields

- `slug`
- `title`
- `subtitle`
- `profession`
- `supportedTracks`
- `authors`
- `chapterCount`
- `tags`

Optional fields:

- `estimatedMinutes`
- `heroColor`
- `featured`

## Notes

- The course registry auto-discovers new courses.
- Do not add `courseSlug` to chapter frontmatter; the loader injects it.
- Reuse patterns from `src/courses/ai-fundamentals/`.
