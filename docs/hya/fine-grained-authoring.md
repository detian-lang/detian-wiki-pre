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

## Safe HYX lowering style

HYX can now auto-lower obvious state-path patterns.

Examples that tend to lower well:

```detian
{props.state.value.count}
class={props.state.value.variant}
style={props.state.value.accent}
disabled={props.state.value.busy}
```

## Why some patterns fall back

Expressions like these are intentionally left on the legacy path:

```detian
{props.state.value.count + 1}
class={props.state.value.variant + "-x"}
```

This is not a bug. It is a correctness-first choice.

## Good current strategy

- write direct helper calls if you need certainty
- use HYX safe lowering for obvious state-path patterns
- inspect diagnostics if a pattern stayed on the legacy path
