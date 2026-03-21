# Course Review

Use this workflow before merging a course contribution.

## Checklist

- Manifest completeness: all required `CourseManifest` fields exist
- Chapter numbering: starts at `1` and stays sequential
- Chapter count: manifest matches the actual MDX file count
- Frontmatter: every chapter includes `title` and `chapter`
- Pedagogy: each chapter includes at least one recap, checkpoint, or exercise
- Interactives: referenced demos exist and still render
- Validation: `pnpm lint`, `pnpm test`, and `pnpm build` pass

## Review Focus

- Explanations are concise and beginner-accessible
- Interactive elements reinforce the theory rather than replace it
- Dark mode, mobile readability, and keyboard navigation are preserved
- Progress and completion behavior remain course-aware
