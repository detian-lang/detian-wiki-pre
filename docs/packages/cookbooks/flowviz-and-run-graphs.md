---
title: flowviz and Run Graphs
description: Turn execution traces and run graphs into navigable visual pages.
---

# flowviz and Run Graphs

`flowviz` is how you make Detian’s execution story visible.

## 1. Collect a graph

```detian
var#graph = run_graph();
```

## 2. Render it as a page

```detian
load "flowviz" as flowviz;
thread#home(map#ctx) {
  return flowviz.render.page("Flow Visualizer", graph);
}
```

## 3. Autoflow context

`flowviz.render.page(...)` can also surface autoflow traces and summaries, not just run graph nodes.

## Why this matters

Detian is unusually execution-oriented. `flowviz` gives that execution model an operational UI.
