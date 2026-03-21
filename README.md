# Learn AI

An interactive, local-first learning app for building intuition around AI.

This project is designed for short training sessions and self-study. It mixes concise slide-style explanations with hands-on demos so people can explore concepts by trying them, not just reading about them.

## What It Covers

- What a model is
- Linear regression and gradient descent
- Classification and sigmoid
- Non-linear models and neural networks
- Training loops and backpropagation
- How neural nets connect to LLMs

## What Makes It Different

- Short, readable chapters instead of long articles
- Interactive demos for each core concept
- Runnable notebook-style Python labs in the browser
- A course flow designed to build intuition step by step
- Audience tracks for conceptual learners, builders, and educator/PM use cases
- Guided mode that asks learners to predict before they manipulate key demos
- Mastery features including interactive checkpoints, review queue, chapter recaps, and a final capstone

## Tech Stack

- React
- TypeScript
- Vite
- MDX
- Tailwind CSS
- shadcn/ui
- react-hook-form
- zod
- Pyodide for in-browser Python notebooks

## Run Locally

```bash
pnpm install
pnpm dev
```

Then open the local Vite URL shown in the terminal.

## Build For Production

```bash
pnpm build
```

To preview the production build locally:

```bash
pnpm preview
```

## Validation

```bash
pnpm lint
pnpm test
pnpm build
pnpm e2e
```

## Agent-Ready Repo Conventions

- Project instructions live in `AGENTS.md` and `CLAUDE.md`.
- shadcn is configured through `.mcp.json` and `components.json`.
- Canonical examples for agents live in `src/features/agent-ready/`.
- Shared UI primitives live in `src/components/ui/`.
- The project playbook lives in `docs/agent-ready-playbook.md`.

## Notes

- The browser notebooks use Pyodide, so they run without a backend.
- The layout is optimized for reading, presenting, and live training sessions.
- The course now includes track-specific framing, concept bridges, case cards, guided labs, and mastery-oriented recap flows.
- You can navigate chapters with the sidebar or keyboard shortcuts.

## Contributing

Contributions are welcome. Good places to help are:

- More interactive exercises
- Better explanations and examples
- Accessibility and mobile UX improvements
- Additional chapters on AI topics
