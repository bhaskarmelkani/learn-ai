---
name: design-system-guard
description: Keep UI work aligned with the repo's spacing, typography, shadcn-compatible patterns, and existing visual language.
---

# design-system-guard

Use this skill when reviewing or implementing UI changes that may drift from established patterns.

## Guardrails

- prefer existing components before creating new ones
- avoid arbitrary spacing or one-off typography
- preserve the IBM Plex Sans and Source Serif 4 usage split
- keep Tailwind classes semantic and consistent
- avoid introducing another UI library when shadcn-compatible composition is enough

## Workflow

1. Compare the change to adjacent screens and existing components.
2. Check spacing, sizing, border radius, and typography rhythm.
3. Look for duplicate variants that should be unified.
4. Keep dark-mode and mobile behavior aligned with current patterns.
5. For browser-AI labs, standardize badges, status cards, control layouts, and fallback copy instead of creating one-off visual treatments.
6. Call out drift early, before it spreads.
