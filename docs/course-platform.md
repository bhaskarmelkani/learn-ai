# Course Platform

## Goal

This repo should feel less like a one-off course and more like a course studio. A contributor with an idea should be able to clone the project, open it in a coding agent, invoke the in-repo authoring skill, and leave with a new or improved learning track that fits the platform’s standards.

## Core Model

The platform is organized as:

- profession-based tracks
- two depth levels per track: `conceptual` and `builder`
- MDX chapters for published material
- blueprint metadata for levels that are planned but not yet fully authored

This lets the app support both learner delivery and contributor planning at the same time.

## Why This Shape Works

- Learners can browse a broader catalog instead of one linear chapter list.
- Contributors can add depth without redesigning the app each time.
- Coding agents have a predictable directory structure and content schema.
- Blueprint-only tracks can be discussed, reviewed, and prioritized before full writing starts.

## Key Files

- `src/content/catalog.ts`
  Track metadata, audiences, outcomes, and planned module arcs.
- `src/content/index.ts`
  Content registry and grouping logic.
- `src/content/tracks/<track-id>/<level>/`
  Preferred directory for authored chapters.
- `skills/course-authoring/`
  The agent-facing workflow for scaffolding and updating content.

## Contribution Lifecycle

1. Pick a profession and level.
2. Add or refine the track entry in `src/content/catalog.ts`.
3. Scaffold starter MDX chapters with the authoring skill or scaffold script.
4. Expand chapters with explanations, exercises, checkpoints, and role-appropriate examples.
5. Verify the app builds cleanly and that the track reads coherently in the UI.

## Quality Bar

Every track should aim for:

- clear audience framing
- explicit learning outcomes
- consistent chapter naming and frontmatter
- level-appropriate depth
- practical exercises or decision prompts
- language that is accessible without becoming shallow

Conceptual tracks should build mental models. Builder tracks should turn those models into shippable decisions, workflows, or artifacts.

## Near-Term Roadmap

- Migrate legacy `src/chapters` content into `src/content/tracks/ai-foundations/conceptual/`
- Add more live builder-level chapters
- Publish the first role-specific track beyond AI Foundations
- Add validation automation for catalog consistency and chapter frontmatter
