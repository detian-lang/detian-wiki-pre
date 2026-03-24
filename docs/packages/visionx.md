---
title: Vision utilities
description: Bounding-box and overlap helpers for vision-oriented data.
---

# Vision utilities

Bounding-box and overlap helpers for vision-oriented data.

## Why you would use it

Use `visionx` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "visionx" as visionx;
```

## Source-derived surface

### `boxes.det` → group `boxes`

- `from_xywh(var#x, var#y, var#w, var#h)`
- `width(var#box)`
- `height(var#box)`
- `area(var#box)`
- `center(var#box)`
- `intersection(var#a, var#b)`
- `iou(var#a, var#b)`
- `overlaps(var#a, var#b, var#threshold)`
- `filter_by_iou(var#target, var#candidates, var#threshold)`
- `best_match(var#target, var#candidates)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `visionx` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
