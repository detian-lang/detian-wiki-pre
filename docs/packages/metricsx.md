---
title: Metrics and export
description: Metrics modeling and Prometheus-style text output.
---

# Metrics and export

Metrics modeling and Prometheus-style text output.

## Why you would use it

Use `metricsx` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "metricsx" as metricsx;
```

## Source-derived surface

### `core.det` → group `core`

- `counter(str#name, var#value)`
- `counter_labeled(str#name, var#value, var#labels)`
- `gauge(str#name, var#value)`
- `histogram(str#name, var#value)`
- `timer(str#name, duration#value)`
- `histogram_buckets(str#name, var#values, var#buckets)`
- `with_labels(var#metric, var#labels)`
- `merge(var#metrics...)`

### `prom.det` → group `prom`

- `label_text(var#labels)`
- `line(var#metric)`
- `histogram_lines(var#metric)`
- `text(var#metrics)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `metricsx` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
