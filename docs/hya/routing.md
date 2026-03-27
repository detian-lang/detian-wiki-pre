---
title: Routing
description: Static routes, dynamic params, wildcards, and request context in Hya.
---

# Routing

Hya supports static and dynamic route patterns.

## Static routes

```detian
hya.get("/", "pages.home")
hya.post("/echo", "pages.echo")
```

## Dynamic routes

```detian
hya.get("/users/:id", "pages.user")
hya.get("/files/*path", "pages.file")
```

## Precedence

Route precedence is:

1. static
2. param
3. wildcard

## Request context

Route handlers receive a `ctx` record containing:

- `ctx.method`
- `ctx.path`
- `ctx.route_pattern`
- `ctx.route_kind`
- `ctx.params`
- `ctx.query`
- `ctx.cookies`
- request body material such as `ctx.json`

## Request helper surface

Hya now also exposes a small request helper layer:

- `hya.request.header(ctx, name)`
- `hya.request.query(ctx, name)`
- `hya.request.param(ctx, name)`
- `hya.request.cookie(ctx, name)`
- `hya.request.json_field(ctx, name)`
- `hya.request.body_text(ctx)`
- `hya.request.method(ctx)`
- `hya.request.path(ctx)`
- `hya.request.route_info(ctx)`

These are convenience helpers around the existing `ctx` shape. They make common route code more uniform and reduce repeated `get(...)` plumbing.

## Route middleware first slice

Hya now supports a first route middleware slice:

```detian
hya.with_middleware(
  hya.get("/private", "pages.private"),
  "middleware.require_auth"
)
```

Current contract:

- middleware receives the current `ctx`
- if it returns a map/record, that becomes the next `ctx`
- if it returns a `HyaResponse`, the route short-circuits immediately

This is enough for auth guards, request enrichment, and redirect-before-handler flows.

## Middleware context conventions

Hya now also exposes a tiny convention layer for common middleware enrichment:

- `hya.middleware.with_auth(ctx, subject, payload)`
- `hya.middleware.with_auth_payload(ctx, payload)`
- `hya.middleware.auth_subject(ctx)`
- `hya.middleware.auth_payload(ctx)`
- `hya.middleware.with_local(ctx, key, value)`
- `hya.middleware.local(ctx, key)`

This keeps `ctx.auth` and `ctx.locals` predictable without requiring a rigid middleware type system.

## Small response ergonomic helper

There is now also a first tiny response convenience:

```detian
hya.not_found("missing:/users/42")
```

That returns a text response with status `404`.

Related small helpers now available:

- `hya.bad_request(...)` → `400`
- `hya.unauthorized(...)` → `401`
- `hya.forbidden(...)` → `403`
- `hya.see_other(...)` → `303`

## Cookie option ergonomics

`hya.with_cookie(...)` now supports an options record. That makes it easier to express secure/session-oriented cookie policy without hand-building a `Set-Cookie` string.

First-slice option fields:

- `path`
- `http_only`
- `secure`
- `same_site`
- `domain`
- `max_age_ms`
