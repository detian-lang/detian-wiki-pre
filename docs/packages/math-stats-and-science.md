---
title: Math, Stats, and Science Packages
description: Numeric helper packages and where each one fits.
---

# Math, Stats, and Science Packages

Detian includes several packages for numerical and analytical support.

## Main packages

- `mathx`
- `ndx`
- `statsx`
- `sciencex`
- `ezml` (adjacent baseline ML layer)

## Roles

### `mathx`
General math helpers beyond core operators and builtins.

### `ndx`
Small vector/matrix/statistics kernel for generic numeric work.

### `statsx`
Descriptive statistics and summary-oriented calculations.

### `sciencex`
Constants, conversions, and lightweight science/physics support.

## Practical guidance

Use `mathx` for local math convenience, `ndx` when you need generic vector/matrix/axis helpers, `statsx` when you are summarizing or analyzing data sets, and `sciencex` when you want a domain-flavored layer rather than bare arithmetic. Use `ezml` when you want those numeric/data building blocks packaged into a baseline train/evaluate workflow instead of wiring the whole ML pipeline by hand.
