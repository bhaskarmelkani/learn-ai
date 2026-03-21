---
name: form-and-validation
description: Build forms for onboarding, progress tracking, and admin workflows using react-hook-form, zod, accessible fields, and predictable validation states.
---

# form-and-validation

Use this skill for any new form, preferences flow, checkpoint input, or admin workflow.

## Rules

- Use `react-hook-form` for state and submission handling.
- Use `zod` for schema validation.
- Keep validation messages clear and specific.
- Prefer existing field and layout patterns before inventing new ones.
- Preserve keyboard access, labels, descriptions, and error messaging.

## Workflow

1. Identify whether the form belongs in `src/components/`, `src/components/mdx/`, or a new feature area.
2. Define a `zod` schema first.
3. Wire the schema through `react-hook-form` and `@hookform/resolvers/zod`.
4. Keep form state local unless multiple screens need it.
5. Add targeted tests for validation and submission behavior.

## Done When

- schema and UI stay in sync
- error states are accessible
- the form matches the repo's editorial UI language
- lint, tests, and build have been considered or run
