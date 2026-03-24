---
title: Detian Wiki
description: A practical, detailed English wiki for the Detian language, runtime, package ecosystem, and Hya framework.
slug: /intro
---

# Detian Wiki

Detian is a **workflow-first / orchestration-first language**. It does not hide execution shape behind purely function-oriented syntax. Instead, it makes scheduling, sequencing, grouping, cancellation, retries, tracing, and package composition visible at the language surface.

This site is intentionally broad and deep. It is written for two overlapping audiences:

1. people trying to **learn and use Detian successfully**
2. people trying to **understand or extend the implementation**

## Read this early

If you want the positioning story first—where Detian is stronger than mainstream languages, what it is best at, and where it is not trying to compete—read [Why Detian?](./why-detian).

## What makes Detian different

Most languages lead with expressions and function composition. Detian leads with **execution structure**:

- `@` starts work
- `|` fans out parallel segments
- `;` sequences stages
- `->` pipes values across stages
- `run#job = ...`, `join`, and `cancel` make task control explicit
- tracing and run graphs are part of the story, not an afterthought

That means Detian is useful anywhere the shape of work matters:

- automation
- orchestration
- workflow engines
- internal tools
- server-first UI apps through Hya
- multi-step data processing
- package-driven application composition

## How to use this wiki

If you are new, do **not** start with the language reference.

Use this path instead:

1. [Installation and Running](./getting-started/installation-and-running)
2. [Mental Model](./getting-started/mental-model)
3. [First Program](./getting-started/first-program)
4. [Groups, Threads, and Main](./language/groups-threads-and-main)
5. [Flows, Pipes, and Run Handles](./language/flows-pipes-and-run-handles)
6. [Types and Data](./language/types-and-data)
7. [Hya Overview](./hya/hya-overview)
8. [Build a Small Hya App](./guides/build-a-small-hya-app)

If you already know the basics, the most useful areas are usually:

- [Language Reference](./language/language-reference)
- [Package Catalog](./packages/package-catalog)
- [Fine-Grained Reactivity](./hya/fine-grained-reactivity)
- [LSP](./tooling/lsp)
- [Architecture](./internals/architecture)

## What is covered here

- language syntax, semantics, and data model
- Hya and HYX authoring
- dynamic routing, actions, and server-first UI patterns
- fine-grained rendering milestones and current implementation limits
- official packages and how to choose between them
- diagnostics, error-message philosophy, LSP, traces, and developer tooling
- internal architecture and roadmap direction

## Quick commands

```bash
cargo build --release
cargo run -- examples/ultimate_showcase.det
cargo run -- examples/hya_server.det
cargo run -- examples/launchpad_crm
cargo run -- lsp
cargo test -q -- --test-threads=1
```

## Reading style of this wiki

This site tries to balance three things:

- **reference precision** for people searching for an exact surface
- **tutorial pacing** for people learning Detian from scratch
- **implementation honesty** for people who need to know what is already real, what is experimental, and what is only planned

Where Detian is intentionally conservative, this wiki will say so. Where a feature is implemented as a narrow vertical slice rather than a universal abstraction, that will also be called out clearly.
