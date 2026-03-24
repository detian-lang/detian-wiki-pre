---
title: Components, State, and Actions
description: Component authoring, state wrappers, reducers, action descriptors, and optimistic updates.
---

# Components, State, and Actions

## State wrappers

```detian
var#state = hya.state({ count: 1, label: "Counter" });
state = hya.merge_state(state, { count: 2 });
```

## Components

```detian
var#view = hya.component("CounterCard", { state: state }, hya.element("button", {}, [
  hya.text("Counter")
]));
```

## Mount and dispatch

```detian
var#view = hya.mount("components.counter", { state: state });
var#next = hya.dispatch("actions.increment", state, { delta: 1 });
```

## Optimistic actions

```detian
hya.action("actions.increment", { delta: 1 }, { count: 2 })
```

The third argument is an optimistic client-side patch. Fine roots apply it locally before the network roundtrip, then reconcile to the authoritative server `state_value` or revert if the request fails.
