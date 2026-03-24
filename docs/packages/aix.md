---
title: AI utilities
description: Lightweight vector and AI utility helpers.
---

# AI utilities

Lightweight vector and AI utility helpers.

## Why you would use it

Use `aix` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "aix" as aix;
```

## Source-derived surface

### `classify.det` → group `classify`

- `nearest_label(var#samples, var#query_embedding)`
- `score_band(var#score)`
- `detection_overlap(var#target_box, var#candidate_box)`

### `vectors.det` → group `vectors`

- `dot(var#a, var#b)`
- `l2_distance(var#a, var#b)`
- `cosine(var#a, var#b)`
- `softmax(var#values)`
- `argmax(var#values)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `aix` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
