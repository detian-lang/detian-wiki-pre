---
title: Framework and Web Packages
description: How the web-facing Detian packages fit together.
---

# Framework and Web Packages

The main web-facing family is built around Hya and the server/runtime helpers that support it.

## Core framework packages

### `hya`

The main server-first UI and web framework.

### `webkit`

Small higher-level helpers layered on top of Hya.

### `flowviz`

Not a UI framework, but highly relevant for web-facing operational views because it turns run graphs into web pages and SVG visualizations.

### `renderx` and `imgx`

Useful when a web app needs SVG/HTML packaging or image-oriented workflows.

## How they compose

A typical Hya app can involve:

- `hya` for pages, routes, components, state, and actions
- `webkit` for reusable small UI helpers
- `flowviz` for operational insight pages
- `renderx` for packaged render outputs
- `imgx` when rasterization or image conversion is needed

## Recommendation

If you are learning the web side of Detian, start with `hya`, then only add `webkit` or visualization packages when the app needs them.
