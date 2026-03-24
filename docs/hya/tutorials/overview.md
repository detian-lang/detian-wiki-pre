---
title: Tutorial Series Overview
description: A practical, multi-page Hya app series that takes you from a one-route page to a realistic server-first product.
---

# Hya Tutorial Series Overview

This series is the **best place to learn Hya by building**, not just by reading API reference pages. The goal is simple: by the time you finish, you should be able to start a real Detian + Hya app with confidence, understand why it is structured the way it is, and know when to stay with plain server rendering versus when to use the newer fine-grained features.

Hya is easiest to learn when you keep three ideas in your head at the same time:

1. **A Hya app is still a Detian program.** You are writing groups, threads, state values, and handlers.
2. **Pages are rendered on the server first.** HTML is the baseline shape, not an afterthought.
3. **Interactivity is an explicit bridge.** Actions, forms, routes, and fine-grained patches all have a concrete path you can trace.

That combination is what makes Hya feel different from a purely client-first UI framework. It rewards people who like explicit architecture, deterministic behavior, and straightforward debugging.

## Recommended path

Read the series in this order:

1. [Project Setup and First Route](./project-setup-and-first-route.md)
2. [Counter Foundations](./counter-foundations.md)
3. [Pages, Routes, and Layout](./pages-routes-and-layout.md)
4. [Components and Composition](./components-and-composition.md)
5. [Actions and Reducers](./actions-and-reducers.md)
6. [Forms, Inputs, and Submit Flows](./forms-inputs-and-submit-flows.md)
7. [Dynamic Routes and Detail Pages](./dynamic-routes-and-detail-pages.md)
8. [Static Assets and JSON Endpoints](./static-assets-and-json-endpoints.md)
9. [Fine-Grained Rendering](./fine-grained-rendering.md)
10. [Optimistic Actions and Reconcile](./optimistic-actions-and-reconcile.md)
11. [Debugging Hya Apps](./debugging-hya-apps.md)
12. [Capstone: LaunchPad CRM Walkthrough](./capstone-launchpad-crm.md)

If you already know Detian well, you can move faster. If Hya is your first serious Detian surface, the order above matters because every later chapter assumes the mental model built by the earlier ones.

## What you will build mentally

The series revolves around a small but realistic arc:

- a single route and a single page
- a state wrapper and a reducer-like action
- reusable components
- forms and debounced inputs
- dynamic routes with `:params`
- assets and JSON endpoints
- fine-grained rendering with `hya.mount_fine(...)`
- optimistic updates and debugging tools
- a capstone walkthrough of the `launchpad_crm` example

This is intentional. Hya is a server-first web framework, so learning it through a toy counter alone is not enough. You need to see how its routing, page handlers, assets, actions, and response helpers fit together in a broader application shape.

## What this series assumes

You should already know:

- basic Detian syntax
- how `group#...` and `thread#...` are declared
- how to run a Detian example from the CLI

If you do not, start with these docs first:

- [Installation and Running](../../getting-started/installation-and-running.md)
- [Mental Model](../../getting-started/mental-model.md)
- [Groups, Threads, and Main](../../language/groups-threads-and-main.md)

## A note on style

The tutorial series deliberately prefers the **flat Hya surface** when possible:

```detian
load "hya" as hya;

var#state = hya.state({ count: 1 });
var#view = hya.mount("components.counter", { state: state });
return hya.html(hya.page("Counter", [view]));
```

You will still see nested surfaces in some examples from the repository, especially older ones such as `hya.html.element(...)` or `hya.response.html(...)`. They are valid, but the flat API is easier to teach, easier to scan, and closer to the current recommended style.

## Plain Hya first, HYX when it helps

We will use both styles:

- **plain Hya** to keep the control flow visible
- **HYX** when the page structure becomes noisy enough that HTML-like authoring helps more than it hurts

That is another deliberate teaching choice. HYX is great, but it is much easier to appreciate once you understand what it lowers into.

## Fine-grained rendering in this series

The later chapters cover fine-grained rendering, but they do not treat it as the default answer to every UI problem. Hya still has a strong server-rendered story, and that is worth preserving. The series teaches fine-grained features as a power-up that you reach **after** you understand the baseline server-first model.

That means we will move through three rendering modes:

1. full server rendering with plain routes and components
2. action-driven rerendering through Hya’s standard state/action bridge
3. selective fine-grained patching for places where it clearly improves UX

## How to use the series well

A good way to work through the material is:

1. read one page
2. run the closest example from `examples/`
3. copy a small slice into a scratch Detian app
4. compare your version with the example again
5. move on only after you can explain the route → page → component → action path in your own words

That last point matters. Hya becomes much easier once you stop seeing it as “UI magic” and start seeing it as a clear execution pipeline.

## Suggested companion examples

Keep these repository examples open while reading:

- `examples/hya_flat_api_p0`
- `examples/hya_greeter_service`
- `examples/hya_package_app`
- `examples/launchpad_crm`

They cover different parts of the framework, and together they make the tutorial series feel concrete rather than abstract.

## Where to go after the series

After finishing, move into these deeper docs:

- [Hya Overview](../hya-overview.md)
- [Routing](../routing.md)
- [Forms, Actions, and State](../forms-actions-and-state.md)
- [Fine-Grained Authoring](../fine-grained-authoring.md)
- [Fine-Grained Reactivity](../fine-grained-reactivity.md)

Let’s start with the smallest possible Hya app shape and build outward from there.
