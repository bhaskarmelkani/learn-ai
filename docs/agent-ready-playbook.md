# Agent-Ready Playbook

This repository is now set up so coding agents can work against stable context, deterministic checks, and canonical UI patterns.

## Commands

- `pnpm install`
- `pnpm dev`
- `pnpm lint`
- `pnpm test`
- `pnpm build`
- `pnpm e2e`

## Source Of Truth Files

- `AGENTS.md`
- `CLAUDE.md`
- `.mcp.json`
- `components.json`
- `.claude/settings.json`

## Canonical Patterns

Agents should prefer these files before inventing new patterns:

- Page composition: `src/features/agent-ready/canonical-course-page.tsx`
- Form pattern: `src/features/agent-ready/canonical-onboarding-form.tsx`
- Dialog pattern: `src/features/agent-ready/canonical-review-dialog.tsx`
- Data table pattern: `src/features/agent-ready/canonical-progress-table.tsx`
- Shared shadcn primitives: `src/components/ui/`

## Architecture

- `src/components/`: shared UI and MDX-facing components
- `src/components/ui/`: shadcn UI primitives
- `src/components/interactive/`: teaching demos and labs
- `src/components/mdx/`: educational content wrappers
- `src/features/`: feature-oriented examples and future product areas
- `src/lib/`: shared utilities
- `tests/`: unit and schema tests
- `e2e/`: Playwright smoke coverage
- `docs/`: repo conventions and agent guidance

## Rules For Agents

- Use `pnpm`, never `npm`.
- Prefer existing components before creating new ones.
- Use `react-hook-form` and `zod` for forms.
- Use shadcn-compatible composition for new UI.
- Keep educational surfaces concise, readable, and accessible.
- Run lint, tests, and build before finishing.

## Recommended Next Product Work

- build a learner onboarding flow from the canonical form
- build an admin review flow from the canonical dialog and table
- migrate future reusable UI to `src/components/ui/` or feature-level wrappers
