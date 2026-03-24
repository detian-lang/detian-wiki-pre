---
title: UUID helpers
description: Generate IDs for records, traces, jobs, and artifacts.
---

# UUID helpers

Generate IDs for records, traces, jobs, and artifacts.

## Why you would use it

Use `uuidx` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "uuidx" as uuidx;
```

## Source-derived surface

### `core.det` → group `core`

- `v4()`
- `prefixed(str#prefix)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `uuidx` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
