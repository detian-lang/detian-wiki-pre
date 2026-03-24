# Hya Fine-Grained Reactivity — Milestone D Checklist

Milestone D connects the existing fine-grained runtime to real Hya authoring surfaces:
the state/action bridge becomes less rerender-oriented, and HYX starts lowering
supported patterns into fine-grained bindings automatically.

## Scope

- [x] Add a canonical Milestone D checklist document
- [x] Deepen the state/action bridge so fine roots can stay on the patch path by default
- [x] Define a stable fine-grained action-response contract beyond ad-hoc `state_value`
- [x] Add state/version metadata needed to safely reconcile client state after actions
- [x] Lower simple HYX text interpolation on state paths into `hya.state_text(...)`
- [x] Lower simple HYX attr/class/style bindings on state paths into `hya.state_attr(...)` / `hya.state_class(...)` / `hya.state_style(...)`
- [x] Lower simple HYX conditionals on state boolean paths into `hya.state_when(...)`
- [x] Lower simple keyed HYX loops over state lists into `hya.state_each_text(...)`
- [x] Keep unsupported HYX patterns on the legacy full-render path
- [x] Add focused tests that prove the lowering chooses fine-grained helpers only for safe patterns

## Explicitly out of scope

- [ ] generic client-side evaluation of arbitrary Detian expressions
- [ ] full signal-less lowering for every HYX expression form
- [ ] optimistic local updates / transitions / suspense
- [ ] generic keyed template reconciliation beyond the current text-list slice
- [ ] public signal API

## Implementation notes

- Milestone D remains conservative: it only lowers patterns that are obviously safe and directly state-path based.
- The bridge should continue to prefer correctness over aggressiveness. If reconciliation is ambiguous, fall back to subtree rerender.
- HYX lowering should be additive. Existing source should keep working even if it does not qualify for fine-grained lowering.
- The first success condition is not “all HYX is fine-grained”; it is “common state-driven HYX no longer requires explicit helper calls for the already-supported runtime primitives.”
- Current keyed each lowering is intentionally narrow: it expects a simple loop body like `<li key={item.id}>{item.name}</li>`.

## Done criteria

1. Fine components can keep using the patch path after actions without hand-written bridge glue.
2. A documented/stable response shape exists for fine-grained action reconciliation.
3. HYX can automatically lower the supported text/attr/class/style/conditional/keyed-text-list patterns.
4. Unsupported HYX patterns clearly and safely fall back to legacy rendering.
5. Focused tests, full test suite, clippy, and wiki rebuild pass.
