---
title: Hya Routing with Params and Wildcards
description: Use static, param, and wildcard routes in one Hya app.
---

# Hya Routing with Params and Wildcards

Hya now supports both param routes and wildcard routes.

## Example route table

```detian
hya.get("/users/me", "pages.me")
hya.get("/users/:id", "pages.user")
hya.get("/files/*path", "pages.file")
```

## Why the order still matters

Hya precedence is:

1. static
2. param
3. wildcard

So `/users/me` should still resolve to the static route, not to `:id = "me"`.

## Handler context

```detian
thread#user(map#ctx) {
  return hya.json({
    route_kind: ctx.route_kind,
    route_pattern: ctx.route_pattern,
    id: ctx.params.id,
    tab: ctx.query.tab
  });
}
```

## Common use cases

- detail pages with `:id`
- nested resources like `/orgs/:org_id/leads/:lead_id`
- asset-like or content-like paths with `*path`
