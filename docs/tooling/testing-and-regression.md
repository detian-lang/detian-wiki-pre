---
title: Testing and Regression
description: How the Detian project uses examples, runtime tests, and regression anchors.
---

# Testing and Regression

Detian evolves quickly, so regression discipline matters.

## Current testing layers

- parser tests
- runtime tests
- package smoke tests
- example-based integration tests
- benchmark examples for performance direction

## Why examples matter here

Examples are not just demos. In this project they often function as:

- API contracts
- documentation anchors
- integration surfaces
- regressions for runtime/framework behavior

## Suggested strategy for new features

1. add a focused parser/runtime test
2. add or update an example when the surface is user-facing
3. document the feature in a guide or reference page
4. run the full suite and clippy

## Common commands

```bash
cargo test -q -- --test-threads=1
cargo clippy --all-targets -- -D warnings
```
