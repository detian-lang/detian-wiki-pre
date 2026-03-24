---
title: Image workflows
description: Image-oriented helpers including SVG-to-image conversion flows.
---

# Image workflows

Image-oriented helpers including SVG-to-image conversion flows.

## Why you would use it

Use `imgx` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "imgx" as imgx;
```

## Source-derived surface

### `png.det` → group `png`

- `bytes(str#path)`
- `base64(str#path)`
- `data_uri(str#path)`

### `raster.det` → group `raster`

- `svg_file_to_png(str#svg_path, str#png_path)`
- `svg_text_to_png(str#svg_text, str#svg_path, str#png_path)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `imgx` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
