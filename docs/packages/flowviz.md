---
title: Run graph visualization
description: Visualize run graphs and autoflow traces for operational insight.
---

# Run graph visualization

Visualize run graphs and autoflow traces for operational insight.

## Why you would use it

Use `flowviz` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "flowviz" as flowviz;
```

## Source-derived surface

### `layout.det` → group `layout`

- `positioned(var#graph)`
- `find_position(var#positioned, int#id)`

### `model.det` → group `model`

- `find_node(var#graph, int#id)`
- `depth(var#graph, var#node)`
- `max_depth(var#graph)`
- `status_count(var#graph, str#status)`

### `render.det` → group `render`

- `statuses()`
- `status_fill(str#status)`
- `status_stroke(str#status)`
- `edge(var#positioned, var#entry)`
- `node(var#entry)`
- `svg(var#graph)`
- `legend_controls()`
- `toolbar()`
- `interactive_style()`
- `interactive_script()`
- `summary_rows(var#graph)`
- `autoflow_summary_rows(var#events)`
- `autoflow_event_table(var#events)`
- `page(str#title, var#graph)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `flowviz` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
