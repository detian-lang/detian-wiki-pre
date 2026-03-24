---
title: Server-first web framework
description: Build pages, routes, stateful components, actions, and fine-grained hydrated UIs.
---

# Server-first web framework

Build pages, routes, stateful components, actions, and fine-grained hydrated UIs.

## Why you would use it

Use `hya` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "hya" as hya;
```

## Source-derived surface

### `core.det` → group `core`

- `component(str#name, var#props, var#view)`
- `mount(str#handler, var#props)`
- `fine_mount(str#handler, var#props)`
- `dispatch(str#handler, var#state_value, var#payload)`

### `form.det` → group `form`

- `form(var#on_submit, var#children)`
- `text_input(str#name, var#value, str#placeholder, var#on_input)`
- `text_input_debounced(str#name, var#value, str#placeholder, var#on_input, duration#debounce)`
- `checkbox(str#name, bool#checked, str#label, var#on_change)`
- `submit_button(str#label)`

### `html.det` → group `html`

- `text(var#value)`
- `state_text(var#state_value, str#path)`
- `state_attr(var#state_value, str#name, str#path)`
- `state_class(var#state_value, str#path)`
- `state_style(var#state_value, str#path)`
- `state_when(var#state_value, str#path, var#when_true)`
- `state_when_else(var#state_value, str#path, var#when_true, var#when_false)`
- `state_each_text(var#state_value, str#items_path, str#key_path, str#text_path)`
- `state_each_text_tag(var#state_value, str#items_path, str#key_path, str#text_path, str#tag)`
- `state_each_view(var#state_value, str#items_path, str#key_path, var#views)`
- `raw(var#value)`
- `fragment(var#children)`
- `element(str#tag, var#props, var#children)`
- `page(str#title, var#body)`
- `document(str#title, var#head, var#body)`
- `style(str#css)`
- `stylesheet(str#href)`

### `response.det` → group `response`

- `html(var#value)`
- `json(var#value)`
- `text(var#value)`
- `with_header(var#response, str#name, var#value)`
- `with_cookie(var#response, str#name, str#value)`
- `redirect(str#location, int#status)`

### `server.det` → group `server`

- `get(str#path, str#handler)`
- `post(str#path, str#handler)`
- `route(str#method, str#path, str#handler)`
- `static(str#prefix, str#dir)`
- `serve(int#port, var#routes)`

### `state.det` → group `state`

- `init(var#initial)`
- `set(var#state_value, var#next)`
- `merge(var#state_value, var#patch)`
- `action(str#name, var#payload)`
- `action_optimistic(str#name, var#payload, var#optimistic)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `hya` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
