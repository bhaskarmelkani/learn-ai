# Agent-Ready Playbook

This repository is intentionally structured so coding agents can extend the platform without guessing where courses, routes, state, and contributor expectations live.

## Core Commands

- `pnpm install`
- `pnpm dev`
- `pnpm lint`
- `pnpm test`
- `pnpm build`
- `pnpm e2e`

## Source Of Truth Files

- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
- `docs/contributing-courses.md`
- `docs/skills/`
- `components.json`

## Canonical Patterns

Inspect these before inventing a new pattern:

- Page composition: `src/features/agent-ready/canonical-course-page.tsx`
- Onboarding form: `src/features/agent-ready/canonical-onboarding-form.tsx`
- Review dialog: `src/features/agent-ready/canonical-review-dialog.tsx`
- Progress table: `src/features/agent-ready/canonical-progress-table.tsx`
- Shared UI primitives: `src/components/ui/`
- Teaching components: `src/components/mdx/`

## Multi-Course Architecture

- Courses live in `src/courses/{slug}/`
- Each course has a `course.ts` manifest and `chapters/*.mdx`
- `src/courses/registry.ts` auto-discovers courses and chapters
- Routes:
  - `/`
  - `/courses/:courseSlug`
  - `/courses/:courseSlug/:chapterNumber`
- Learning state is stored in `learn-ai-learning-state-v3`
- Progress is course-scoped under `courseProgress[slug]`

## Rules For Agents

- Use `pnpm`, never `npm`.
- Prefer incremental edits over rewrites.
- Prefer existing components before creating new ones.
- Keep new course content in `src/courses/`, not `src/chapters/`.
- Use `react-hook-form` and `zod` for new forms.
- Preserve keyboard navigation, onboarding, progress persistence, and legacy hash redirects unless the task says otherwise.
- Run lint, tests, and build before finishing, plus Playwright for navigation or UI flow changes.
- Treat `.agents/skills/` as the internal source of truth and `docs/skills/` as the public mirror for contributor workflows.
- Do not add a contribution-critical internal skill without adding or updating its public mirror in `docs/skills/`.

## Contributor Workflows

- Add a course: use the `create-course` workflow in `docs/skills/create-course.md`
- Add a chapter: use `docs/skills/add-chapter.md`
- Add or revise browser AI labs: use `docs/skills/browser-ai-labs.md`
- Guard UI consistency: use `docs/skills/design-system-guard.md`
- Review a course before merge: use `docs/skills/course-review.md`
- Author learning UI: use `docs/skills/course-authoring-ui.md`
- Run final checks: use `docs/skills/test-and-verify.md`

## Open Source Readiness Notes

- Keep docs updated when the course model, routes, or contributor workflow changes.
- If you add deep-link routes, document any hosting rewrite requirements.
- Treat `src/features/agent-ready/` as canonical copy-targets for future agent automation.
- Public contributions are expected to go through coding agents that follow the repo instructions and mirrored skills.
