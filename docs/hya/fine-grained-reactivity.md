---
title: Fine-Grained Reactivity
description: The current Hya fine-grained rendering story and implementation milestones.
---

# Fine-Grained Reactivity

Hya is evolving toward a SolidJS-style fine-grained renderer while keeping SSR-first behavior and the existing action model.

## What already exists

- text binding hydration
- attr/class/style binding hydration
- conditional binding
- keyed text list binding
- keyed view binding
- safe HYX lowering for obvious state-path patterns
- optimistic fine actions
- browser-side inspect and patch log hooks
- structural re-hydration after conditional / keyed-view patches
- minimal full-page hot reload through `detian dev <entry>`

## Current helper surface

- `hya.mount_fine(...)`
- `hya.state_text(...)`
- `hya.state_attr(...)`
- `hya.state_class(...)`
- `hya.state_style(...)`
- `hya.state_when(...)`
- `hya.state_each_text(...)`
- `hya.state_each_view(...)`

## Current lowering reality

The fine-grained renderer is not "magic for all HYX yet". The current safe lowering surface is deliberately conservative.

Today it includes:

- direct state text interpolation
- direct state attr/class/style bindings
- direct state `if/else`
- direct `else if` chains
- keyed text loops
- keyed HTML-fragment loops
- keyed component loops
- indexed keyed loops that need `idx` inside the rendered row
- default `state.*` alias inside component-style HYX threads

When a pattern is not safe enough, Hya falls back to the legacy render path and records why in `data-hya-fine-diagnostics`.

Useful current fallback reasons include:

- `complex_state_text_expr`
- `complex_state_attr_expr`
- `state_each_requires_keyed_root`

Those diagnostics now also include a `hint`, so the runtime can tell you what to simplify or rewrite when a component stayed on the legacy path.

## Structural patching and re-hydration

Recent work closed an important gap:

- `state_when(...)` branch swaps can insert new fine roots
- `state_each_view(...)` keyed row patches can insert or replace rows that themselves contain fine roots

The browser runtime now re-hydrates those inserted subtrees so nested fine roots can attach again after structural patches.

## Dev loop

There is now a minimal Hya development loop:

```bash
detian dev examples/hya_server.det
```

Current behavior:

- the CLI watches source and asset files
- the child Detian process restarts
- `hya.page(...)` injects a dev reload script
- the browser polls `GET /__hya/dev/version`
- version changes trigger a full page reload

This is intentionally **full-page hot reload, not HMR**.

## Planning documents

- [Fine-Grained Reactivity Plan](./fine-grained-reactivity-plan)
- [Milestones Overview](./milestones/overview)
