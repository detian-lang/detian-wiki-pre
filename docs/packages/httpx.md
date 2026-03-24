---
title: Higher-level HTTP
description: Build query strings and issue structured HTTP requests.
---

# Higher-level HTTP

Build query strings and issue structured HTTP requests.

## Why you would use it

Use `httpx` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "httpx" as httpx;
```

## Source-derived surface

### `core.det` → group `core`

- `query_string(var#params)`
- `with_query(str#url, var#params)`
- `bearer_headers(str#token)`
- `get_result(str#url, var#headers)`
- `get_json(str#url)`
- `get_json_retry(str#url, int#attempts, int#delay_ms)`
- `post_json(str#url, var#body)`
- `post_json_retry(str#url, var#body, int#attempts, int#delay_ms)`
- `request_json(str#method, str#url, var#body, var#headers)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `httpx` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
