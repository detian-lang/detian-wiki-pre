---
title: JSON helpers
description: Path-oriented JSON access and small JSON transformation helpers.
---

# JSON helpers

Path-oriented JSON access and small JSON transformation helpers.

## Why you would use it

Use `jsonx` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "jsonx" as jsonx;
```

## Source-derived surface

### `core.det` → group `core`

- `path_get(var#value, str#path)`
- `path_has(var#value, str#path)`
- `merge_shallow(var#left, var#right)`
- `pick(var#value, var#fields)`
- `pretty(var#value)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `jsonx` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
