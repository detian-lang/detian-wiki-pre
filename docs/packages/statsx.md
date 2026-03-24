---
title: Statistics helpers
description: Descriptive statistics for lists and small analytical workflows.
---

# Statistics helpers

Descriptive statistics for lists and small analytical workflows.

## Why you would use it

Use `statsx` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "statsx" as statsx;
```

## Source-derived surface

### `stats.det` → group `stats`

- `sum(var#values)`
- `mean(var#values)`
- `minmax(var#values)`
- `variance(var#values)`
- `stddev(var#values)`
- `normalize_minmax(var#values)`
- `zscores(var#values)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `statsx` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
