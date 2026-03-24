# Hya Fine-Grained Reactivity — Milestone B Checklist

Milestone B extends the Milestone A text-binding slice to cover the most important element-level reactive patches: attributes, classes, and styles.

## Scope

- [x] Add a canonical Milestone B checklist document
- [x] Add explicit fine-grained prop helpers: `hya.state_attr(...)`, `hya.state_class(...)`, `hya.state_style(...)`
- [x] Extend fine-grained preparation to scan element props and assign stable binding ids
- [x] Emit SSR marker attributes for attr/class/style bindings
- [x] Reuse the same hydration payload channel for text + attr/class/style bindings
- [x] Extend the client fine-grained runtime to patch attr/class/style bindings from state changes
- [x] Preserve existing fallback behavior for non-fine components
- [x] Add focused tests for SSR markers and action-response updates

## Explicitly out of scope

- [ ] conditional binding
- [ ] keyed each/list reconciliation
- [ ] HYX automatic lowering for attr/class/style expressions
- [ ] public signal API
- [ ] optimistic local updates beyond action-response state patching

## Implementation notes

- Milestone B still stays **opt-in** via `hya.mount_fine(...)`.
- Attr bindings use presence/removal semantics for boolean values and `setAttribute/removeAttribute` for other values.
- Class/style bindings intentionally use simple overwrite semantics first; diffing can come later.
- The `fine_mode` label is now `basic`, covering text + attr/class/style bindings.

## Done criteria

1. Fine components can SSR and hydrate `hya.state_attr(...)`, `hya.state_class(...)`, and `hya.state_style(...)`.
2. Action responses can patch text + attr/class/style bindings using `state_value` without forcing subtree rerender.
3. Existing non-fine components still use the legacy full-rerender path.
4. Focused tests, full test suite, clippy, and wiki rebuild pass.
