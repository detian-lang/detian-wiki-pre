---
title: Hya Counter App
description: Build a small server-first Hya counter with actions, state, and optional fine rendering.
---

# Hya Counter App

This cookbook shows the smallest realistic Hya app that still teaches the real architecture.

## Goal

We want:

- one route
- one component
- one action reducer
- one page render

## 1. Reducer

```detian
group#actions {
  thread#increment(map#state, map#payload) {
    return { count: state.count + payload.delta };
  }
}
```

## 2. Component

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
```

## 3. Page handler

```detian
group#pages {
  thread#home(map#ctx) {
    var#state = hya.state({ count: 1 });
    var#view = hya.mount("components.counter", { state: state });
    return hya.html(hya.page("Counter", [view]));
  }
}
```

## 4. Server

```detian
group#web {
  thread#server {
    hya.serve(3000, [
      hya.get("/", "pages.home")
    ]);
  }
}
```

## 5. Fine-grained variant

If the component qualifies, swap:

```detian
var#view = hya.mount_fine("components.counter", { state: state });
```

Then use helper-style or safe HYX state-path bindings.

## What to learn from this recipe

- Hya apps tend to separate `pages`, `components`, `actions`, and `web`
- state is wrapped explicitly
- action reducers remain ordinary Detian threads
- the SSR-first model still leaves room for fine-grained patching later
