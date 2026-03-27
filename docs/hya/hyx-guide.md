---
title: HYX Guide
description: Authoring UI with the HYX syntax layer on top of Hya.
---

# HYX Guide

HYX is a syntax layer that lowers into Hya primitives.

## Supported features

- tags
- `{expr}` interpolation
- `if / else`
- `let`
- `for`
- simple flow statements
- PascalCase component mapping to `components.*`

## Example

```detian
var#view = hyx {
  <section class="card">
    <h1>{title}</h1>
    if (state.value.busy) {
      <p class="busy">Busy</p>
    } else {
      <p>Ready</p>
    }
  </section>
};
```

## Fine-grained lowering

HYX now performs conservative fine-grained lowering for obvious state-path patterns. If a pattern is too complex or ambiguous, it falls back to the legacy render path and can emit diagnostics for inspection.

## Current safe lowering coverage

Representative patterns that now lower automatically:

- `{props.state.value.count}` → `hya.state_text(...)`
- `class={props.state.value.variant}` / `style={props.state.value.accent}` / `disabled={props.state.value.busy}`
- `if (props.state.value.busy) { ... } else { ... }` → `hya.state_when(...)`
- `for item in props.state.value.items { <li key={item.id}>{item.name}</li> }` → `hya.state_each_text(...)`
- `for item in props.state.value.items { <li key={item.id}><span>{item.name}</span>...</li> }` → `hya.state_each_view(...)`
- `for item in props.state.value.items { <MetricCard key={item.id} metric={item} /> }` → `hya.state_each_view(...)`
- `for item, idx in props.state.value.items { <li key={item.id}>{item.name + "-" + str(idx)}</li> }` → `hya.state_each_view(...)`

This means keyed component loops and indexed keyed loops are now part of the safe lowering surface.

## Fallback diagnostics

When HYX cannot lower a state-driven pattern into the fine path, Hya records more specific fallback reasons in `data-hya-fine-diagnostics`.

Examples:

- `complex_state_text_expr`
- `complex_state_attr_expr`
- `state_each_requires_keyed_root`
- `state_each_text_expr_must_reference_loop_item_path`

That gives you a direct explanation for why a component stayed on the legacy/full-rerender path.

## Practical guidance

Prefer these rules when you want HYX to stay on the fine path:

- use explicit `props.state.value.*` style state paths
- keep keyed loops keyed by the loop item, not by unrelated expressions
- keep the keyed row body simple and deterministic
- if a loop needs `idx`, expect it to lower through `hya.state_each_view(...)`

If you are unsure whether a component stayed on the fine path, inspect:

```js
window.__hyaFine.inspectAll()
```

and look at `bindings` and `diagnostics`.
