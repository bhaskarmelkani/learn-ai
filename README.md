# Learn AI

Learn AI is a local-first, multi-course learning platform for building intuition about AI through short chapters, interactive demos, browser-based notebooks, and lightweight in-browser AI labs.

The platform currently ships two public courses:

- `ai-fundamentals` for the path from "What is a model?" through neural networks and LLM system design
- `gen-ai-intuition` for prompting, grounding, retrieval, and practical generative-AI workflows

The product is built so new courses, chapters, and interactive labs can be added without rewriting the reader, state model, or catalog flow.

## Highlights

- Multi-course catalog with route-based navigation
- Course-scoped progress with resume support
- Global learner track preference: `conceptual` or `builder`
- Guided mode for prediction-first learning
- MDX-powered chapters with reusable teaching components
- In-browser Python labs powered by Pyodide
- Browser-only AI labs for tokenization, embeddings, retrieval, and tiny local LLMs
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
- `@huggingface/transformers`
- `gpt-tokenizer`
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

## Browser AI Labs

The repo now includes a shared browser-AI toolkit for static-hosted, no-backend teaching labs.

- Runs entirely in the browser with no API keys
- Designed to work on GitHub Pages and other static hosts
- Downloads model/runtime assets on first use, then reuses the browser cache
- Defaults to WASM-safe behavior and uses WebGPU opportunistically when available
- Uses intentionally small local models, so quality is educational rather than production-grade

The current labs cover tokenization, context budgets, tiny local text generation, embeddings, semantic search, and retrieval-vs-model-only comparisons.

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

Substantive contributions to this repo are expected to go through coding agents that follow the repo instructions and mirrored skill docs.

1. Start from [CONTRIBUTING.md](/Users/bhaskar.melkani/Documents/Projects/bhaskar/learn-ai/CONTRIBUTING.md).
2. Read [AGENTS.md](/Users/bhaskar.melkani/Documents/Projects/bhaskar/learn-ai/AGENTS.md) or [CLAUDE.md](/Users/bhaskar.melkani/Documents/Projects/bhaskar/learn-ai/CLAUDE.md).
3. Follow the workflows in [docs/skills/README.md](/Users/bhaskar.melkani/Documents/Projects/bhaskar/learn-ai/docs/skills/README.md).
4. Run the validation commands above.
5. Open a PR with screenshots or notes for visible UI changes.

Contributions that bypass the documented agent workflow may be declined so the repo can keep course quality, browser-AI patterns, and validation expectations consistent.

## Hosting Notes

This is a client-side routed SPA. Production hosting must rewrite unknown paths to `index.html`, or deep links like `/courses/ai-fundamentals/4` will 404 on refresh.

### GitHub Pages With PR Previews

The repo includes GitHub Actions workflows for:

- deploying `main` to the `gh-pages` branch
- publishing pull request previews under `pr-preview/pr-{number}/`
- posting the preview URL back onto the PR

One-time repository setup:

1. In GitHub `Settings > Pages`, set the source to `Deploy from a branch`, then choose `gh-pages` and `/ (root)`.
2. In `Settings > Actions > General`, set workflow permissions to `Read and write permissions`.
3. If the site is served from a custom path, set a repository variable named `PAGES_BASE_PATH`.

Use these `PAGES_BASE_PATH` values:

- `/` for a user or organization site like `https://owner.github.io/` or for a custom domain rooted at `/`
- `/learn-ai/` for a project site served from `https://owner.github.io/learn-ai/`

If you use a custom domain and want the PR comment to point at that host instead of the default `github.io` URL, set `PAGES_SITE_URL` to the public site URL, for example `https://learn.example.com/`.

## Contributing Ideas

- New courses or chapters
- More interactive demos and labs
- Accessibility and mobile UX improvements
- Better contributor tooling and validation
