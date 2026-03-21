# AGENTS.md

This repository is a Vite + React + TypeScript learning product focused on teaching AI concepts through narrative chapters and interactive demos.

## Core Workflow

- Use `pnpm` for all package management and scripts.
- Before making structural changes, inspect existing patterns in `src/components`, `src/components/interactive`, `src/components/mdx`, and `src/learning`.
- Prefer incremental edits over rewrites.
- Run the relevant validation commands before finishing:
  - `pnpm lint`
  - `pnpm test`
  - `pnpm build`
  - `pnpm e2e` for UI or navigation changes when Playwright is available

## UI System

- Prefer existing components before creating new ones.
- Use `shadcn` where it fits; do not introduce another UI component library if the existing system can cover the need.
- Before inventing a new page or workflow pattern, inspect:
  - `src/features/agent-ready/canonical-course-page.tsx`
  - `src/features/agent-ready/canonical-onboarding-form.tsx`
  - `src/features/agent-ready/canonical-review-dialog.tsx`
  - `src/features/agent-ready/canonical-progress-table.tsx`
- Keep typography aligned to the current product voice:
  - UI chrome uses IBM Plex Sans.
  - Long-form educational content uses Source Serif 4.
- Preserve the current visual language unless the task explicitly asks for a redesign.
- Use accessible markup, clear focus states, semantic headings, and keyboard-friendly interactions.

## Architecture

- Keep reusable UI in `src/components/`.
- Keep shadcn primitives in `src/components/ui/`.
- Keep interactive teaching demos in `src/components/interactive/`.
- Keep MDX presentation helpers in `src/components/mdx/`.
- Keep cross-cutting state and learning flow logic in `src/learning/`.
- Keep canonical agent copy-targets in `src/features/agent-ready/`.
- Put generic helpers in `src/lib/` if new shared utilities are needed.
- Add tests under `tests/` and browser smoke coverage under `e2e/`.

## Forms And Validation

- Use `react-hook-form` with `zod` for any new forms or validation-heavy flows.
- Keep schemas close to the feature they validate unless they are shared across features.

## Guardrails

- Do not change auth, billing, analytics, deployment, or external service wiring unless explicitly asked.
- Do not replace Tailwind, Vite, React, or the current content architecture.
- Do not remove educational content or chapter sequencing unless the task is specifically about curriculum changes.

## Definition Of Done

- The change matches existing repo patterns or introduces a clearly better pattern consistently.
- Types remain strict and readable.
- Lint, tests, and build are green, or any blocker is called out explicitly.
- UI changes include a short note about visual impact in the final handoff.
