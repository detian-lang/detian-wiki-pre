---
title: Filesystem ergonomics
description: Convenience helpers for reading, writing, and shaping filesystem paths.
---

# Filesystem ergonomics

Convenience helpers for reading, writing, and shaping filesystem paths.

## Why you would use it

Use `filex` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "filex" as filex;
```

## Source-derived surface

### `core.det` → group `core`

- `mkdir_p(str#path)`
- `read_dir(str#path)`
- `remove(str#path)`
- `path_join(var#parts...)`
- `basename(str#path)`
- `dirname(str#path)`
- `extname(str#path)`
- `stem(str#path)`
- `temp_path(str#prefix, str#suffix)`
- `read_json(str#path)`
- `write_json(str#path, var#value)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `filex` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
