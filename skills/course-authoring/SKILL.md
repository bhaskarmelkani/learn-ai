---
name: course-authoring
description: Use this skill when creating, extending, or restructuring course material in this repo, especially for profession-based learning tracks, conceptual vs builder levels, MDX chapter authoring, catalog updates, or scaffold generation under src/content/tracks.
---

# Course Authoring

## Overview

Use this skill to turn a rough course idea into repo-native learning material. It is for creating new profession tracks, adding conceptual or builder depth, updating existing chapters, or standardizing content so coding agents can contribute predictably.

## Workflow

### 1. Inspect before writing

Start with:

- `src/content/catalog.ts`
- `src/content/index.ts`
- the target directory in `src/content/tracks/<track-id>/<level>/`

Read [references/course-schema.md](references/course-schema.md) when you need the expected folder layout, frontmatter fields, or naming rules.

Read [references/content-quality.md](references/content-quality.md) when you need the platform’s expectations for tone, pedagogy, or depth.

### 2. Decide whether this is an update or a scaffold

If the track and level already exist:

- extend the existing MDX material in place
- preserve chapter numbering and narrative continuity
- update `src/content/catalog.ts` only if the audience, outcomes, or planned modules changed

If the track or level does not exist yet:

- scaffold starter chapters with `scripts/scaffold-track.mjs`
- then update `src/content/catalog.ts`
- then replace scaffold text with real content

### 3. Scaffold when it saves time

Use the scaffold script for new work:

```bash
node skills/course-authoring/scripts/scaffold-track.mjs --track-id ai-for-design --title "AI for Design" --profession product
```

Optional:

- pass `--level conceptual` or `--level builder` to scaffold only one level
- pass `--force` only when intentionally replacing existing scaffold files

The script copies starter MDX files from `assets/course-template/`.

### 4. Author with the right level of depth

For `conceptual` levels:

- prioritize intuition, vocabulary, mental models, analogies, and guided exercises
- assume the learner needs clarity before implementation detail

For `builder` levels:

- prioritize delivery choices, trade-offs, workflow design, evals, artifacts, and execution
- assume the learner wants to ship something real

### 5. Keep chapters repo-native

Default chapter requirements:

- use MDX
- include frontmatter
- prefer short, purposeful chapters over giant essays
- use existing MDX components such as `Path`, `Callout`, `Exercise`, and `Checkpoint` when helpful

### 6. Validate

After content changes:

- run `npm run build`
- confirm the selected track and level render correctly in the app shell
- make sure chapter order, titles, and subtitles read well in the sidebar

## Good trigger examples

- "Create a new AI for Finance track with conceptual and builder levels."
- "Turn this outline into MDX chapters for the product track."
- "Upgrade the engineering course to include builder-level eval content."
- "Standardize our course generation workflow so coding agents can contribute."
