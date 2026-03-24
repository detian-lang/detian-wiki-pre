---
title: Queue helpers
description: SQLite-backed queue behavior for durable task-style workflows.
---

# Queue helpers

SQLite-backed queue behavior for durable task-style workflows.

## Why you would use it

Use `queuex` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "queuex" as queuex;
```

## Source-derived surface

### `sqlite.det` → group `sqlite`

- `init(var#conn)`
- `enqueue(var#conn, str#queue, var#payload)`
- `enqueue_with_delay(var#conn, str#queue, var#payload, int#delay_ms)`
- `enqueue_with_options(var#conn, str#queue, var#payload, int#delay_ms, int#max_attempts)`
- `dequeue(var#conn, str#queue)`
- `ack(var#conn, int#id)`
- `nack(var#conn, int#id, str#error_text, int#delay_ms)`
- `dead_letters(var#conn, str#queue)`
- `size(var#conn, str#queue)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `queuex` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
