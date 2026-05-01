---
name: chart-and-metrics
description: Build learner progress dashboards, charts, and metric summaries that stay readable, educational, and visually consistent with the product.
---

# chart-and-metrics

Use this skill for progress dashboards, score summaries, completion trends, or teaching visuals that present quantitative information.

## Goals

- make the metric story obvious at a glance
- avoid decorative complexity
- preserve accessibility and responsive readability

## Workflow

1. Start with the teaching question the chart should answer.
2. Reuse existing graph and data-viz patterns in `src/components/interactive/` before adding new abstractions.
3. Prefer simple encodings first: bars, lines, distributions, comparison cards.
4. Use clear labels, units, and empty states.
5. Keep interactive controls adjacent to the chart they affect.

## Guardrails

- avoid dense legends when direct labels work
- avoid misleading scales
- avoid color-only differentiation when categories matter
- keep charts understandable on mobile widths
