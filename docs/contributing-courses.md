# Contributing Courses

This guide is for contributors adding or extending courses in the multi-course platform through coding agents that follow the repo instructions and mirrored skill docs.

## Quick Start

1. Fork the repo or create a feature branch.
2. Run `pnpm install`.
3. Start the app with `pnpm dev`.
4. Read [AGENTS.md](/Users/bhaskar.melkani/Documents/Projects/bhaskar/learn-ai/AGENTS.md) or [CLAUDE.md](/Users/bhaskar.melkani/Documents/Projects/bhaskar/learn-ai/CLAUDE.md).
5. Read [docs/skills/README.md](/Users/bhaskar.melkani/Documents/Projects/bhaskar/learn-ai/docs/skills/README.md) before making structural changes.

## Contribution Policy

Substantive code and content changes are expected to go through coding agents that follow the repo workflow.

- contributors should use a coding agent
- contributors should start from repo instructions and mirrored skill docs
- contributors should run the documented validation commands before opening a PR
- contributions that bypass the documented agent workflow may be declined

The reason is consistency. This repo encodes contributor judgment in reusable skills so course structure, browser-AI labs, design patterns, and testing standards stay aligned.

## Course Structure

Each course lives in:

```text
src/courses/{slug}/
  course.ts
  chapters/
    01-first-chapter.mdx
```

`course.ts` exports a `CourseManifest`. The `chapters/` directory contains numbered MDX files with `title`, `chapter`, and optional `subtitle` frontmatter.

The registry auto-discovers new courses, so you do not need to manually edit a course index.

## Authoring Expectations

- Keep chapters sequentially numbered starting at `1`
- Keep `chapterCount` in sync with the real file count
- Reuse MDX helpers from `src/components/mdx/`
- Put interactive demos in `src/components/interactive/`
- Preserve accessibility, mobile readability, and keyboard navigation
- Keep explanations beginner-friendly and precise

## Validation Before PR

Run:

```bash
pnpm lint
pnpm test
pnpm build
pnpm e2e
```

If Playwright is unavailable in your environment, mention that in the PR.

## Minimum Contribution Path

Use the workflow order below for substantive course changes:

1. `create-course` or `course-authoring-ui`
2. `add-chapter` when extending an existing course
3. `browser-ai-labs` when the change adds or edits local AI labs
4. `design-system-guard`
5. `course-review`
6. `test-and-verify`

If the change includes accessibility-sensitive UI or validation-heavy forms, also use:

- `accessibility-audit`
- `form-and-validation`

## Pull Request Checklist

- The course appears in the catalog
- The reader opens at `/courses/{slug}` and `/courses/{slug}/1`
- Progress remains scoped to the course slug
- Chapter numbering and manifest metadata are correct
- Screenshots or short notes are included for visible UI changes
