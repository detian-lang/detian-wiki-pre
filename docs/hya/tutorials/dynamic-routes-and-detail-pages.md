---
title: Dynamic Routes and Detail Pages
description: Use Hya route parameters and page handlers to build detail pages, master-detail flows, and readable server-side navigation.
---

# Dynamic Routes and Detail Pages

Static pages are enough for demos, but most real applications need URLs that identify a specific resource. Hya supports this directly with dynamic routes.

## Dynamic route syntax

Hya supports two main dynamic forms:

- `:param` for a single path segment
- `*wildcard` for the remainder of the path

Examples:

```detian
hya.get("/leads/:id", "pages.lead_detail")
hya.get("/files/*path", "pages.file_browser")
```

The dynamic parameter values are available inside the route context.

## Accessing `ctx.params`

```detian
thread#lead_detail(map#ctx) {
  return hya.text_response("lead " + ctx.params.id);
}
```

That is the entire basic pattern. The important part is what you do next: use the parameter to load data, derive a view model, and render a normal Hya page.

## Route precedence stays predictable

Hya resolves routes in this order:

1. static
2. parameterized
3. wildcard

So this works as you would hope:

```detian
hya.get("/leads/new", "pages.new_lead")
hya.get("/leads/:id", "pages.lead_detail")
```

The `new` route is not swallowed by `:id`. This predictability is a big deal in growing apps.

## A realistic detail-page pattern

Using a dataset like the one in `launchpad_crm`, a detail page often looks like this:

```detian
group#pages {
  thread#lead_detail(map#ctx) {
    var#lead = data.find_lead(data.leads(), ctx.params.id);
    if (lead == null) {
      return hya.text_response("lead not found");
    }

    var#view = hya.mount("components.lead_detail", { lead: lead });
    return hya.html(layout.shell(lead.name, [view]));
  }
}
```

That is a good Hya pattern because:

- the page handler reads route data
- data lookup happens outside the component
- the component gets plain props
- the response shape stays obvious

## Building a master-detail flow

A classic Hya app shape is:

- `/leads` → list page
- `/leads/:id` → detail page

The list page renders links or buttons, and the detail page uses `ctx.params.id` to load the selected entity. This is a great way to move from toy apps to real product structure.

## Add route metadata to your debugging habits

Hya route context also exposes:

- `ctx.route_pattern`
- `ctx.route_kind`
- `ctx.query`

These become valuable once your app has mixed static, param, and wildcard routes. They tell you not just the requested path, but how the route was matched.

## Query strings are part of the same model

You can combine params and query values naturally.

```detian
thread#lead_detail(map#ctx) {
  var#tab = ctx.query.tab;
  if (tab == null) {
    tab = "overview";
  }
  ...
}
```

This is a useful pattern for detail pages with multiple tabs or filters that still share the same base resource URL.

## Wildcards are for file-like or nested paths

A wildcard route is best for cases like:

- static content browsing
- nested documentation paths
- filesystem-like route segments
- pass-through APIs

```detian
thread#file_browser(map#ctx) {
  return hya.text_response("path " + ctx.params.path);
}
```

Remember that wildcards must be the **last** segment in the route. Hya validates this to avoid confusing route tables.

## Common detail-page layout pattern

Many apps want the detail page shell to be similar to the index page. For example:

- same navigation
- same stylesheet bundle
- same page shell
- only the content block changes

That is exactly why a shared `layout.shell(...)` helper pays off. It keeps list pages and detail pages structurally aligned without duplication.

## Good route naming habits

Prefer route handler names that mirror the URL purpose:

- `pages.lead_index`
- `pages.lead_detail`
- `pages.file_browser`
- `pages.account_settings`

That gives you cleaner diagnostics, better LSP navigation, and less cognitive friction.

## Common beginner mistakes

### Loading data inside the component instead of the page

This blurs route ownership. Let the page handler own route interpretation.

### Using wildcard when a parameter is enough

If the route is one segment, use `:id`, not `*rest`.

### Forgetting static precedence

If you want `/leads/new`, define it explicitly even if `/leads/:id` exists.

## Exercise

Extend your app with:

- `/items` → list page
- `/items/:id` → detail page
- `/items/:id?tab=history` style tab behavior using `ctx.query`

Then explain to yourself which concerns belong to:

- the route table
- the page handler
- the component

That separation is the real lesson here.

## Next step

Continue to [Static Assets and JSON Endpoints](./static-assets-and-json-endpoints.md), where we make the app feel more complete by adding CSS, browser JavaScript, and API-style routes alongside the page routes.
