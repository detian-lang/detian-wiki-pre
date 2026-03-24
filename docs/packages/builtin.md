---
title: Builtin aliases
description: Expose generic runtime surfaces such as server, html, and reactive helpers through package-style imports.
---

# Builtin aliases

Expose generic runtime surfaces such as server, html, and reactive helpers through package-style imports.

## Why you would use it

Use `builtin` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "builtin" as builtin;
```

## Source-derived surface

### `html.det` → group `html`

- `text(var#value)`
- `raw(var#value)`
- `fragment(var#children)`
- `element(str#tag, var#props, var#children)`
- `render(var#node)`
- `page(str#title, var#body)`
- `document(str#title, var#head, var#body)`
- `style(str#css)`
- `stylesheet(str#href)`

### `reactive.det` → group `reactive`

- `state(var#initial)`
- `set_state(var#state_value, var#next)`
- `merge_state(var#state_value, var#patch)`
- `action(str#name, var#payload)`
- `component(str#name, var#props, var#view)`
- `mount(str#handler, var#props)`
- `dispatch(str#handler, var#state_value, var#payload)`
- `when(bool#cond, var#then_value, var#else_value)`
- `each(var#items, str#var_name, str#expr_src)`

### `server.det` → group `server`

- `get(str#path, str#handler)`
- `post(str#path, str#handler)`
- `route(str#method, str#path, str#handler)`
- `static(str#prefix, str#dir)`
- `html(var#value)`
- `json(var#value)`
- `text(var#value)`
- `redirect(str#location, int#status)`
- `serve(int#port, var#routes)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `builtin` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
