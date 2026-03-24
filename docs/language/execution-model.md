---
title: Execution Model
description: The meaning of @, pipes, segments, grouped parallel stages, and run handles.
---

# Execution Model

The execution model is the heart of Detian.

## `@` starts work

If you want the detailed explanation of **why** `@foo.bar()` is not the same thing as `foo.bar()`, read [The `@` Sigil and Execution Start](./at-sign-and-execution-start.md). That page explains the evaluation-vs-execution distinction in depth.


```detian
@workers.fetch;
```

This is not just a reference. It starts execution.

## Parallel segments

```detian
@workers.a | workers.b;
```

The segment contains two branches that run in parallel.

## Sequential segments

```detian
@workers.a; workers.b;
```

The next segment starts only after the previous segment finishes.

## Pipes

```detian
@load -> transform -> save;
```

Pipes move values through execution stages.

## Grouped parallel pipe

```detian
@prepare -> ( @score.a | @score.b ) -> report.build;
```

This means:

1. run `prepare`
2. send the result into both `score.a` and `score.b`
3. run those branches in parallel
4. collect the branch results in declaration order
5. pass the collected results into `report.build`

## Run handles

```detian
run#job = @workers.fetch;
join job;
print(job.status);
```

Use a run handle when you want explicit control and visibility.

## Why this matters

The execution model is not separate from the language. It is the language’s most important differentiator. When in doubt, ask:

- where does execution start?
- what is running now?
- what is being piped?
- what is still deferred?
- where can I inspect or cancel work?
