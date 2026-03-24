---
title: Charting
description: Render bar, line, and pie-style chart outputs.
---

# Charting

Render bar, line, and pie-style chart outputs.

## Why you would use it

Use `chart` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "chart" as chart;
```

## Source-derived surface

### `bar.det` → group `bar`

- `svg(var#series, var#width, var#height)`
- `node(var#series, var#width, var#height)`

### `core.det` → group `core`

- `series(str#label, var#value)`
- `series_color(str#label, var#value, str#color)`
- `palette(int#index)`
- `normalize_series(var#series)`
- `values(var#series)`
- `total(var#series)`
- `min_value(var#series)`
- `max_value(var#series)`

### `legend.det` → group `legend`

- `node(var#series)`

### `line.det` → group `line`

- `svg(var#series, var#width, var#height)`
- `node(var#series, var#width, var#height)`

### `page.det` → group `page`

- `dashboard(str#title, var#cards)`
- `card(str#title, var#chart_node, var#legend_node)`

### `pie.det` → group `pie`

- `slice_path(var#cx, var#cy, var#r, var#start_deg, var#end_deg)`
- `svg(var#series, var#width, var#height)`
- `node(var#series, var#width, var#height)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `chart` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
