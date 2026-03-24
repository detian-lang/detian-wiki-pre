---
title: LSP
description: The Detian Language Server and its current feature set.
---

# LSP

Detian ships a stdio-based language server intended to improve the editor experience while the language continues to evolve.

## Start it

```bash
cargo run -- lsp
```

## Current capabilities

- diagnostics
- document symbols
- hover
- go to definition
- completion
- references

## Current philosophy

The current implementation is intentionally conservative.

It prefers:

- same-document symbol awareness first
- syntax diagnostics first
- top-level symbol certainty over speculative resolution

That means it is already useful today, but it is not pretending to be a fully global language indexer yet.

## What completion currently gives you

- keyword-oriented suggestions
- same-document symbol suggestions
- qualified names such as `group.thread`
- basic scoped completion for obvious group surfaces

## What references currently give you

- same-document top-level references
- optional inclusion of the declaration site

## What is not there yet

- workspace symbols
- cross-file/package-aware references
- rename
- semantic tokens
- advanced completion ranking

## Why it still matters

Even this conservative LSP is already a big usability improvement because it makes parser/runtime diagnostics available in the editor and gives enough symbol navigation to reduce friction when moving around Detian codebases.
