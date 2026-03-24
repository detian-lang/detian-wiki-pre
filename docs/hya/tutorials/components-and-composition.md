---
title: Components and Composition
description: Learn how to split page handlers into reusable Hya components and when to prefer plain Hya or HYX.
---

# Components and Composition

Once your app has more than one page, the next source of complexity is almost always repeated view structure. Hya solves this with components, but Hya components are intentionally simple:

> A Hya component is just a Detian thread that returns Hya nodes.

That simplicity is a huge advantage. It means components are easy to test, easy to trace, and easy to explain.

## The basic component shape

```detian
group#components {
  thread#counter(map#props) {
    return hya.element("button", {}, [
      hya.text("Count: " + str(props.state.value.count))
    ]);
  }
}
```

There is no special class, no separate lifecycle API, and no framework-specific file format required.

## Mounting a component

The page handler usually mounts the component:

```detian
var#view = hya.mount("components.counter", { state: state });
```

This does two things:

1. it resolves the handler string to a component thread
2. it stores enough metadata for Hya to reconnect actions and updates later

That second part is why `hya.mount(...)` matters more than simply calling the thread directly.

## When direct calls are okay

You can still call a component thread directly in Detian:

```detian
components.counter({ state: state })
```

But in Hya pages, prefer `hya.mount(...)` when the component participates in the action bridge or fine-grained rendering. Direct calls are best reserved for pure rendering helpers or places where you intentionally do not need Hya metadata.

## Components should receive plain, explicit props

Good component props are boring in a good way:

```detian
{ state: state }
{ lead: lead, summary: summary }
{ items: items, active_id: active_id }
```

Avoid clever implicit dependencies. The more explicit the props are, the easier it is to understand rerender behavior and later fine-grained authoring.

## A useful composition rule

A good Hya split is:

- page handler: request context, data loading, top-level orchestration
- component: render a focused piece of UI from props
- helper group: tiny derived values, CSS class decisions, formatting helpers

That is very close to how the `launchpad_crm` example is organized. It scales well because every layer has a clear job.

## Plain Hya versus HYX

Hya gives you two broad rendering styles.

### Plain Hya

```detian
return hya.element("section", { class: "card" }, [
  hya.element("h1", {}, [hya.text("LaunchPad")]),
  hya.element("p", { class: "muted" }, [hya.text("Pipeline dashboard")])
]);
```

### HYX

```detian
return hyx {
  <section class="card">
    <h1>LaunchPad</h1>
    <p class="muted">Pipeline dashboard</p>
  </section>
};
```

Both are valid. The choice is about readability, not framework correctness.

## When to keep plain Hya

Plain Hya is often better when:

- the tree is small
- you are debugging exact runtime behavior
- you are building helpers that generate nodes programmatically
- you want to avoid any uncertainty about HYX lowering

It is also a great teaching surface because every node is explicit.

## When HYX becomes the better surface

HYX helps when:

- nested HTML dominates the file
- repeated `hya.element(...)` calls become noisy
- readability matters more than seeing every node constructor directly
- you want JSX-like authoring without losing Detian semantics

The `examples/hya_package_app` example shows this nicely. It mixes component threads and HYX to keep the page structure easy to scan.

## Component naming and PascalCase mapping

In HYX, a component written as:

```hyx
<CounterCard state={state} />
```

maps to the thread handler:

- `components.counter_card`

That rule matters when debugging resolution errors. If the runtime says it could not resolve a component, this mapping is one of the first things to check.

## Good component boundaries

A good Hya component usually:

- renders one conceptual piece of UI
- uses a small, obvious prop contract
- avoids loading data by itself
- delegates state transitions to actions

A bad Hya component usually:

- receives half the application state “just in case”
- mixes layout, data loading, and event strategy in one place
- duplicates route knowledge that should stay in the page handler

## A practical composition example

Imagine a CRM dashboard page. A clean split might be:

- `components.metric_card`
- `components.lead_list`
- `components.lead_row`
- `components.activity_feed`
- `components.filters_bar`

The page handler can then look like this:

```detian
thread#home(map#ctx) {
  var#overview = data.overview();
  return hya.html(layout.shell("LaunchPad", [
    hya.mount("components.hero", { summary: overview.summary }),
    hya.mount("components.metrics", { metrics: overview.metrics }),
    hya.mount("components.dashboard", { overview: overview })
  ]));
}
```

That reads like application structure, not implementation noise.

## Where state should live

A helpful rule for beginners:

- **page state**: things that describe the interactive state of a mounted component tree
- **component props**: the current inputs to render
- **derived helpers**: formatting, badge class selection, small view calculations

Try not to invent hidden local state layers too early. Hya’s strength is that you can usually see where data comes from.

## How fine-grained rendering affects component authoring

Later in the series, some components will switch from:

```detian
hya.mount(...)
```

to:

```detian
hya.mount_fine(...)
```

That does not change the basic composition rule. A fine-grained component is still a Detian thread. The difference is that the runtime may patch only specific bindings instead of rerendering the whole subtree.

## Common beginner mistakes

### Making one mega-component

If a component needs several screens of code to understand, split it. Hya components are cheap.

### Passing route context everywhere

Let the page handler use `ctx` and then pass distilled props downward.

### Hiding action names deep in anonymous helpers

Prefer visible, named action descriptors. This makes the UI easier to trace.

## Exercise

Take your counter app and split it into:

- `components.counter_button`
- `components.counter_panel`
- `layout.shell`

Then rewrite one of those pieces in HYX and compare readability. That exercise teaches more than any abstract rule.

## Next step

Continue to [Actions and Reducers](./actions-and-reducers.md), where we follow an interaction from a button click all the way through the Hya action bridge and back into rendered UI.
