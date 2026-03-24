---
title: Package Catalog
description: The wide official package surface of Detian and how to navigate it.
---

# Package Catalog

Detian’s package ecosystem is already broad enough that users should not learn it as a flat alphabetical list. The best way to understand it is by package family and use case.

## Framework and web

- `hya`
- `webkit`
- `flowviz`
- `renderx`
- `imgx`

Use this family when building UI, routes, operational pages, render output, and application-facing web surfaces.

## Data and storage

- `db`
- `tabular`
- `jsonx`
- `filex`
- `cachex`
- `queuex`
- `datetime`
- `uuidx`

Use this family when building data-heavy internal tools, local persistence layers, import/export flows, and durable job-like systems.

## AI, visualization, and graphs

- `llmx`
- `graph`
- `chart`
- `svgx`
- `aix`
- `ezml`
- `visionx`

Use this family when combining orchestration, model calls, graph reasoning, rendered analytical output, and baseline local machine-learning workflows.

## Security, auth, and operations

- `crypto`
- `authx`
- `metricsx`
- `regex`
- `httpx`
- `testx`

Use this family near the boundaries of applications: auth, hashing, metrics, validation, requests, and testing.

## Math, stats, and science

- `mathx`
- `ndx`
- `statsx`
- `sciencex`
- `ezml` (adjacent applied layer on top of numeric/data packages)

Use this family when you want domain-oriented numerics instead of only builtin arithmetic. `ndx` is the small generic vector/matrix kernel layer inside that family.

## How to study the package ecosystem

1. start with the family guide pages
2. then open the package-specific page
3. then read examples/tests/source if you need implementation detail

That order is much easier than trying to memorize every package in isolation.
