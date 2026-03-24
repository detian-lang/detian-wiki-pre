---
title: Language Overview
description: What Detian is, what it is optimized for, and how to approach it as a learner.
---

# Language Overview

Detian is a **workflow-first / orchestration-first language**. It is designed for cases where the shape of execution matters just as much as the values being computed.

## The central idea

In many languages, you primarily describe:

- values
- functions
- control flow hidden inside function bodies

In Detian, you also describe:

- when work starts
- what runs in parallel
- what runs in sequence
- what gets piped into what
- what should be retried, cancelled, or traced
- how application/framework surfaces compose with those runtime semantics

That is why the language often feels closer to **workflow notation with a real runtime** than to a plain expression language.

## Detian in one example

```detian
group#pipeline {
  thread#load() { return [1, 2, 3]; }
  thread#sum(var#items) { return sum for item in items => item; }
}

@#main {
  @pipeline.load -> pipeline.sum;
}
```

This single example already shows several Detian ideas:

- explicit work start with `@`
- grouped executable surfaces through `group#...`
- thread definitions through `thread#...`
- value movement through `->`

## Three layers

### 1. Language core

This is where you learn:

- `@`, `|`, `;`, `->`
- `run#job`, `join`, `cancel`
- types, records, maps, lists
- nullability and control expressions
- comprehensions and collection helpers

### 2. Builtin and generic module layer

This includes:

- `std.*`
- `builtin/*`
- `html.*`
- `reactive.*`
- `server.*`

These are runtime-provided surfaces that help bridge the language core into practical work.

### 3. Framework/package layer

This includes:

- `hya`
- HYX
- the official package ecosystem

That layer is where Detian becomes useful for web apps, internal tools, persistence, AI workflows, graph visualization, and more.

## What Detian is already good at

- workflow orchestration
- retry/timeout/cancel automation
- explicit run tracking
- server-first local web apps through Hya
- package-driven application composition
- tracing and visualization of execution

## What still matters when learning it

If you approach Detian expecting it to hide all execution detail, you will fight the language.

If you approach it expecting a language that wants execution shape to stay visible, it starts to make much more sense.

That is the right starting mindset.
