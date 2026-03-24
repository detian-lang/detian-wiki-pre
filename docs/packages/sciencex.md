---
title: Science helpers
description: Constants, conversions, and lightweight domain calculations.
---

# Science helpers

Constants, conversions, and lightweight domain calculations.

## Why you would use it

Use `sciencex` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "sciencex" as sciencex;
```

## Source-derived surface

### `constants.det` → group `constants`

- `pi()`
- `e()`
- `gravity()`
- `speed_of_light()`

### `physics.det` → group `physics`

- `kinetic_energy(var#mass, var#velocity)`
- `momentum(var#mass, var#velocity)`
- `remaining_by_half_life(var#half_life, var#elapsed)`
- `compound_growth(var#initial, var#rate, var#periods)`
- `logistic_step(var#population, var#rate, var#carrying_capacity)`

### `units.det` → group `units`

- `c_to_f(var#celsius)`
- `f_to_c(var#fahrenheit)`
- `kmh_to_ms(var#kmh)`
- `ms_to_kmh(var#ms)`
- `bar_to_pascal(var#bar)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `sciencex` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
