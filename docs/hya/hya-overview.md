---
title: Hya Overview
description: The Detian server-first UI and web framework.
---

# Hya Overview

Hya is Detian’s **server-first UI and web framework**. It is not a separate language or runtime. It is a framework layer that sits on top of Detian’s execution model.

## Learn Hya by building

If you want the most practical path, start with the [Hya Tutorial Series](./tutorials/overview.md). It is a multi-page walkthrough that grows from a one-route page into a realistic server-first app with forms, dynamic routes, fine-grained rendering, optimistic actions, and debugging workflow.

## Core Hya surface

- `hya.element`, `hya.text`, `hya.fragment`, `hya.page`
- `hya.html`, `hya.json`, `hya.text_response`, `hya.redirect`
- `hya.get`, `hya.post`, `hya.route`, `hya.static`, `hya.serve`
- `hya.state`, `hya.set_state`, `hya.merge_state`, `hya.action`
- `hya.component`, `hya.mount`, `hya.mount_fine`, `hya.dispatch`

## What Hya is optimized for

- local internal tools
- server-first dashboards
- route/action/component flows that stay explicit
- apps where SSR is the default starting point
- fine-grained hydration as an incremental improvement, not a rewrite of the mental model

## Why Hya fits Detian well

Hya works well in Detian because the language already has explicit execution structure. That makes request handling, actions, server tasks, background work, traces, and UI updates feel like parts of one model rather than disconnected layers.

## Major Hya topics

- routing
- state and action reducers
- HYX authoring
- fine-grained reactivity
- optimistic fine actions
- hot reload and dev workflow
- diagnostics and devtools

## Current fine-grained scope

Today Hya's fine-grained path is opt-in through `hya.mount_fine(...)`, and it already covers:

- text bindings
- attr / class / style bindings
- conditional branch bindings
- keyed text lists through `hya.state_each_text(...)`
- keyed HTML fragment rows through `hya.state_each_view(...)`
- action patch responses and the first optimistic-patch slice
- browser-side devtools hooks through `window.__hyaFine.*`

That means Hya is already beyond "SSR plus full rerender only" for a meaningful safe subset.

## HYX and fine-grained lowering today

HYX is now the preferred authoring surface for most Hya page/component code, and it already lowers several safe state-driven patterns automatically:

- `{state.count}` → `hya.state_text(...)`
- `class={state.variant}` / `style={state.accent}` / `disabled={state.busy}`
- `if (state.busy) { ... } else { ... }` → `hya.state_when(...)`
- keyed loops such as:
  - `for item in state.items { <li key={item.id}>{item.name}</li> }`
  - `for item in state.items { <MetricCard key={item.id} metric={item} /> }`
  - `for item, idx in state.items { <li key={item.id}>{item.name + "-" + str(idx)}</li> }`

When HYX cannot stay on the fine path, Hya records a fallback reason in `data-hya-fine-diagnostics`, for example:

- `complex_state_text_expr`
- `complex_state_attr_expr`
- `state_each_requires_keyed_root`

Those diagnostics now also include `hint`, so you get an explicit suggestion for what to change when a component stays on the legacy path.

## Dev loop today

Hya now has a minimal hot-reload loop through:

```bash
detian dev examples/hya_server.det
```

Current behavior:

- the CLI watches source and asset files
- the child Detian process restarts
- `hya.page(...)` injects a small dev reload script
- the browser polls `GET /__hya/dev/version`
- version changes trigger a full page reload

So this is **full-page hot reload, not HMR**.

The terminal also shows the listening URL, route list, and action endpoint so a Hya server does not start silently.

## Good next pages

- [Components, State, and Actions](./components-state-actions)
- [Routing](./routing)
- [HYX Guide](./hyx-guide)
- [Fine-Grained Reactivity](./fine-grained-reactivity)
