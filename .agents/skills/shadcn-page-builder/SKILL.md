---
name: shadcn-page-builder
description: Build or refactor pages using this repo's learning-product layout, typography, navigation, and shadcn-friendly composition rules.
---

# shadcn-page-builder

Use this skill when building a new page, chapter shell, dashboard section, or major content layout.

## Goals

- fit the existing learning-product visual system
- reuse current navigation and content patterns
- prefer shadcn-compatible composition over bespoke UI
- keep the page responsive and accessible

## Workflow

1. Inspect `src/App.tsx`, `src/components/Sidebar.tsx`, `src/components/NavigationBar.tsx`, and related components before changing layout patterns.
2. Reuse the current typography split:
   - IBM Plex Sans for interface and navigation
   - Source Serif 4 for longer reading surfaces
3. Prefer existing wrappers and section patterns in `src/components/mdx/` before creating new layout primitives.
4. If a new reusable component is needed, place it in `src/components/`.
5. For interactive content inside a page, compose from `src/components/interactive/` patterns instead of embedding large one-off logic blocks.
6. Verify responsive behavior, keyboard access, and visual hierarchy.

## Done When

- the page matches the current product feel
- navigation and spacing feel consistent with adjacent screens
- accessibility basics are covered
- lint, tests, and build have been considered or run
