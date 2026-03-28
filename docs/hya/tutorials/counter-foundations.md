---
title: Counter Foundations
description: "Learn the smallest interactive Hya app: state wrappers, mounted components, action descriptors, and server-driven updates."
---

# Counter Foundations

The smallest Hya app that still teaches the framework properly is not just a static “Hello World.” It is a counter with:

- one route
- one page handler
- one state value
- one mounted component
- one action thread

That is the first moment where Hya’s architecture becomes visible.

## The target shape

We want a button that displays a count and increments when clicked. In Hya, that means the button is rendered on the server, but its click event is described in a way that the runtime bridge can understand.

## Step 1: define the action thread

Put the reducer-like logic in a regular Detian thread:

```detian
group#actions {
  thread#increment(map#state, map#payload) {
    return {
      count: state.count + payload.delta,
      label: state.label
    };
  }
}
```

This is one of Hya’s nicest design choices: action handlers are not hidden reducer objects or framework-specific callbacks. They are just threads.

## Step 2: define the component

Use HYX first for the component surface:

```detian
group#components {
  thread#counter(map#props) {
    return hyx {
      <button class="action-btn primary" on_click={hya.action("actions.increment", { delta: 1 })}>
        {state.label}: {state.count}
      </button>
    };
  }
}
```

There are three important ideas here:

1. The component receives `props`, not magical local state.
2. `state.*` is the current state payload through HYX’s default alias.
3. `hya.action(...)` does **not** run the action immediately. It creates an action descriptor that the runtime bridge uses when the click happens.

If you need to inspect the exact helper-level lowering, the flat equivalent is still:

```detian
return hya.element("button", {
  class: "action-btn primary",
  on_click: hya.action("actions.increment", { delta: 1 })
}, [
  hya.text(props.state.value.label + ": " + str(props.state.value.count))
]);
```

## Step 3: initialize state in the page handler

```detian
group#pages {
  thread#home(map#ctx) {
    var#state = hya.state({ count: 0, label: "Counter" });
    var#view = hya.mount("components.counter", { state: state });
    return hya.html(hya.page("Counter", [view]));
  }
}
```

This is the moment where many newcomers finally “get” Hya:

- `hya.state(...)` creates a state wrapper
- `hya.mount(...)` resolves the component thread and gives it props
- the mounted component becomes part of the server-rendered page

The action bridge can later use the mounted component metadata to know how to rerender or patch the interaction result.

## Step 4: serve the route

```detian
group#web {
  thread#server {
    hya.serve(3000, [
      hya.get("/", "pages.home")
    ]);
  }
}
```

That is the same shape you learned in the previous page. Interactivity does not change the route model.

## Full example

Here is the same counter in the current HYX-first style:

```detian
load "hya" as hya;

group#actions {
  thread#increment(map#state, map#payload) {
    return {
      count: state.count + payload.delta,
      label: state.label
    };
  }
}

group#components {
  thread#counter(map#props) {
    return hyx {
      <button class="action-btn primary" on_click={hya.action("actions.increment", { delta: 1 })}>
        {state.label}: {state.count}
      </button>
    };
  }
}

group#pages {
  thread#home(map#ctx) {
    var#state = hya.state({ count: 0, label: "Counter" });
    var#view = hya.mount("components.counter", { state: state });
    return hya.html(hya.page("Counter", [view]));
  }
}

group#web {
  thread#server {
    hya.serve(3000, [
      hya.get("/", "pages.home")
    ]);
  }
}

@#main {
  @web.server;
}
```

## What actually happens on click

When the user clicks the button:

1. the browser sees `on_click` metadata emitted by Hya
2. the Hya client bridge posts to `POST /__hya/action`
3. the server resolves the mounted component and the action handler
4. the server calls `actions.increment(state, payload)`
5. the new state is used to rerender or patch the component
6. the client updates the page

That is the entire Hya action story in miniature.

## Why this model is nice

Compared with many client-heavy frameworks, this approach keeps the state transition legible:

- state shape is plain data
- actions are plain Detian threads
- routing stays explicit
- HTML is always available as the baseline

That makes testing and debugging simpler than in frameworks that hide more work behind client-side lifecycle systems.

## A note on `hya.dispatch(...)`

You may also see code like this:

```detian
var#next = hya.dispatch("actions.increment", state, { delta: 1 });
```

That is useful when you want to compute a next state directly on the server without going through an interaction cycle. It is especially helpful for seeding examples, preparing derived views, or writing deterministic tests.

For user interactions, though, `hya.action(...)` is the more important concept because it feeds the runtime bridge.

## Flat API versus nested API

Older examples may use:

```detian
hya.state.init(...)
hya.core.mount(...)
hya.response.html(...)
```

The tutorial prefers the flat equivalents:

```detian
hya.state(...)
hya.mount(...)
hya.html(...)
```

They map to the same underlying pieces, but the flat surface is easier to teach.

Historically that was true. The current direction is to **teach HYX first** for ordinary component/page authoring, and keep the flat API around as the explicit escape hatch when you need to reason about exact lowering behavior.

## Common beginner mistakes

### Returning plain state instead of the full state object

Wrong:

```detian
var#view = hya.mount("components.counter", { state: state.value });
```

Correct:

```detian
var#view = hya.mount("components.counter", { state: state });
```

Components expect the Hya state wrapper, not just the raw value.

### Forgetting to keep unrelated fields in the action

If your state has `count` and `label`, and the action only returns `count`, you may accidentally drop `label`. Be explicit.

### Treating `hya.action(...)` as immediate execution

It is only a descriptor. The server executes the action later when the event reaches the bridge.

## Exercises that are worth doing

Before moving on, try each of these:

1. add a decrement button with `{ delta: -1 }`
2. change the label from `Counter` to `Clicks`
3. add a reset action that returns `{ count: 0, label: state.label }`
4. use `hya.dispatch(...)` in the page handler to seed the initial state from a fake action

If you can do those comfortably, you are ready for a larger page structure.

## Next step

Continue to [Pages, Routes, and Layout](./pages-routes-and-layout.md), where we grow the one-route counter into a multi-page app with shared shell structure and dynamic route context.
