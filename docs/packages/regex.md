---
title: Regular expressions
description: Match, find, capture, split, and replace text patterns.
---

# Regular expressions

Match, find, capture, split, and replace text patterns.

## Why you would use it

Use `regex` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "regex" as regex;
```

## Source-derived surface

### `core.det` → group `core`

- `is_match(str#pattern, str#text)`
- `find(str#pattern, str#text)`
- `find_all(str#pattern, str#text)`
- `replace(str#pattern, str#text, str#replacement)`
- `split(str#pattern, str#text)`
- `captures(str#pattern, str#text)`
- `capture_at(str#pattern, str#text, int#index)`
- `first_group(str#pattern, str#text)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `regex` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
