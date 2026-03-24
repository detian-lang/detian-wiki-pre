---
title: Date and time
description: Format, parse, and manipulate timestamps and related data.
---

# Date and time

Format, parse, and manipulate timestamps and related data.

## Why you would use it

Use `datetime` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "datetime" as datetime;
```

## Source-derived surface

### `core.det` → group `core`

- `now_iso()`
- `format_iso(timestamp#value)`
- `parse_iso(str#text)`
- `format(timestamp#value, str#pattern)`
- `add_days(timestamp#value, int#days)`
- `add_hours(timestamp#value, int#hours)`
- `parts(timestamp#value)`
- `today_ymd()`
- `from_now(timestamp#value)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `datetime` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
