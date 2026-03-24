---
title: Graph algorithms
description: Represent, traverse, and render graphs and DAGs.
---

# Graph algorithms

Represent, traverse, and render graphs and DAGs.

## Why you would use it

Use `graph` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "graph" as graph;
```

## Source-derived surface

### `core.det` → group `core`

- `node(str#id, str#label)`
- `edge(str#from, str#to)`
- `edge_weighted(str#from, str#to, var#weight)`
- `make(var#nodes, var#edges)`
- `find_node(var#graph, str#id)`
- `has_node(var#graph, str#id)`
- `outgoing_edges(var#graph, str#id)`
- `incoming_edges(var#graph, str#id)`
- `neighbors(var#graph, str#id)`
- `indegree(var#graph, str#id)`
- `outdegree(var#graph, str#id)`
- `roots(var#graph)`
- `leaves(var#graph)`
- `reverse(var#graph)`

### `dag.det` → group `dag`

- `is_acyclic(var#graph)`

### `export.det` → group `render`

- `dot(var#graph)`
- `mermaid(var#graph)`

### `search.det` → group `search`

- `_dfs_exists(var#graph, str#current, str#goal, var#visited)`
- `path_exists(var#graph, str#start, str#goal)`
- `reachable_ids(var#graph, str#start)`
- `reachable_count(var#graph, str#start)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `graph` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
