---
title: SVG generation
description: Small SVG construction and sparkline-like helpers.
---

# SVG generation

Small SVG construction and sparkline-like helpers.

## Why you would use it

Use `svgx` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "svgx" as svgx;
```

## Source-derived surface

### `svg.det` → group `svg`

- `line(var#x1, var#y1, var#x2, var#y2, str#stroke, var#stroke_width)`
- `text(var#x, var#y, str#value, str#fill, var#font_size)`
- `circle(var#cx, var#cy, var#r, str#fill)`
- `rect(var#x, var#y, var#w, var#h, str#fill)`
- `polyline(var#points, str#stroke, var#stroke_width, str#fill)`
- `document(var#width, var#height, str#body)`
- `sparkline(var#values, var#width, var#height, str#stroke)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `svgx` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
