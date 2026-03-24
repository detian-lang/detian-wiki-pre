---
title: Flows, Pipes, and Run Handles
description: The execution-shape language of Detian.
---

# Flows, Pipes, and Run Handles

This is one of the most important Detian pages.

## Start execution with `@`

If `@` still feels unusual, read [The `@` Sigil and Execution Start](./at-sign-and-execution-start.md) before going deeper into flows. It covers the core distinction between value evaluation and execution start.


```detian
@workers.fetch;
```

This does not merely reference a thread. It starts work.

## Parallel segments with `|`

```detian
@workers.a | workers.b;
```

Both branches are part of the same segment.

## Sequential segments with `;`

```detian
@workers.a; workers.b;
```

The second stage only starts after the first segment completes.

## Piping with `->`

```detian
@pipeline.load -> pipeline.transform -> pipeline.save;
```

This moves values through stages.

## Grouped fan-out / fan-in

```detian
@pipeline.load -> ( @score.left | @score.right ) -> report.build;
```

This is one of Detian’s signature patterns.

## Run handles

```detian
run#job = @workers.fetch;
join job;
cancel job;
```

Run handles matter because they make asynchronous control explicit.

## Run metadata

Run handles carry useful fields:

- `id`
- `label`
- `status`
- `done`
- `started_ms`
- `finished_ms`
- `duration_ms`
- `parent`
- `children`
- `error`

## Traces

```detian
var#graph = run_graph();
var#dump = trace_dump();
write_trace("trace.json");
```

Detian’s execution story is stronger when you use traces together with run handles.
