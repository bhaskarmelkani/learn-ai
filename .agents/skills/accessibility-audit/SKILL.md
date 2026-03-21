---
name: accessibility-audit
description: Review and improve accessibility across semantic structure, keyboard interaction, focus handling, motion, and contrast.
---

# accessibility-audit

Use this skill whenever a task touches navigation, dialogs, forms, interactive demos, or major page layout.

## Checklist

- semantic headings and landmarks
- labels and instructions for form controls
- keyboard navigation and visible focus
- contrast and non-color cues
- aria usage only where native semantics are insufficient
- motion kept subtle and non-essential

## Workflow

1. Inspect the rendered structure and interaction paths.
2. Check keyboard-only usage first.
3. Verify focus movement for overlays and dynamic content.
4. Confirm labels, descriptions, and error states.
5. Add or improve tests when there is a meaningful interaction risk.

## Output

Prefer concise, file-specific findings and concrete fixes over generic guidance.
