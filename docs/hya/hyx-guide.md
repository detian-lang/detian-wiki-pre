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
