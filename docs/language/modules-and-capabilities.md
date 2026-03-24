---
title: Modules and Capabilities
description: Loading modules, package surfaces, exports, and capability-gated behavior.
---

# Modules and Capabilities

Detian supports both local modules and package-root style code organization.

## Local load

```detian
load "./lib_module.det" as m;
```

This imports module definitions without executing the module’s own `@#main`.

## Exports

If a module uses `export`, only exported definitions become part of the visible import surface.

That makes surface design much more explicit and stable.

## Package roots

Package roots use:

- `detian.toml`
- `src/main.det`
- `src/lib.det`
- `detian.lock`

## Capabilities

Capabilities gate sensitive operations.

Typical examples include:

- filesystem writes
- network requests
- listening server sockets

This matters because Detian is used for orchestration and internal-tool scenarios where explicit permission boundaries are valuable.

## Practical guidance

Keep capability-heavy code near the edges of the application and keep pure transformation logic in ordinary groups and threads where possible.
