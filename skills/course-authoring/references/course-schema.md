# Course Schema

## Preferred content layout

New authored material should live here:

```text
src/content/tracks/<track-id>/<level>/*.mdx
```

Where:

- `<track-id>` is a stable kebab-case identifier such as `ai-for-engineering`
- `<level>` is `conceptual` or `builder`

The legacy `src/chapters/` folder still powers the original AI Foundations conceptual content. Treat it as grandfathered content and prefer `src/content/tracks/` for all new work.

## Catalog entry

Every track also needs an entry in:

```text
src/content/catalog.ts
```

That entry should define:

- title
- shortTitle
- profession
- tagline
- description
- conceptual and builder blueprint metadata

## Chapter frontmatter

Use this shape:

```yaml
---
title: "Chapter title"
chapter: 1
subtitle: "Short learner-facing summary"
summary: "Optional internal summary shown in richer views"
estimatedMinutes: 12
---
```

Required fields:

- `title`
- `chapter`

Recommended fields:

- `subtitle`
- `summary`
- `estimatedMinutes`

## Chapter naming

Prefer files like:

```text
01-course-overview.mdx
02-core-mental-models.mdx
03-first-workflow.mdx
```

Rules:

- keep names kebab-case
- prefix with two-digit order
- keep one clear topic per chapter

## Content expectations

Conceptual chapters should usually include:

- framing
- one or two mental models
- examples
- at least one exercise, checkpoint, or reflection prompt

Builder chapters should usually include:

- delivery context
- trade-offs
- a workflow, artifact, or implementation pattern
- an evaluation or review mindset

## Validation

After editing:

1. Confirm the catalog entry matches the authored track.
2. Run `npm run build`.
3. Verify the track renders in the app and that the sidebar order is correct.
