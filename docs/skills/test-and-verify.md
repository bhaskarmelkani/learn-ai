# Test And Verify

Use this workflow whenever a change affects behavior, rendering, navigation, or lesson interactions.

## Validation Order

1. `pnpm lint`
2. `pnpm test`
3. `pnpm build`
4. `pnpm e2e` for UI, navigation, or browser-interaction changes

## Browser AI Notes

- Browser-AI labs should support a mock mode so tests do not require live model downloads
- Smoke coverage should verify the visible lab shell, controls, and fallback/loading copy

## Done When

- types remain strict
- tests are green or blockers are documented clearly
- the final handoff says exactly what was verified
