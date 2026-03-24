---
title: Build a Small Hya App
description: A practical guide to building a small server-first Hya application in Detian.
---

# Build a Small Hya App

This guide walks through the mental structure of a small Hya app.

## Step 1: page handler

```detian
group#pages {
  thread#home(map#ctx) {
    return hya.html(hya.page("Counter", [
      hya.element("main", {}, [
        hya.element("h1", {}, [hya.text("Counter")])
      ])
    ]));
  }
}
```

## Step 2: route it

```detian
group#web {
  thread#server {
    hya.serve(3000, [
      hya.get("/", "pages.home")
    ]);
  }
}
```

## Step 3: add state and actions

```detian
group#components {
  thread#counter(map#props) {
    return hya.element("button", {
      on_click: hya.action("actions.increment", { delta: 1 })
    }, [
      hya.text("Count: " + str(props.state.value.count))
    ]);
  }
}

group#actions {
  thread#increment(map#state, map#payload) {
    return { count: state.count + payload.delta };
  }
}
```

## Step 4: mount the component

```detian
group#pages {
  thread#home(map#ctx) {
    var#state = hya.state({ count: 1 });
    var#view = hya.mount("components.counter", { state: state });
    return hya.html(hya.page("Counter", [view]));
  }
}
```

## Step 5: introduce HYX if the tree grows

HYX makes larger component trees easier to read, while still lowering into Hya.

## Step 6: decide whether you need fine-grained rendering

If you do, switch to `hya.mount_fine(...)` and let HYX/state-path safe lowering do the rest where possible.

## Common architecture pattern

A small Hya app often ends up with these groups:

- `pages`
- `components`
- `actions`
- `api` or `queries`
- `web`

That separation works well because it mirrors request entry, view composition, state transitions, and server wiring.
