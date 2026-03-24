# Hya Fine-Grained Reactivity — Milestone D2 Checklist

Milestone D2 extends Milestone D’s conservative HYX lowering and keyed-list work with a more practical keyed-template slice: keyed list items can now carry small nested subtrees instead of text-only rows.

## Scope

- [x] Add a canonical Milestone D2 checklist document
- [x] Add explicit generic keyed-template helper: `hya.state_each_view(...)`
- [x] Extend SSR preparation to emit keyed HTML fragments for generic keyed list items
- [x] Extend hydration/runtime patching to reconcile keyed HTML-fragment items by key
- [x] Reuse the fine action contract by shipping updated `fine_bindings` for patch-mode responses
- [x] Extend HYX safe lowering from text-only keyed loops to simple keyed subtree loops
- [x] Keep unsupported keyed loop patterns on the legacy full-render path
- [x] Add focused parser/runtime/action tests for the new keyed-template slice

## Explicitly out of scope

- [ ] arbitrary nested reactive bindings inside every keyed template
- [ ] fully generic client-side template evaluation
- [ ] generic keyed diffing for all fragment shapes and multi-root rows
- [ ] public signal API
- [ ] optimistic local list updates without a server action roundtrip

## Implementation notes

- This is still a conservative slice: HYX lowering only targets obvious keyed state-list loops whose body is a single keyed element.
- `hya.state_each_view(...)` currently treats each row as a keyed HTML fragment generated on the server and reconciled by key on the client.
- The runtime now accepts updated `fine_bindings` in patch responses so structural bindings can refresh their fragment payloads safely.

## Done criteria

1. Fine components can SSR and hydrate generic keyed list rows through `hya.state_each_view(...)`.
2. Action responses can update keyed nested item subtrees without forcing full component rerender.
3. HYX can automatically lower the supported keyed subtree loop shape.
4. Unsupported keyed loop patterns clearly fall back to the legacy path.
5. Focused tests, full test suite, clippy, and wiki rebuild pass.
