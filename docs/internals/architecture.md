---
title: Architecture
description: A practical architectural map of the current Detian implementation.
---

# Architecture

Detian currently has several major layers.

## Parser / front end

- lexer
- parser
- HYX preprocessing and lowering
- AST types

## Runtime

- interpreter
- execution model
- run handles and task runtime
- autoflow scheduling and trace
- error/result plumbing

## Kernel / builtins

- HTML/Hya kernel surfaces
- reactive/fine-grained Hya plumbing
- server and routing support
- utility builtins and capability-checked operations

## Package layer

The repo includes a large official package surface that acts as both user API and integration test ground.

## Hya layer

Hya sits on top of the language/runtime rather than replacing them. That keeps the framework aligned with the workflow-first model of the language itself.

## Tooling

- CLI package operations
- LSP server
- traces and run graph tooling
- flow visualization

## Current design tension

One of the ongoing architectural tensions is how much should remain explicit at the language surface versus how much should be made automatic by the framework/runtime, especially in Hya fine-grained rendering and optimistic action behavior.
