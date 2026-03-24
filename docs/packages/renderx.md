---
title: Render packaging
description: Wrap or package HTML/SVG outputs for downstream use.
---

# Render packaging

Wrap or package HTML/SVG outputs for downstream use.

## Why you would use it

Use `renderx` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "renderx" as renderx;
```

## Source-derived surface

### `artifact.det` → group `artifact`

- `entry(str#path, str#mime, str#content)`
- `save_all(var#entries...)`

### `html.det` → group `html`

- `save(str#path, str#html_text)`
- `data_uri(str#html_text)`

### `svg.det` → group `svg`

- `wrap(var#width, var#height, str#body)`
- `save(str#path, str#svg_text)`
- `data_uri(str#svg_text)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `renderx` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
