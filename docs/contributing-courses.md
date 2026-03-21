# Contributing Courses

This guide is for contributors adding or extending courses in the multi-course platform.

## Quick Start

1. Fork the repo or create a feature branch.
2. Run `pnpm install`.
3. Start the app with `pnpm dev`.
4. Read [AGENTS.md](/Users/bhaskar.melkani/Documents/Projects/bhaskar/learn-ai/AGENTS.md) and [docs/skills/README.md](/Users/bhaskar.melkani/Documents/Projects/bhaskar/learn-ai/docs/skills/README.md) before making structural changes.

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

## Suggested Workflow By Tool

### Claude Code

- Start from `CLAUDE.md`
- Use the mirrored skills under `.claude/skills/`
- Follow the docs in `docs/skills/` if you want agent-agnostic instructions

### Codex

- Start from `AGENTS.md`
- Prefer existing patterns in `src/components`, `src/components/mdx`, `src/components/interactive`, and `src/learning`
- Use the same `docs/skills/` workflows for course scaffolding and review

### Copilot Or Manual Contributions

- Follow the docs in `docs/skills/`
- Treat `src/courses/ai-fundamentals/` as the main example course
- Keep changes incremental and easy to review

## Pull Request Checklist

- The course appears in the catalog
- The reader opens at `/courses/{slug}` and `/courses/{slug}/1`
- Progress remains scoped to the course slug
- Chapter numbering and manifest metadata are correct
- Screenshots or short notes are included for visible UI changes
