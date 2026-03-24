---
title: "Capstone: LaunchPad CRM Walkthrough"
description: Read the LaunchPad CRM example as a full Hya application and connect routing, data helpers, UI composition, and server-first behavior.
---

# Capstone: LaunchPad CRM Walkthrough

The earlier pages in this series teach Hya in small slices. This page ties those ideas together by walking through the `examples/launchpad_crm` app in the Detian repository.

You do **not** need to understand every line of the example to benefit from it. The goal is to see how the pieces we have learned—routes, pages, components, state, helpers, assets, and API routes—compose into a bigger application.

## What the app demonstrates

LaunchPad CRM is a strong teaching example because it includes all of these in one place:

- server-rendered dashboard UI
- CSS and browser-side helper JavaScript
- list and detail routes
- dynamic route parameters
- JSON API endpoints
- health check route
- application data helpers
- presentation helpers for badges, classes, and visibility logic

That makes it an excellent “whole app” reference.

## Start with the high-level groups

The example is organized into groups such as:

- `data`
- `logic`
- `pages`
- `api`
- `web`

This is a very Hya-shaped layout. It keeps concerns readable:

- `data` provides records and summaries
- `logic` provides derived formatting and filtering helpers
- `pages` builds HTML responses
- `api` returns JSON responses
- `web` exposes the route table and static assets

If you remember nothing else from this page, remember that this grouping pattern scales well.

## The data group is deliberately boring

The `data` group returns lists, summaries, and metric cards. That is a feature, not a flaw. The example is teaching an important lesson:

> Keep business data preparation separate from rendering.

For instance, `data.summary(leads)` computes totals and pipeline metrics. That keeps the page and component layers focused on presentation rather than turning them into ad hoc analytics engines.

## The logic group owns presentation decisions

The `logic` group contains helpers like:

- badge class selectors
- filter matching
- focus-mode logic
- scoring bands

This is another pattern worth copying. Even when the logic is “just UI logic,” keeping it in helper threads makes page and component code calmer.

Examples like `logic.risk_badge_class(risk)` or `logic.lead_visible(...)` read much better than burying those decisions in giant HYX conditionals.

## Read the app from the route table backward

When you first open a bigger Hya app, start from `web.server` and the route declarations.

You will typically see something like:

```detian
hya.static("/assets", "examples/launchpad_crm/public")
hya.get("/", "pages.home")
hya.get("/leads/:id", "pages.lead_detail")
hya.get("/api/summary", "api.summary")
hya.get("/api/leads", "api.leads")
hya.get("/health", "pages.health")
```

That single block tells you the public surface of the app. From there you can navigate to the page and API handlers with much more confidence.

## Notice the mix of page and API routes

This is one of the best parts of the example. The app does not split into a separate “frontend” and “backend” mental model. Hya serves:

- HTML pages
- JSON API endpoints
- static assets
- health routes

from one coherent application. That makes the architecture easier to explain and often easier to deploy.

## The dashboard page shape

A dashboard-style page handler generally does three jobs:

1. gather data into an overview model
2. mount or compose visible sections
3. wrap everything in a shared layout shell

In LaunchPad CRM, the app builds summary metrics, visible lead sets, and activity feed slices before the rendering layer assembles them. That is exactly the kind of server-first structure Hya wants.

## The example teaches route-driven detail pages too

The detail view uses a route like:

```detian
hya.get("/leads/:id", "pages.lead_detail")
```

That reinforces a good Hya habit: the page handler, not the component, owns route interpretation. It receives `ctx.params.id`, finds the relevant lead, and passes clean props into the detail component.

## CSS and JavaScript are intentionally ordinary

LaunchPad CRM has:

- `public/app.css`
- `public/app.js`

This is worth calling out because it shows how Hya keeps the basics plain. You are not required to adopt a huge asset pipeline just to style a page or add a small enhancement script.

The JavaScript file adds API demo behavior. That is exactly the kind of “just enough enhancement” that fits Hya well.

## What to copy from this example

If you are building your own Hya product, these patterns are strong defaults:

### 1. Keep route registration explicit

Do not hide it.

### 2. Separate data shaping from rendering

Your pages and components stay cleaner.

### 3. Extract UI-specific logic helpers

This reduces noisy conditional logic inside templates.

### 4. Serve assets and APIs from the same application

That fits Hya’s strengths.

### 5. Keep the page shell stable

A consistent shell makes the whole app easier to reason about.

## What not to copy blindly

Every example contains tradeoffs. In a real production app, you may eventually want:

- stronger module separation
- more tests around route handlers and data helpers
- more persistent data sources
- auth and metrics integration
- more explicit error pages

That is normal. The example is a teaching reference, not a finished commercial product template.

## A useful reading strategy

When you study `launchpad_crm`, read it in this order:

1. `README.md`
2. route table
3. `data` group
4. `logic` group
5. page handlers
6. assets (`app.css`, `app.js`)
7. smaller rendering helpers

This order mirrors how the app actually thinks.

## Connecting the capstone back to the series

By this point, you should be able to identify where each tutorial topic appears:

- [Project Setup and First Route](./project-setup-and-first-route.md) → the server thread and route table
- [Counter Foundations](./counter-foundations.md) → mounted components and action patterns
- [Pages, Routes, and Layout](./pages-routes-and-layout.md) → shell + page composition
- [Components and Composition](./components-and-composition.md) → reusable UI sections
- [Forms, Inputs, and Submit Flows](./forms-inputs-and-submit-flows.md) → event-driven update patterns
- [Dynamic Routes and Detail Pages](./dynamic-routes-and-detail-pages.md) → `/leads/:id`
- [Static Assets and JSON Endpoints](./static-assets-and-json-endpoints.md) → `/assets`, `/api/*`, `/health`
- [Debugging Hya Apps](./debugging-hya-apps.md) → practical inspection workflow

That is exactly why the series is structured this way. The big example stops feeling “big” once you can recognize the same building blocks inside it.

## Final advice

If you want to become productive with Hya, do not wait for perfect framework mastery before building something real. Start with a small server-first app, keep the structure explicit, and add fine-grained behavior only where it clearly helps.

That is the path the repository itself has taken, and it is still the healthiest way to grow a Hya codebase.

## Where to go next

After the tutorial series, keep these docs close:

- [Hya Overview](../hya-overview.md)
- [Routing](../routing.md)
- [Forms, Actions, and State](../forms-actions-and-state.md)
- [Fine-Grained Reactivity](../fine-grained-reactivity.md)
- [Package hya Reference](../../packages/hya.md)

If you can read `launchpad_crm` and explain the route → page → data → component → response path clearly, you are in very good shape.
