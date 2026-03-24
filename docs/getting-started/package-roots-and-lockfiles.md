---
title: Package Roots and Lockfiles
description: How Detian packages, manifests, exports, dependencies, and lockfiles work.
---

# Package Roots and Lockfiles

Detian supports both plain `.det` files and package roots.

## Package conventions

A package root usually contains:

- `detian.toml`
- `src/main.det`
- `src/lib.det`
- optionally `detian.lock`

## Why package roots matter

Once you move beyond a single file, package roots give you:

- a declared package identity
- dependency information
- export surfaces
- local lockfile generation
- registry-oriented workflows

## Typical package layout

```text
detian.toml
src/
  main.det
  lib.det
```

## `src/main.det` vs `src/lib.det`

### `src/main.det`

Application entrypoint surface.

### `src/lib.det`

Library/export surface.

This is what other code usually imports when using the package as a dependency.

## Lockfiles

Detian can generate a local lockfile to stabilize dependency resolution.

```bash
cargo run -- lock .
```

## Publishing and installing

```bash
cargo run -- publish --registry ./registry .
cargo run -- install mypkg@^1.0 --registry ./registry --dest vendor
```

## Exports and surface control

Modules that use `export` expose only exported definitions as part of the visible surface.

That means package authors can intentionally curate what downstream users are allowed to rely on.

## Practical advice

If you are building something that is more than a toy example, it is worth moving to a package root early. It keeps imports, dependencies, and documentation much more manageable.
