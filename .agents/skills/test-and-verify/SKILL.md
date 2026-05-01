---
name: test-and-verify
description: Run the repository validation loop for UI and learning-flow changes using lint, unit tests, build, and Playwright smoke tests.
---

# test-and-verify

Use this skill whenever a change affects behavior, rendering, navigation, or lesson interactions.

## Validation Order

1. Run `pnpm lint`.
2. Run `pnpm test`.
3. Run `pnpm build`.
4. Run `pnpm e2e` for navigation or browser-interaction changes.

## Review Checklist

- Types remain strict.
- No unused imports or dead props were introduced.
- Keyboard navigation still works for chapter flow.
- Any new form uses `react-hook-form` and `zod`.
- Browser-AI labs should be testable in mock mode so CI does not need live model downloads.
- For browser-AI UI changes, include at least one smoke path that renders the lab shell and fallback/loading copy.
- The final handoff clearly states what was verified and what was not.

## Failure Handling

- Fix issues immediately when they are caused by the current change.
- If a pre-existing issue blocks completion, capture the exact command and summarize the blocker clearly.
