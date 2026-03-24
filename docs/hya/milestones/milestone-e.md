# Hya Fine-Grained Reactivity — Milestone E Checklist

Milestone E focuses on developer ergonomics for the fine-grained renderer: inspectability, patch trace visibility, and runtime diagnostics that make the new rendering model explainable.

## Scope

- [x] Add a canonical Milestone E checklist document
- [x] Expose a client-side fine-grained inspector surface through `window.__hyaFine`
- [x] Add `inspect(rootOrSelector)` for single-root inspection
- [x] Add `inspectAll()` for workspace-wide fine-root inspection
- [x] Add `lastPatches()` / `clearPatches()` patch-trace helpers
- [x] Record patch and rerender events in the client runtime
- [x] Surface `fine_diagnostics` in the inspector payload
- [x] Add focused tests/docs proving the devtools hooks ship in rendered pages

## Explicitly out of scope

- [ ] dedicated browser UI panel
- [ ] time-travel state debugger
- [ ] visual overlay on DOM nodes
- [ ] action timeline persistence across reloads
- [ ] production-grade telemetry export

## Implementation notes

- Milestone E keeps the current no-build client runtime model: devtools live inside the existing Hya bootstrap script.
- The inspector is intentionally simple JSON-oriented surface area first; richer UI can come later.
- Patch logs are bounded in memory and meant for debugging, not analytics.

## Done criteria

1. Fine-grained pages expose `window.__hyaFine.inspect(...)` / `inspectAll()` at runtime.
2. Patch-mode updates append visible entries to the patch log.
3. Legacy fallback diagnostics are inspectable through the same devtools surface.
4. Focused tests, full test suite, clippy, and wiki rebuild pass.
