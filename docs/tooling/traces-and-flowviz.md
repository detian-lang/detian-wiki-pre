---
title: Traces, Run Graphs, and Flowviz
description: Tracing execution and visualizing run graphs, autoflow events, and orchestration shape.
---

# Traces, Run Graphs, and Flowviz

Detian can export and inspect execution traces.

## Runtime trace helpers

- `run_graph()`
- `trace_dump()`
- `write_trace(path)`
- `autoflow_trace()`

## Flowviz

`flowviz` reads `run_graph()` and also surfaces autoflow event summaries. It is useful for explaining background execution, cancellation, and the relationship between runs and autoflow scheduling.
