---
title: Testing helpers
description: Temporary files, fixtures, snapshots, and testing convenience routines.
---

# Testing helpers

Temporary files, fixtures, snapshots, and testing convenience routines.

## Why you would use it

Use `testx` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "testx" as testx;
```

## Source-derived surface

### `core.det` → group `core`

- `temp_path(str#prefix, str#suffix)`
- `fixture_json(str#path)`
- `snapshot_json(str#path, var#value)`
- `expect_ok(var#result)`
- `expect_err(var#result)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `testx` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
