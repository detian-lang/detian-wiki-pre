# Hya Fine-Grained Reactivity — Milestone C Checklist

Milestone C extends the basic fine-grained runtime with structural bindings: conditional branch swapping and keyed text-list reconciliation.

## Scope

- [x] Add a canonical Milestone C checklist document
- [x] Add explicit conditional binding helper: `hya.state_when(...)`
- [x] Add explicit keyed text-list binding helper: `hya.state_each_text(...)`
- [x] Emit SSR range markers for conditional and each bindings
- [x] Extend hydration payloads with `if` and `each` binding instructions
- [x] Extend the client fine-grained runtime to patch conditional branches and keyed text lists from state changes
- [x] Preserve existing fallback behavior for non-fine components
- [x] Add focused tests for conditional/list SSR output and action-response updates

## Explicitly out of scope

- [ ] generic conditional lowering from HYX expressions
- [ ] generic keyed each template rendering
- [ ] nested structural fine-grained template authoring guarantees
- [ ] public signal API
- [ ] optimistic local updates beyond action-response state patching

## Implementation notes

- Milestone C intentionally keeps the explicit-helper approach from Milestones A/B.
- `hya.state_when(...)` swaps pre-rendered HTML branches between SSR comment anchors.
- `hya.state_each_text(...)` performs keyed reconciliation for simple text-item lists only.
- The current runtime supports the practical vertical slice without claiming a fully generic structural renderer yet.

## Done criteria

1. Fine components can SSR and hydrate `hya.state_when(...)` conditional regions.
2. Fine components can SSR and hydrate `hya.state_each_text(...)` keyed text lists.
3. Action responses can patch conditional/list bindings via `state_value` without forcing subtree rerender.
4. Existing non-fine components still use the legacy full-rerender path.
5. Focused tests, full test suite, clippy, and wiki rebuild pass.
