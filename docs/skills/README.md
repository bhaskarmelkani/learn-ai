# Skill Docs

These docs mirror the internal agent skills in a tool-agnostic format so coding agents can follow the same contributor workflow publicly.

Substantive contributions to this repo are expected to use these workflows together with [AGENTS.md](../../AGENTS.md) or `CLAUDE.md` if present in your local checkout.

Available guides:

- [Create course](create-course.md)
- [Add chapter](add-chapter.md)
- [Course review](course-review.md)
- [Course authoring UI](course-authoring-ui.md)
- [Browser AI labs](browser-ai-labs.md)
- [Design system guard](design-system-guard.md)
- [Test and verify](test-and-verify.md)
- [Form and validation](form-and-validation.md)
- [Accessibility audit](accessibility-audit.md)

## Minimum Workflow

For most course contributions, use this order:

1. `create-course` or `course-authoring-ui`
2. `add-chapter` when extending an existing course
3. `browser-ai-labs` when local AI demos are involved
4. `design-system-guard`
5. `course-review`
6. `test-and-verify`

Add `form-and-validation` or `accessibility-audit` when the change needs them.

These docs should stay aligned with `.agents/skills/`. If a new contribution-critical skill is added internally, add or update the public mirror here too.
