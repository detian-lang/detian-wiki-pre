---
title: Pages, Routes, and Layout
description: Grow a Hya app from one route into a multi-page structure with shared page shells and explicit route context.
---

# Pages, Routes, and Layout

Once the counter works, the next step is to stop thinking of Hya as “a button demo” and start treating it like a real web app. That means:

- multiple routes
- multiple page handlers
- a shared shell
- explicit route parameters
- clear separation between page composition and smaller components

## A simple route table

Start with a `pages` group:

```detian
group#pages {
  thread#home(map#ctx) { ... }
  thread#about(map#ctx) { ... }
  thread#health(map#ctx) { ... }
}
```

And pair it with a route table:

```detian
hya.get("/", "pages.home")
hya.get("/about", "pages.about")
hya.get("/health", "pages.health")
```

That explicit mapping is one of Hya’s strongest qualities. You can scan one place and understand the public surface of the app.

## Build a shared shell early

Even in small apps, shared page framing pays off quickly. Put it in a helper group or in the `pages` group itself.

```detian
group#layout {
  thread#shell(str#title, var#body) {
    var#head = [
      hya.stylesheet("/assets/app.css")
    ];

    return hya.document(title, head, [
      hya.element("main", { class: "page-shell" }, body)
    ]);
  }
}
```

Then page handlers become cleaner:

```detian
thread#home(map#ctx) {
  return hya.html(layout.shell("Home", [
    hya.element("h1", {}, [hya.text("Dashboard")])
  ]));
}
```

This keeps the shell stable while letting each page focus on page-specific content.

## Dynamic routes are first-class

Hya now supports dynamic routes with `:param` segments and `*wildcard` tails.

```detian
hya.get("/users/:id", "pages.user")
hya.get("/files/*path", "pages.file")
```

Inside the handler, you can read:

```detian
thread#user(map#ctx) {
  return hya.text_response("user " + ctx.params.id);
}
```

The route context also includes:

- `ctx.query`
- `ctx.route_pattern`
- `ctx.route_kind`
- `ctx.method`
- `ctx.path`

That means page handlers can stay small while still having the information they need.

## Route precedence matters

Hya resolves routes with this precedence:

1. static
2. parameterized
3. wildcard

So this:

```detian
hya.get("/users/me", "pages.me")
hya.get("/users/:id", "pages.user")
```

will correctly resolve `/users/me` to the static route. That is an important property for app growth because it makes route tables predictable.

## Page handlers should prepare data, not do everything

A good Hya page handler usually does four jobs:

1. gather input from `ctx`
2. load or derive data
3. mount the component tree
4. wrap it in a response

For example:

```detian
thread#lead_detail(map#ctx) {
  var#lead = data.find_lead(data.leads(), ctx.params.id);
  if (lead == null) {
    return hya.text_response("not found");
  }

  var#view = hya.mount("components.lead_detail", { lead: lead });
  return hya.html(layout.shell(lead.name, [view]));
}
```

That is cleaner than letting the component itself perform route parsing or deep data lookup.

## A realistic shell pattern

A small Hya app often grows into this structure:

```detian
group#layout { ... }
group#components { ... }
group#actions { ... }
group#data { ... }
group#pages { ... }
group#api { ... }
group#web { ... }
```

This looks more “backend-shaped” than the structure many client-first frameworks encourage, and that is okay. Hya wants routes, responses, assets, and page rendering to coexist in one coherent server-first application.

## When to return HTML versus text or JSON

Not every route should return `hya.html(...)`.

Examples:

```detian
thread#health(map#ctx) {
  return hya.text_response("ok");
}

thread#summary(map#ctx) {
  return hya.json_response({ ok: true, total: 5 });
}
```

This is helpful to remember because a Hya app often contains both page routes and API routes. You do not need two frameworks for that.

## Layout tips that scale well

### Keep the shell small

Let the shell manage:

- page title
- shared stylesheets/scripts
- main outer container
- top-level navigation

Do not overload it with every possible piece of business UI. That belongs to page-level or component-level code.

### Keep route strings close to page names

If the route is `"/leads/:id"`, a handler like `pages.lead_detail` is easier to maintain than something vague.

### Prefer page handlers over giant route-side lambdas

Hya wants handlers to be normal named threads because that helps diagnostics, reuse, testing, and LSP navigation.

## Common beginner mistakes

### Putting all UI inside the page handler

This works for a tiny demo, but it becomes painful quickly. Move reusable chunks into `components` early.

### Hiding data loading inside a component

Hya is easier to reason about when page handlers gather the data and components render it.

### Repeating the page shell everywhere

Create a shell thread once. Your future self will thank you.

## Good exercise

Take the counter app and add:

- `/` → dashboard
- `/about` → about page
- `/health` → plain text health route
- `/users/:id` → dynamic detail route using `ctx.params.id`

Then refactor the repeated title and stylesheet logic into a `layout.shell(...)` helper.

If that feels natural, you are ready to break rendering into smaller component threads.

## Next step

Continue to [Components and Composition](./components-and-composition.md), where we decide what belongs in a page, what belongs in a component, and when HYX becomes the better authoring surface.
