# CLAUDE.md

This is a multi-course AI learning platform built with Vite, React, React Router, Tailwind, MDX, and TypeScript.

## Multi-Course Architecture

- Courses live in `src/courses/{slug}/` — each has a `course.ts` manifest and a `chapters/` folder of MDX files.
- The registry at `src/courses/registry.ts` auto-discovers courses via `import.meta.glob`.
- Routes: `/` (catalog), `/courses/:slug` (resume), `/courses/:slug/:chapter` (reader).
- Learning state is v3 (`learn-ai-learning-state-v3`) with course-scoped progress under `courseProgress[slug]`.
- `track` and `guidedMode` are global; checkpoints and reviewed chapters are per-course.
- To add a course, use the `create-course` skill. To add a chapter, use `add-chapter`.

## How To Work Here

- Use `pnpm`, not `npm`.
- Prefer existing patterns in `src/components`, `src/components/interactive`, `src/components/mdx`, and `src/learning`.
- Prefer canonical examples in `src/features/agent-ready/` when creating a new page, form, dialog, or table.
- Favor small, reviewable edits over broad rewrites.
- If the repo already has a matching component or layout pattern, extend it instead of inventing a new one.

## UI Rules

- Use shadcn-compatible patterns for new UI work.
- Do not introduce another component library if the need can be met with the current stack.
- Preserve the established learning-product tone: calm, editorial, and interactive.
- Keep layouts responsive and keyboard accessible.
- When touching UI, describe the visual impact and run the available checks.

## Forms, State, And Validation

- Use `react-hook-form` + `zod` for forms.
- Keep state local by default and elevate only when multiple areas need it.
- Prefer explicit TypeScript types and discriminated unions over loose objects.

## Validation Commands

- `pnpm lint`
- `pnpm test`
- `pnpm build`
- `pnpm e2e` for navigation or interaction changes when browser tests apply

## Sensitive Areas

Do not modify these areas without explicit instruction:

- auth
- billing
- analytics
- deployment or hosting setup
- destructive content migrations

## Reusable Workflows

Project skills live in `.agents/skills/` and are mirrored in `.claude/skills/`.
Agent-agnostic mirrors live in `docs/skills/`.
Canonical UI copy-targets live in `src/features/agent-ready/`.

Preferred subagents:

- `ui-reviewer`
- `a11y-reviewer`
- `test-writer`
- `design-system-enforcer`
