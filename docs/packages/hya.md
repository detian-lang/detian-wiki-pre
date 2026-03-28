---
title: Server-first web framework
description: Build pages, routes, stateful components, actions, and fine-grained hydrated UIs.
---

# Server-first web framework

Build pages, routes, stateful components, actions, and fine-grained hydrated UIs.

`hya.state.patch(...)` is available as a small write-side helper for action threads that want to return only changed fields and let `hya.dispatch(...)` merge them back into the current state.

Nested map/record patches are merged recursively, so a payload like `{ user: { busy: false } }` keeps sibling fields such as `user.name` intact.

Fine action responses now also record an `implicit_patch_candidate` diagnostic when an action returns a full state object but only changes a small number of paths. That gives the write-side implicit-state roadmap a concrete breadcrumb before automatic patch synthesis exists.

Those responses now also expose a `state_patch` field: explicit patches are returned verbatim, while sparse full-state returns get a synthesized patch diff for tooling and future runtime work.

The client fine runtime now uses `state_patch` to narrow which binding signals are refreshed after patch responses, which is the first small step toward a real hidden-cell runtime model.

Those responses also include `state_patch_paths`, and the fine client runtime now prefers those explicit paths when refreshing signals.

Fine action responses now also include `state_patch_ops` as a richer backward-compatible transport contract. The current slice emits:

- exact `set` ops for paths that can be resolved precisely (for example `user.busy`, `items.0`, `items.1.score`)
- structural list ops (`insert`, `remove`, `replace`, `splice`) for slice-style updates
- reorder-aware list ops (`reorder`) when a slice keeps the same keyed items but changes their order
- exact `set` ops for structured matrix/tensor assignments when a mixed index+slice update still resolves to exact logical cells

while preserving `state_patch` and `state_patch_paths`.

The client runtime also tracks versioned path cells internally, and `window.__hyaFine.inspect(...)` / `inspectAll()` now expose a `cells` snapshot for debugging path-level invalidation.

Those inspection hooks now also expose a `dependencies` snapshot so you can see which fine render bindings currently subscribe to which path cells. Patch logs also record `refreshed_cells`, the dependency snapshot, and the current cell versions after targeted reconciliation.

Optimistic patches and reverts now use that same path-aware invalidation metadata too, so rollback paths can stay narrow instead of refreshing unrelated bindings.

Exact patch leaf values are now bridged into the client path-cell runtime directly. When a patch carries an exact leaf such as `count` or `items.1.score`, the runtime can refresh that cell from the patch payload itself instead of re-reading the whole state tree for that path.

When `state_patch_ops` is present, the fine client runtime prefers those exact ops first and only falls back to `state_patch` / state reads for the remaining indirectly affected paths.

Structural list ops also carry `state_patch_regions` so tooling and the client runtime can keep track of which list region changed, not just which leaf paths were touched.

Structured matrix/tensor updates now keep exact touched cell paths too (for example `matrix.1.0`, `matrix.1.1`, `tensor.0.1`, `tensor.1.1`), which lets the client runtime avoid over-invalidating unrelated rows or axes when exact scope is known.

The fine devtools surface now also exposes a small `cell_model` contract that documents the current hidden runtime (`path-cell`, versioned, path-aware, exact-patch bridge, explicit-state compatible). Patch logs distinguish `exact_patch_cells` from `fallback_cells`, so opaque or indirectly affected bindings still have an explicit fallback path you can inspect.

For fixed-length slice replacements, those paths are now more precise (for example `items.0`, `items.1` instead of just `items`). Exact multi-index updates keep exact paths such as `matrix.1.0`.

Simple field-path increment/decrement is also supported now (`state.count++`, `state.user.score--`), which makes returned-state action threads more ergonomic on the way to real implicit write lowering.

Simple local alias write-backs are handled too: `int#count = state.count; count++; return state;` is now rewritten into patch-friendly behavior instead of losing the update.

Alias-root field/index mutations follow the same rule, so updates like `user.busy = false; return state;` or `items[1] = {...}; return state;` also synthesize patch-friendly behavior.

Indexed numeric mutation is supported too, including patterns like `state.items[1].score++` in action threads.

Nested alias write-backs are included too: patterns like `bool#busy = user.busy; busy = false; return state;` now survive into patch-friendly behavior instead of losing the update.

Alias-of-alias chains work too, for example `var#next = user; next.busy = false; return state;` when the chain still resolves back to a simple `state.*` path.

Reassigned locals are covered too: `var#user = null; user = state.user; user.busy = false; return state;` now keeps the same patch-friendly behavior.

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
- `error_text(var#message)`
- `field_error(var#state_value, str#name)`
- `form_error(var#state_value)`

### `request.det` → group `request`

- `header(var#ctx, str#name)`
- `query(var#ctx, str#name)`
- `param(var#ctx, str#name)`
- `cookie(var#ctx, str#name)`
- `json_field(var#ctx, str#name)`
- `body_text(var#ctx)`
- `method(var#ctx)`
- `path(var#ctx)`
- `route_info(var#ctx)`

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

Current implicit-state MVP work is diagnostics-first. Plain HYX expressions such as `{count}`, `if (busy) { ... }`, `class={variant}`, `style={accent}`, and `disabled={busy}` are still legacy fallbacks today, but they now surface explicit fine-diagnostics reasons (`implicit_state_text_candidate`, `implicit_state_if_candidate`, `implicit_state_class_candidate`, `implicit_state_style_candidate`, `implicit_state_attr_candidate`) so future automatic lowering has a stable breadcrumb.

There is now one real automatic lowering path on top of those diagnostics: if a thread/component binds a simple local directly from `props.state.value.*` before the `hyx { ... }` block, HYX can reuse that alias for simple text and conditional lowering.

That same narrow path now supports a state-root alias such as `var#state = props.state.value;`, which lets expressions like `{state.count}`, `if (state.busy)`, `class={state.variant}`, and `style={state.accent}` reuse the existing fine-grained lowering helpers.

The same state-root alias can also drive keyed collection lowering. For example, `for item in state.items { <li key={item.id}>{item.name}</li> }` can still lower to the fine-grained keyed list helpers instead of falling back.

That same path also covers indexed keyed rows (`for item, idx in state.items { ... }`) and keyed component rows (`<MetricCard key={item.id} ... />`) as long as the state-root alias is still the simple `props.state.value` form.

Nested alias chains are also supported inside the same narrow model. For example, `var#user = state.user;` can still feed `{user.name}`, `if (user.busy)`, `class={user.variant}`, and `for item in user.items { ... }` because the alias still resolves back to a simple `props.state.value.*` path.

HYX-local `let` aliases use the same scope machinery. In practice that means `let state = props.state.value; let user = state.user;` inside a `hyx { ... }` block can still drive the same implicit text/conditional/attribute/keyed-loop lowering path.

A plain state-holder alias works too: `var#state = props.state;` or `let state = props.state;` can still lower once the actual render expressions continue through `state.value.*`.

### `response.det` → group `response`

- `html(var#value)`
- `json(var#value)`
- `text(var#value)`
- `with_header(var#response, str#name, var#value)`
- `with_cookie(var#response, str#name, str#value)`
- `with_cookie_options(var#response, str#name, str#value, var#options)`
- `redirect(str#location, int#status)`
- `see_other(str#location)`
- `bad_request(str#message)`
- `unauthorized(str#message)`
- `forbidden(str#message)`
- `not_found(str#message)`

### `flash.det` → group `flash`

- `level(str#value)`
- `info(str#text)`
- `success(str#text)`
- `warning(str#text)`
- `error(str#text)`
- `options(int#ttl_ms)`
- `set(var#response, str#name, str#message, int#ttl_ms)`
- `set_value(var#response, str#name, var#value, int#ttl_ms)`
- `clear(var#response, str#name)`
- `message(var#ctx, str#name)`
- `value(var#ctx, str#name)`
- `consume(var#response, var#ctx, str#name)`
- `see_other(str#location, str#name, str#message, int#ttl_ms)`
- `see_other_value(str#location, str#name, var#value, int#ttl_ms)`
- `message_record(str#level, str#text)`

### `server.det` → group `server`

- `get(str#path, str#handler)`
- `post(str#path, str#handler)`
- `route(str#method, str#path, str#handler)`
- `static(str#prefix, str#dir)`
- `with_middleware(var#route, var#middleware)`
- `serve(int#port, var#routes)`

### `middleware.det` → group `middleware`

- `with_auth(var#ctx, str#subject, var#payload)`
- `with_auth_payload(var#ctx, var#payload)`
- `auth_subject(var#ctx)`
- `auth_payload(var#ctx)`
- `with_local(var#ctx, str#name, var#value)`
- `local(var#ctx, str#name)`

### `state.det` → group `state`

- `init(var#initial)`
- `set(var#state_value, var#next)`
- `merge(var#state_value, var#patch)`
- `patch(var#patch)`
- `action(str#name, var#payload)`
- `action_optimistic(str#name, var#payload, var#optimistic)`

### `validation.det` → group `validation`

- `level(str#value)`
- `field(str#name, str#message)`
- `error_issue(str#name, str#message, var#code)`
- `warning_issue(str#name, str#message, var#code)`
- `info_issue(str#name, str#message, var#code)`
- `issue(str#name, str#message, var#code, str#level)`
- `errors(var#entries)`
- `issues(var#entries)`
- `clear(var#state_value)`
- `invalid(var#state_value, var#field_errors, var#form_error)`
- `invalid_with_details(var#state_value, var#field_errors, var#details, var#form_error)`
- `message(var#state_value, str#name)`
- `issue_list(var#state_value, str#name)`
- `first_issue(var#state_value, str#name)`
- `form_message(var#state_value)`
- `has_errors(var#state_value)`

### `form_state.det` → group `form_state`

- `init(var#state_value)`
- `mark_touched(var#state_value, str#name)`
- `mark_dirty(var#state_value, str#name)`
- `set_submitting(var#state_value, bool#value)`
- `is_touched(var#state_value, str#name)`
- `is_dirty(var#state_value, str#name)`
- `is_submitting(var#state_value)`

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
