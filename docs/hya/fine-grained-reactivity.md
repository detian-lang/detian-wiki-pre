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

## Current helper surface

- `hya.mount_fine(...)`
- `hya.state_text(...)`
- `hya.state_attr(...)`
- `hya.state_class(...)`
- `hya.state_style(...)`
- `hya.state_when(...)`
- `hya.state_each_text(...)`
- `hya.state_each_view(...)`

## Planning documents

- [Fine-Grained Reactivity Plan](./fine-grained-reactivity-plan)
- [Milestones Overview](./milestones/overview)
