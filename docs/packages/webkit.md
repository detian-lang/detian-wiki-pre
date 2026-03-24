---
title: UI helper layer
description: Provide small reusable Hya-oriented UI helpers.
---

# UI helper layer

Provide small reusable Hya-oriented UI helpers.

## Why you would use it

Use `webkit` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "webkit" as webkit;
```

## Source-derived surface

### `ui.det` → group `ui`

- `badge(str#label, str#tone)`
- `stat_card(str#title, str#value, str#note)`
- `panel(str#title, var#children)`
- `key_value_table(var#rows)`
- `stack_page(str#title, var#sections)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `webkit` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
