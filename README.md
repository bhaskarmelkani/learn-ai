# Learn AI Studio

An interactive, local-first learning platform for agent-augmented course creation.

The goal is no longer just a single AI intuition course. This repo is evolving into a reusable course studio where contributors can add profession-based learning tracks, deepen them across levels, and rely on coding agents plus in-repo skills to generate and refine high-quality material.

## Platform Model

Each learning track targets a profession and supports two levels:

- `conceptual`: intuition, mental models, vocabulary, and guided understanding
- `builder`: detailed delivery patterns, implementation choices, evaluation, and execution

The app now supports:

- `AI Foundations`
- `AI for Engineering`
- `AI for Product`
- `AI for Business`

Some levels are already published and some are intentionally scaffolded as blueprints so contributors can expand them with agents over time.

## Current Content State

- `AI Foundations / Conceptual` is the existing full chapter flow
- `AI Foundations / Builder` is now live as the first builder-level example
- Engineering, Product, and Business tracks are scaffolded in the catalog with planned module arcs

## Source Of Truth

- `src/content/catalog.ts`
  Defines track metadata, audiences, outcomes, and planned modules.
- `src/content/tracks/<track-id>/<level>/`
  Preferred home for new MDX course content.
- `src/chapters/`
  Legacy location for the original conceptual AI Foundations material. New work should go in `src/content/tracks`.
- `skills/course-authoring/`
  In-repo skill for coding agents to scaffold and update learning tracks.

## Contributor Workflow

1. Open the repo inside a coding agent.
2. Use `$course-authoring` when creating or revising course material.
3. Scaffold a new track or level if needed:

```bash
npm run scaffold:track -- --track-id ai-for-design --title "AI for Design" --profession product
```

4. Update `src/content/catalog.ts` with the track metadata and planned outcomes.
5. Author or refine chapters in `src/content/tracks/<track-id>/<level>/`.
6. Validate with:

```bash
npm run build
```

## What Makes This Repo Different

- The learning experience is local-first and front-end only
- Content is authored in MDX and paired with interactive demos
- Published chapters and blueprint tracks can coexist in the UI
- Contribution is designed around coding-agent workflows, not manual CMS work

## Tech Stack

- React
- TypeScript
- Vite
- MDX
- Tailwind CSS
- Pyodide for in-browser Python notebooks

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## More Detail

- Human-facing platform overview: `docs/course-platform.md`
- Agent authoring workflow: `skills/course-authoring/SKILL.md`
