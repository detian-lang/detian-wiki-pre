---
title: Static Assets and JSON Endpoints
description: Serve CSS and JavaScript, add JSON routes, and shape a Hya app as a complete server-first product.
---

# Static Assets and JSON Endpoints

A Hya app becomes much more useful once it stops being only a page renderer. Real apps usually need:

- stylesheets
- client-side helper scripts
- JSON endpoints
- health or status routes

The nice part is that Hya already gives you all of this without forcing you into a separate framework.

## Serving static assets

The static asset surface is straightforward:

```detian
hya.static("/assets", "public")
```

or, as many repo examples do:

```detian
hya.static("/assets", "examples/hya_greeter_service/public")
```

That maps a URL prefix to a directory. It is simple, readable, and easy to keep close to the route table.

## Add a stylesheet to the page

You can build the head with helpers:

```detian
var#head = [
  hya.stylesheet("/assets/app.css")
];

return hya.html(hya.document("Greeting Service", head, [body]));
```

This is the cleanest pattern for most Hya apps because it keeps head construction explicit and lets page handlers stay in control of what assets they use.

## Add a helper script

You can also add JavaScript for enhancement:

```detian
var#head = [
  hya.stylesheet("/assets/app.css"),
  hya.element("script", { src: "/assets/app.js" }, [])
];
```

The `launchpad_crm` example uses this pattern to attach API demo behavior. Hya does not try to hide the fact that a browser script is just another asset.

## JSON endpoints live beside page routes

A Hya app can mix page routes and JSON routes naturally.

Example pattern:

```detian
group#api {
  thread#summary(map#ctx) {
    return hya.json_response(data.summary(data.leads()));
  }
}
```

and then register:

```detian
hya.get("/api/summary", "api.summary")
```

This is one of Hya’s strengths: the same application can serve HTML pages and API responses without splitting into separate mental models.

## Health routes are worth adding early

A tiny text route like this helps local development and deployment checks:

```detian
thread#health(map#ctx) {
  return hya.text_response("ok");
}
```

Add it to the route table:

```detian
hya.get("/health", "pages.health")
```

That gives you a cheap but useful smoke check.

## A realistic route table

Once the app matures, a route table may look like this:

```detian
hya.serve(port, [
  hya.static("/assets", "examples/launchpad_crm/public"),
  hya.get("/", "pages.home"),
  hya.get("/leads/:id", "pages.lead_detail"),
  hya.get("/api/summary", "api.summary"),
  hya.get("/api/leads", "api.leads"),
  hya.get("/health", "pages.health")
]);
```

That reads like a complete app surface, not a toy demo.

## Response helpers to remember

The key response forms are:

- `hya.html(...)`
- `hya.json_response(...)`
- `hya.text_response(...)`
- `hya.redirect(...)`
- `hya.with_header(...)`
- `hya.with_cookie(...)`

You do not need all of them every day, but it helps to know that they live in one consistent Hya response model.

## Why this matters for learning

A lot of people first encounter UI frameworks through purely client-side examples. That can leave them unprepared for the real shape of web products. Hya’s server-first model teaches something healthier:

- pages
- data endpoints
- assets
- forms
- actions
- health checks

all belong to the same application.

## Suggested app structure

A very workable layout is:

```text
src/main.det
public/app.css
public/app.js
```

Then keep your route declarations explicit inside `src/main.det` until the app is large enough to justify more modular splitting.

## Common beginner mistakes

### Forgetting to mount the assets directory

If the stylesheet link is present but the file 404s, check `hya.static(...)` first.

### Mixing API concerns into page handlers

If a route is truly a JSON endpoint, let it be a JSON endpoint. Do not force everything through HTML pages.

### Hiding route registration inside too many abstractions

Keep the route table easy to scan. It is operationally valuable.

## Exercise

Take your app and add:

- `/assets/app.css`
- `/health`
- `/api/summary`

Then create one browser script that fetches `/api/summary` and renders the JSON into a `<pre>` block. That will teach you how Hya pages and API endpoints can cooperate without losing clarity.

## Next step

Continue to [Fine-Grained Rendering](./fine-grained-rendering.md), where we move from full server rerendering toward selective binding updates while keeping the same server-first authoring model.
