---
title: CLI helpers
description: Utilities for argument parsing and command-style application surfaces.
---

# CLI helpers

Utilities for argument parsing and command-style application surfaces.

## Why you would use it

Use `clix` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "clix" as clix;
```

## Source-derived surface

### `argv.det` → group `argv`

- `all()`
- `count()`
- `at(int#index)`
- `tail(int#from)`

### `current.det` → group `current`

- `args()`
- `has(str#flag)`
- `value(str#flag, var#fallback)`
- `positionals(var#value_flags)`
- `command(var#value_flags)`

### `flags.det` → group `flags`

- `expects_value(var#value_flags, str#flag)`
- `has(var#args, str#flag)`
- `value(var#args, str#flag, var#fallback)`
- `is_value_slot(var#args, var#value_flags, int#idx)`
- `positionals(var#args, var#value_flags)`
- `command(var#args, var#value_flags)`

### `help.det` → group `help`

- `usage(str#app, str#summary, var#lines)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `clix` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
