# Hya Fine-Grained Reactivity — Milestone A Checklist

Milestone A is the first vertical slice from `docs/hya-fine-grained-reactivity-plan.md`.
It intentionally stays narrow: prove that Hya can ship SSR text-binding metadata, hydrate it on the client, and patch bound text without falling back to subtree rerender for the supported case.

## Scope

- [x] Add a canonical Milestone A checklist document
- [x] Add an internal fine-grained text binding node shape (`hya.state_text(...)`)
- [x] Add opt-in fine-grained component mounting (`hya.mount_fine(...)`)
- [x] Prepare fine-grained component views by assigning stable text-binding ids before render
- [x] Emit SSR text markers for bound text nodes
- [x] Emit per-component hydration payload (`data-hya-fine-bindings`, `data-hya-fine-mode`)
- [x] Add a small client reactive core scaffold (signal/effect/batch)
- [x] Hydrate text bindings on page load
- [x] Reuse the action bridge to patch text bindings from `state_value` when a fine-grained component posts an action
- [x] Keep safe fallback behavior: if fine-grained metadata is missing, continue with full rerender
- [x] Add focused tests for SSR markers, hydration bootstrap presence, and action response payloads

## Explicitly out of scope

- [ ] attr/class/style fine-grained binding
- [ ] conditional binding
- [ ] keyed each/list reconciliation
- [ ] public signal API
- [ ] signal-less automatic compiler lowering from arbitrary HYX expressions
- [ ] optimistic local updates or action/state reconciliation beyond text binding

## Implementation notes

- Milestone A is intentionally **opt-in** via `hya.mount_fine(...)` so we do not silently partially-update legacy components.
- Bound text uses `hya.state_text(state, "path.to.value")` for now. This is a temporary vertical-slice API, not the final signal-less UX.
- The client runtime remains embedded in the existing Hya document bootstrap script to keep the first slice small and reversible.

## Done criteria

Milestone A is considered complete when all of the following are true:

1. `hya.mount_fine(...)` renders a component root with hydration metadata.
2. `hya.state_text(...)` renders SSR comment markers around the bound text value.
3. `hya.page(...)` includes a bootstrap script that hydrates fine-grained text roots.
4. `POST /__hya/action` responses include unwrapped `state_value` for fine-grained patching.
5. Existing non-fine-grained components continue to use the existing full-rerender path unchanged.
6. Focused tests and the full test suite pass.
