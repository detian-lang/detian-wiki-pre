---
title: Runtime Architecture Deep Dive
description: A more detailed map of the parser, runtime, kernel, packages, and Hya stack.
---

# Runtime Architecture Deep Dive

This page expands the shorter architecture overview.

## Front end

- lexer tokenization
- parser construction of AST
- HYX preprocessing and lowering
- parser-focused diagnostics

## Runtime core

- interpreter state and bindings
- execution of statements and expressions
- run handle lifecycle
- task runtime storage
- autoflow scheduling and trace
- error/result propagation

## Kernel layer

- HTML kernel
- reactive/fine-grained Hya support
- server and routing kernel
- collections and utility kernels

## Package surface

The package layer is not merely add-on convenience. In practice it is one of the main user-facing surfaces of Detian, and many features become real and testable through the package ecosystem first.

## Hya/HYX layer

Hya sits above the runtime and exposes a server-first application model. HYX lowers into Hya rather than becoming a separate runtime.

## Tooling

The CLI, LSP, traces, and generated docs form the developer experience layer around the interpreter and framework.
