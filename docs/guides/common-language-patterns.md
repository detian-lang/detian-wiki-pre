---
title: Common Language Patterns
description: Reusable patterns for workflow code, records, retries, modules, and Hya apps.
---

# Common Language Patterns

## Handle-first background work

```detian
run#job = @workers.fetch;
join job;
```

Use this when you want explicit visibility and control.

## Fan-out / fan-in pipelines

```detian
@prepare -> ( @score.a | @score.b ) -> report.build;
```

Use this when one upstream result needs to feed multiple branches.

## Safe null handling

```detian
var#label = user?.profile?.name ?? "guest";
```

## State reducer pattern

```detian
thread#increment(map#state, map#payload) {
  return { count: state.count + payload.delta };
}
```

## Capability-aware package design

Keep capability-heavy code close to the edges of your system. Let pure transformation logic live in ordinary groups/threads, and isolate filesystem/network/server actions clearly.
