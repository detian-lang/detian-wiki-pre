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
- request body material such as `ctx.json`
