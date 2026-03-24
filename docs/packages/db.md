---
title: SQLite persistence
description: Persist local data, run transactions, and manage migrations with a Detian-friendly surface.
---

# SQLite persistence

Persist local data, run transactions, and manage migrations with a Detian-friendly surface.

## Why you would use it

Use `db` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "db" as db;
```

## Source-derived surface

### `migrate.det` → group `migrate`

- `init(var#conn)`
- `checksum(var#migration)`
- `applied(var#conn)`
- `pending(var#conn, var#migrations)`
- `validate(var#conn, var#migrations)`
- `acquire_lock(var#conn, str#owner)`
- `release_lock(var#conn)`
- `apply(var#conn, var#migrations)`

### `sqlite.det` → group `sqlite`

- `open(str#path)`
- `close(var#handle)`
- `script(var#handle, str#sql)`
- `begin(var#handle)`
- `commit(var#tx)`
- `rollback(var#tx)`
- `exec(var#handle, str#sql, var#params...)`
- `query(var#handle, str#sql, var#params...)`
- `query_one(var#handle, str#sql, var#params...)`
- `scalar(var#handle, str#sql, var#params...)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `db` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
