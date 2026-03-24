---
title: Math helpers
description: General mathematical helpers beyond core operators.
---

# Math helpers

General mathematical helpers beyond core operators.

## Why you would use it

Use `mathx` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "mathx" as mathx;
```

## Source-derived surface

### `curve.det` → group `curve`

- `sigmoid(var#x)`
- `gaussian(var#x, var#mean, var#sigma)`
- `soft_sign(var#x)`

### `scalar.det` → group `scalar`

- `pi()`
- `tau()`
- `e()`
- `clamp(var#value, var#lo, var#hi)`
- `lerp(var#a, var#b, var#t)`
- `inv_lerp(var#a, var#b, var#value)`
- `remap(var#value, var#in_lo, var#in_hi, var#out_lo, var#out_hi)`
- `deg_to_rad(var#deg)`
- `rad_to_deg(var#rad)`
- `smoothstep(var#edge0, var#edge1, var#value)`

### `vector.det` → group `vector`

- `vec2(var#x, var#y)`
- `add2(var#a, var#b)`
- `sub2(var#a, var#b)`
- `scale2(var#v, var#factor)`
- `dot2(var#a, var#b)`
- `length2(var#v)`
- `distance2(var#a, var#b)`
- `normalize2(var#v)`
- `lerp2(var#a, var#b, var#t)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `mathx` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
