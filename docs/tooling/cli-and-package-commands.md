---
title: CLI and Package Commands
description: The Detian CLI surface for running programs, package workflows, and the language server.
---

# CLI and Package Commands

## Run a program

```bash
cargo run -- path/to/file.det
```

You can also run the built binary directly:

```bash
./target/debug/detian1 path/to/file.det
```

## Run a package root

```bash
cargo run -- examples/foundation_stack_demo
```

## Run the language server

```bash
cargo run -- lsp
```

## Hya development loop

There is now a minimal Hya dev supervisor:

```bash
cargo run -- dev examples/hya_server.det
```

or:

```bash
./target/debug/detian1 dev examples/hya_server.det
```

Current behavior:

- watches Detian source plus common asset files
- restarts the child Detian process on change
- enables `GET /__hya/dev/version`
- injects a browser-side full reload script through `hya.page(...)`

This is **full-page hot reload**, not HMR.

## Package commands

```bash
cargo run -- lock .
cargo run -- publish --registry ./registry .
cargo run -- install mypkg@^1.0 --registry ./registry --dest vendor
cargo run -- search --registry ./registry mypkg
```

## Practical advice

When documenting or teaching Detian, always distinguish between:

- running a plain source file
- running a package root
- running the Hya dev supervisor
- using package-management subcommands
- running the LSP
