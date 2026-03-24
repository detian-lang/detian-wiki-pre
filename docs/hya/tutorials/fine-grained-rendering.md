---
title: Fine-Grained Rendering
description: Learn when to switch from full rerendering to Hya’s fine-grained bindings, safe HYX lowering, and selective DOM patching.
---

# Fine-Grained Rendering

Hya begins as a server-first renderer, and that is still a good default. Fine-grained rendering is a later optimization and authoring convenience layer, not a replacement for understanding the core request → response model.

That is why this tutorial comes late in the series. You should already be comfortable with pages, components, actions, forms, and routes before you turn it on.

## The main switch

A component becomes a fine-grained hydration root when you mount it this way:

```detian
var#view = hya.mount_fine("components.counter", { state: state });
```

This tells Hya to emit extra metadata and markers so the client runtime can patch specific bindings instead of rerendering the whole subtree.

## What fine-grained currently supports

At this stage, Hya supports a growing vertical slice of fine-grained binding:

- text
- attr
- class
- style
- conditional branches
- keyed text lists
- keyed nested row views

That is already enough to make many small and medium interactions feel significantly more responsive.

## Explicit helper surfaces

The clearest way to author fine-grained bindings is still with explicit helpers.

### Text

```detian
hya.state_text(props.state, "count")
```

### Attribute

```detian
hya.state_attr(props.state, "disabled", "busy")
```

### Class and style

```detian
hya.state_class(props.state, "variant")
hya.state_style(props.state, "accent")
```

### Conditional branch

```detian
hya.state_when_else(
  props.state,
  "busy",
  hya.element("p", { class: "busy" }, [hya.text("Busy")]),
  hya.element("p", { class: "ready" }, [hya.text("Ready")])
)
```

### Keyed list

```detian
hya.state_each_text(props.state, "items", "id", "name", "li")
```

### Keyed nested views

```detian
hya.state_each_view(props.state, "items", "id", views)
```

## A practical example

```detian
group#components {
  thread#counter(map#props) {
    return hya.fragment([
      hya.state_when_else(
        props.state,
        "busy",
        hya.element("p", { class: "busy" }, [hya.text("Busy")]),
        hya.element("p", { class: "ready" }, [hya.text("Ready")])
      ),
      hya.element("button", {
        disabled: hya.state_attr(props.state, "disabled", "busy"),
        class: hya.state_class(props.state, "variant"),
        style: hya.state_style(props.state, "accent"),
        on_click: hya.action("actions.increment", { delta: 1 })
      }, [
        hya.text("Counter: "),
        hya.state_text(props.state, "count")
      ])
    ]);
  }
}
```

This is no longer “rerender the whole thing and hope it is cheap.” It is “track the meaningful bindings and patch only what changed.”

## Safe HYX lowering

Hya also lowers some obvious HYX state-path patterns automatically.

Examples that usually lower cleanly:

```hyx
{props.state.value.count}
class={props.state.value.variant}
style={props.state.value.accent}
disabled={props.state.value.busy}
```

It can also lower simple `if` blocks and certain keyed loops.

## Why not everything lowers automatically

Because correctness matters more than aggressive magic. If Hya is not confident that a HYX expression is a safe state-path pattern, it keeps the old render path and records diagnostics.

That is a good tradeoff. It means the framework stays understandable instead of surprising you with silent partial-lowering mistakes.

## Fine-grained versus classic authoring

A helpful rule is:

- use classic `hya.mount(...)` by default
- switch to `hya.mount_fine(...)` when a component clearly benefits from more targeted updates

You do not need to make every component fine-grained on day one. Hya is happiest when you treat fine-grained behavior as a tool, not a doctrine.

## Inspecting fine roots

The client runtime exposes devtools hooks in the browser console:

- `window.__hyaFine.inspect(...)`
- `window.__hyaFine.inspectAll()`
- `window.__hyaFine.lastPatches()`
- `window.__hyaFine.clearPatches()`

These are useful when you want to verify whether a component patched or fell back to rerender.

## How actions fit in

The nice part is that action authoring does not change much. You still write:

```detian
hya.action("actions.increment", { delta: 1 })
```

The difference is that the fine runtime may patch only the affected bindings after the server returns `state_value`.

That continuity is one of Hya’s best design properties.

## When fine-grained rendering is worth it

It is most useful when:

- a subtree is structurally stable but some values change often
- the UI has counters, badges, toggles, or conditional status blocks
- a list reorders or updates often enough to justify keyed patching
- optimistic actions would feel noticeably better with selective updates

## When classic rerender is still fine

Stick with classic rendering when:

- the component is small
- the UI changes rarely
- you are still exploring the shape of the feature
- the HYX is too complex for safe lowering and the classic path is clear

There is no shame in using the simpler mode. Hya is explicitly built to support both.

## Common beginner mistakes

### Turning on fine mode too early

Understand the baseline first. Fine-grained rendering is easier once you already trust the plain server-first behavior.

### Assuming every HYX expression will lower automatically

It will not—and that is good. Hya prefers safe lowering over surprising behavior.

### Forgetting that actions are still server-authoritative

Fine-grained rendering improves patching strategy, not the underlying action model.

## Exercise

Take your counter app and convert it to `hya.mount_fine(...)`. Then add:

- a `busy` boolean
- a `variant` class string
- a `count` text binding
- a small `if` branch that changes status text

Use the browser inspect helpers to confirm that updates patch targeted bindings instead of forcing a full rerender.

## Next step

Continue to [Optimistic Actions and Reconcile](./optimistic-actions-and-reconcile.md), where we make interaction feel faster by applying a temporary client-side patch before the authoritative server response arrives.
