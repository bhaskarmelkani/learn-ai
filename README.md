# Learn AI

Learn AI is a local-first, multi-course learning platform for building intuition about AI through short chapters, interactive demos, and browser-based notebooks.

The current starter course, `ai-fundamentals`, takes learners from "What is a model?" through linear models, neural networks, and LLM system design. The platform is built so additional courses can be added without rewriting the reader, state model, or catalog flow.

## Highlights

- Multi-course catalog with route-based navigation
- Course-scoped progress with resume support
- Global learner track preference: `conceptual` or `builder`
- Guided mode for prediction-first learning
- MDX-powered chapters with reusable teaching components
- In-browser Python labs powered by Pyodide
- Local-first persistence with migration from the older single-course state model

## Routes

- `/` shows the course catalog
- `/courses/:courseSlug` resumes a course at the learner's saved chapter
- `/courses/:courseSlug/:chapterNumber` opens a specific chapter
- Legacy hashes like `#chapter-3-whatever` redirect to `/courses/ai-fundamentals/3`

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- MDX
- Tailwind CSS
- shadcn/ui primitives
- react-hook-form + zod
- Vitest
- Playwright

## Getting Started

```bash
pnpm install
pnpm dev
```

Open the local Vite URL printed in the terminal.

## Validation

```bash
pnpm lint
pnpm test
pnpm build
pnpm e2e
```

`pnpm e2e` is especially useful after navigation, onboarding, or catalog changes.

## Project Structure

```text
src/
  components/              shared UI, interactive demos, and MDX helpers
  courses/
    registry.ts            course discovery and chapter loading
    types.ts               course manifest and chapter types
    ai-fundamentals/
      course.ts            manifest for the starter course
      chapters/            MDX chapter files
  learning/                global learner state and course-scoped progress
  pages/                   catalog, reader, and legacy redirect pages
tests/                     unit and integration coverage
e2e/                       Playwright smoke tests
docs/                      contributor and agent-facing documentation
```

## Adding A New Course

Each course lives in `src/courses/{slug}/` and includes:

- `course.ts` exporting a `CourseManifest`
- `chapters/` containing numbered MDX files like `01-intro.mdx`

The registry auto-discovers courses with `import.meta.glob`, so there is no manual registration step.

Useful docs:

- [Course contribution guide](/Users/bhaskar.melkani/Documents/Projects/bhaskar/learn-ai/docs/contributing-courses.md)
- [Skill docs](/Users/bhaskar.melkani/Documents/Projects/bhaskar/learn-ai/docs/skills/README.md)
- [Agent-ready playbook](/Users/bhaskar.melkani/Documents/Projects/bhaskar/learn-ai/docs/agent-ready-playbook.md)

## Contributor Workflow

1. Fork or branch from the repo.
2. Run `pnpm install`.
3. Make incremental changes that follow the patterns in `src/components`, `src/components/mdx`, `src/components/interactive`, and `src/learning`.
4. Run the validation commands above.
5. Open a PR with screenshots or notes for any UI changes.

If you are using an agent, start with [AGENTS.md](/Users/bhaskar.melkani/Documents/Projects/bhaskar/learn-ai/AGENTS.md) or [CLAUDE.md](/Users/bhaskar.melkani/Documents/Projects/bhaskar/learn-ai/CLAUDE.md).

## Hosting Notes

This is a client-side routed SPA. Production hosting must rewrite unknown paths to `index.html`, or deep links like `/courses/ai-fundamentals/4` will 404 on refresh.

## Contributing Ideas

- New courses or chapters
- More interactive demos and labs
- Accessibility and mobile UX improvements
- Better contributor tooling and validation
