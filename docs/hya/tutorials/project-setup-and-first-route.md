---
title: Project Setup and First Route
description: Set up a Hya app, load the package, serve the first route, and understand the minimum server-first loop.
---

# Project Setup and First Route

Before we build a real Hya app, we need to lock in the smallest complete shape that actually runs. That shape is not “a component.” It is:

- a package dependency
- a `pages` handler
- a route table
- a server thread
- an entrypoint

If you understand those five pieces, the rest of Hya will feel much less mysterious.

## Step 1: create the package root

A Hya app is still a Detian package root. The minimal `detian.toml` looks like this:

```toml
name = "hello-hya"
version = "0.1.0"

[dependencies]
hya = { path = "../../packages/hya" }
```

The important part is that `hya` is just another dependency. Hya is not a special compiler mode. It is a package that exposes a server-first UI surface.

## Step 2: load the package

In `src/main.det`:

```detian
load "hya" as hya;
require env.read;
```

That gives you the Hya surface under the `hya` alias. The current tutorial direction is **HYX first for ordinary page/component authoring**, with the flat API kept around as an explicit escape hatch when exact helper control matters more than readability.

## Step 3: write a page handler

The first real Hya unit is a page handler thread. Put it in a `pages` group:

```detian
group#pages {
  thread#home(map#ctx) {
    var#body = hyx {
      <main class="page">
        <h1>Hello from Hya</h1>
        <p>This page was rendered on the server.</p>
      </main>
    };
    return hya.html(hya.page("Hello Hya", [body]));
  }
}
```

A few things are happening here:

- `ctx` is the route context for the request
- the handler returns an HTTP response, not just a node
- `hya.page(...)` builds a full HTML document body shape
- `hya.html(...)` wraps the page into an HTML response

That last step matters. Hya has a node-building layer and a response layer. You usually need both.

## Step 4: expose a route

Now create the route table in a `web` group:

```detian
group#web {
  thread#server {
    int#port = 3000;
    hya.serve(port, [
      hya.get("/", "pages.home")
    ]);
  }
}
```

This is the part that often helps newcomers the most: routes are explicit data. A route is not discovered automatically from filenames. You register it directly.

## Step 5: add the entrypoint

```detian
@#main {
  @web.server;
}
```

That is enough to boot the server.

## Full minimal file

Here is the whole thing together:

```detian
load "hya" as hya;
require env.read;

group#pages {
  thread#home(map#ctx) {
    var#body = hyx {
      <main class="page">
        <h1>Hello from Hya</h1>
        <p>This page was rendered on the server.</p>
      </main>
    };
    return hya.html(hya.page("Hello Hya", [body]));
  }
}

group#web {
  thread#server {
    int#port = 3000;
    hya.serve(port, [
      hya.get("/", "pages.home")
    ]);
  }
}

@#main {
  @web.server;
}
```

## Running the app

From the package root:

```bash
cargo run --quiet -- path/to/your/app
```

Then open:

```text
http://127.0.0.1:3000/
```

If you want a configurable port, mirror the pattern used in repository examples:

```detian
var#port_value = env("HYA_PORT");
int#port = 3000;
if (port_value != null) {
  port = int(port_value);
}
```

That keeps local development ergonomic and deployment scripts simple.

## What the route context gives you

For a static route like `/`, you may ignore `ctx` at first. But it becomes more important later because Hya route handlers can receive:

- `ctx.method`
- `ctx.path`
- `ctx.query`
- `ctx.params`
- `ctx.route_pattern`
- `ctx.route_kind`

So even the first page handler already uses the same general shape as a more complex app.

## Why Hya starts at the page level

A lot of UI frameworks start by teaching reusable components first. Hya works better when taught from the route and page outward because:

- Hya is server-first
- the route table is explicit
- responses matter as much as nodes
- assets, JSON endpoints, and HTML pages all belong to the same app surface

That is why our first milestone is “get a real request to a real page handler,” not “learn a special component lifecycle.” The only real style change versus the older flat-first docs is the rendering surface we recommend for the page body.

## Suggested styling next

Even at this early stage, it helps to keep CSS as a static asset rather than embedding everything inline. The later tutorial on assets covers this in detail, but the minimal pattern looks like this:

```detian
var#head = [
  hya.stylesheet("/assets/app.css")
];
return hya.html(hya.document("Hello Hya", head, [body]));
```

Then pair it with:

```detian
hya.static("/assets", "public")
```

You do not need that yet, but it is good to know the shape early.

## Common beginner mistakes

### Returning nodes instead of a response

Wrong:

```detian
return hya.page("Hello", [view]);
```

Preferred:

```detian
return hya.html(hya.page("Hello", [view]));
```

### Forgetting to register the route

Defining `pages.home` does nothing unless you add:

```detian
hya.get("/", "pages.home")
```

### Treating Hya as file-based routing

It is not. Hya makes routing explicit on purpose.

## A good mental checkpoint

At this point, make sure you can explain the request path in one sentence:

> A browser request hits `hya.serve(...)`, the route table resolves `pages.home`, the thread builds Hya nodes, and the handler returns an HTML response.

If you can say that without hesitation, you are ready for the next page.

## Next step

Continue to [Counter Foundations](./counter-foundations.md), where we introduce `hya.state(...)`, `hya.action(...)`, and `hya.mount(...)` without losing the server-first model we just established.
