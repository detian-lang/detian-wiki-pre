---
title: Installation and Running
description: Build the interpreter, run programs, run package roots, and start the language server.
---

# Installation and Running

## Requirements

You need:

- a recent Rust toolchain with Cargo
- a POSIX-like shell environment
- Node.js only if you want to build the Docusaurus site or work on JS tooling around the docs

## Build the interpreter

```bash
cargo build --release
```

For development work you can stay on debug builds and run directly through Cargo.

## Run a single Detian source file

```bash
cargo run -- path/to/program.det
```

Example:

```bash
cargo run -- examples/ultimate_showcase.det
```

## Run a package root

Detian understands package roots based on:

- `detian.toml`
- `src/main.det`
- `src/lib.det`

That means you can point the interpreter at a package directory directly.

```bash
cargo run -- examples/foundation_stack_demo
cargo run -- examples/flowviz_demo
cargo run -- examples/launchpad_crm
```

## Run the language server

```bash
cargo run -- lsp
```

The current LSP is stdio-based. It already supports diagnostics, document symbols, hover, definition, completion, and references.

## Common test commands

```bash
cargo test -q -- --test-threads=1
cargo clippy --all-targets -- -D warnings
```

## Package-management commands

Detian exposes package-management workflows through the CLI.

```bash
cargo run -- lock .
cargo run -- publish --registry ./registry .
cargo run -- install mypkg@^1.0 --registry ./registry --dest vendor
cargo run -- search --registry ./registry mypkg
```

## High-value examples to study

### Language / workflow

- `examples/ultimate_showcase.det`
- `examples/test_v0_4_features.det`

### Hya / web

- `examples/hya_server.det`
- `examples/hya_flat_api_p0`
- `examples/launchpad_crm`

### Packages / ecosystem

- `examples/foundation_stack_demo`
- `examples/db_demo`
- `examples/regex_demo`
- `examples/llmx_demo`
- `examples/flowviz_demo`

## Suggested first session

A practical first session looks like this:

```bash
cargo build --release
cargo run -- examples/ultimate_showcase.det
cargo run -- examples/hya_server.det
cargo run -- lsp
```

That gives you:

- the language overview
- a Hya baseline
- the editor/tooling side
