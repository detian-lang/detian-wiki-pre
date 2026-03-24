---
title: Cache helpers
description: SQLite-backed caches with TTL-oriented usage patterns.
---

# Cache helpers

SQLite-backed caches with TTL-oriented usage patterns.

## Why you would use it

Use `cachex` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "cachex" as cachex;
```

## Source-derived surface

### `sqlite.det` → group `sqlite`

- `init(var#conn)`
- `set(var#conn, str#namespace, str#key, var#value)`
- `set_with_ttl(var#conn, str#namespace, str#key, var#value, var#ttl_ms)`
- `get(var#conn, str#namespace, str#key)`
- `delete(var#conn, str#namespace, str#key)`
- `keys(var#conn, str#namespace)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `cachex` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
