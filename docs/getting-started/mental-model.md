---
title: Mental Model
description: The core mental model for thinking in Detian before you memorize syntax.
---

# Mental Model

If you try to read Detian as "just another general-purpose language," parts of it will feel unusual. The fastest way to learn it is to use the right mental model.

## Think in work graphs, not only functions

In many languages, the central unit is a function call.

In Detian, the central unit is often **a piece of work moving through a graph**.

That graph has a few important dimensions:

- **when work starts**
- **whether work runs in parallel or in sequence**
- **how results flow downstream**
- **how failures, retries, and cancellation are represented**
- **how traces and run handles stay visible to the author**

## Four layers of thought

When reading or writing Detian code, it helps to separate these four layers.

### 1. Data layer

What values exist?

- `int`, `float`, `str`, `bool`
- records, maps, lists, bytes
- error/result wrappers
- duration/timestamp

### 2. Work layer

What threads or handlers exist?

- `group#name`
- `thread#name`
- direct thread calls like `math.inc(41)`

### 3. Flow layer

How does work move?

- `@`
- `|`
- `;`
- `->`
- grouped fan-out/fan-in
- `run#job`, `join`, `cancel`

### 4. Application layer

How do packages and frameworks compose?

- `load "hya" as hya`
- package roots
- capabilities
- server routes, actions, rendering

## The shortest useful intuition

### `@` means "start work"

```detian
@workers.fetch;
```

### `run#job = ...` means "start work and keep control over it"

```detian
run#job = @workers.fetch;
join job;
```

### `|` means parallel branches in the same segment

```detian
@workers.a | workers.b;
```

### `;` means do the next stage after the previous stage finishes

```detian
@workers.a; workers.b;
```

### `->` means pass results into the next stage

```detian
@pipeline.load -> pipeline.transform -> pipeline.save;
```

## Why this matters in practice

This mental model affects everything else.

- packages make more sense
- tracing feels natural
- Hya actions feel like part of the same execution story
- autoflow becomes understandable
- run graphs stop feeling like a separate feature

## Common beginner mistake

A common beginner move is to over-translate Detian into another language in your head.

Examples:

- treating groups as just namespaces
- treating threads as just functions
- treating `@` as decoration instead of execution start
- treating Hya as just HTML helpers instead of a server-first application framework

Groups and threads *can* look function-like, but the language really wants you to think in terms of orchestration and explicit execution structure.

## A good learning habit

When you read Detian code, ask these questions in order:

1. what values exist?
2. what thread/group surfaces exist?
3. what starts execution?
4. what runs in parallel?
5. what is piped to what?
6. where are errors/retries/cancellation represented?
7. what framework/package layer is being used?

If you follow that order, most Detian programs become much easier to read.
