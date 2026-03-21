# Course Authoring UI

Use this workflow when creating or revising course-facing chapter UI.

## Preferred Structure

- Theory
- Worked intuition or example
- Interactive exploration
- Checkpoint or exercise
- Recap and next step

## Reuse Before Creating

- `src/components/mdx/`
- `src/components/interactive/`
- `src/components/ui/`
- `src/features/agent-ready/`

## Rules

- Keep learning language supportive and direct
- Preserve the existing editorial visual style
- Keep long-form text readable on mobile
- Use accessible headings, buttons, and focus states
- If a chapter needs validation-heavy inputs, use `react-hook-form` and `zod`
