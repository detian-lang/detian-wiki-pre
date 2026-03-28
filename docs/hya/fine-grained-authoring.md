---
title: Fine-Grained Authoring
description: How to author Hya components so they qualify for current fine-grained lowering and patching paths.
---

# Fine-Grained Authoring

Hya fine-grained rendering is intentionally conservative today. That means authoring style matters.

## Direct helper style

These helpers always make intent obvious:

- `hya.state_text(...)`
- `hya.state_attr(...)`
- `hya.state_class(...)`
- `hya.state_style(...)`
- `hya.state_when(...)`
- `hya.state_each_text(...)`
- `hya.state_each_view(...)`

They are still the best escape hatch when you want exact helper-level control or you are comparing HYX lowering against the raw flat surface.

## Safe HYX lowering style

HYX can now auto-lower a meaningful safe subset, so the default authoring advice is:

- start with HYX
- use the default `state.*` alias in component-style threads
- drop to direct helpers only when you need exact control or the diagnostics tell you the safe lowering path did not apply

Examples that tend to lower well:

```detian
{state.count}
class={state.variant}
style={state.accent}
disabled={state.busy}
```

## Why some patterns fall back

Expressions like these are intentionally left on the legacy path:

```detian
{props.state.value.count + 1}
class={props.state.value.variant + "-x"}
```

This is not a bug. It is a correctness-first choice.

## Good current strategy

- start with HYX safe lowering for obvious state-path patterns
- write direct helper calls if you need certainty or parity-level control
- inspect diagnostics if a pattern stayed on the legacy path
