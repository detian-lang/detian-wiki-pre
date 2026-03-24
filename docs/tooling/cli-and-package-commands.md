---
title: CLI and Package Commands
description: The Detian CLI surface for running programs, package workflows, and the language server.
---

# CLI and Package Commands

## Run a program

```bash
cargo run -- path/to/file.det
```

## Run a package root

```bash
cargo run -- examples/foundation_stack_demo
```

## Run the language server

```bash
cargo run -- lsp
```

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
- using package-management subcommands
- running the LSP
