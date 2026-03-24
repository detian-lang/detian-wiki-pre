---
title: Forms, Actions, and State
description: Practical patterns for Hya forms, actions, state wrappers, and server-first updates.
---

# Forms, Actions, and State

## State wrappers

```detian
var#state = hya.state({ name: "Detian" });
```

## Action descriptors

```detian
hya.action("actions.save_name", { name: "Codex" })
```

## Form helpers

The Hya package includes helper surfaces for forms and inputs. These are useful when you want more structure than hand-building every element.

## Typical reducer pattern

```detian
thread#save_name(map#state, map#payload) {
  return { name: payload.name };
}
```

## Fine-grained and optimistic actions

When you combine `hya.mount_fine(...)` with fine actions, Hya can now:

- apply optimistic patches
- reconcile to authoritative server state
- revert on failure

That is part of the newer fine-grained action bridge work.
