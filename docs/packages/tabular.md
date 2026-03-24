---
title: CSV/tabular data
description: Read and write CSV-style data and row sets.
---

# CSV/tabular data

Read and write CSV-style data and row sets.

## Why you would use it

Use `tabular` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "tabular" as tabular;
```

## Source-derived surface

### `csv.det` → group `csv`

- `parse(str#text)`
- `parse_rows(str#text)`
- `stringify(var#rows)`
- `stringify_rows(var#rows)`
- `read(str#path)`
- `write(str#path, var#rows)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `tabular` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
