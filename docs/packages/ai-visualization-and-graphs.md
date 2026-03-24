---
title: AI, Visualization, and Graph Packages
description: Packages for AI workflows, graph processing, charts, and rendering.
---

# AI, Visualization, and Graph Packages

This family includes packages that help with graph modeling, visualization, and LLM workflows.

## Main packages

- `llmx`
- `graph`
- `flowviz`
- `chart`
- `svgx`
- `renderx`
- `imgx`
- `aix`
- `ezml`
- `visionx`

## Typical usage patterns

### `llmx`
For multi-provider LLM workflows, request shaping, streaming, tool calls, and embeddings.

### `graph`
For graph modeling, DAG reasoning, search, and render/export helpers.

### `ezml`
For baseline machine-learning flows on numeric/tabular data: dataset shaping, deterministic splits, preprocessing, simple models, and evaluation.

### `flowviz`
For turning run graph and autoflow traces into visual pages.

### `chart` / `svgx`
For data-oriented visualization and SVG generation.

## Practical composition

A reporting/analysis pipeline may use:

- `db` or `tabular` for data
- `ezml` for baseline train/evaluate flows
- `graph` for task topology
- `llmx` for model interaction or embeddings
- `chart` or `svgx` for visual output
- `flowviz` for runtime introspection
