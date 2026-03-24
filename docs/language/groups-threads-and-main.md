---
title: Groups, Threads, and Main
description: The structural units of Detian programs and how they relate to execution.
---

# Groups, Threads, and Main

Detian programs are organized around **groups** and **threads**.

## Groups

A group is the unit that collects related executable surfaces.

```detian
group#math {
  thread#inc(int#x) { return x + 1; }
  thread#dec(int#x) { return x - 1; }
}
```

You can think of a group as:

- a namespace
- a workflow surface
- a unit that often maps well to a domain concept

Examples:

- `math`
- `pipeline`
- `pages`
- `components`
- `actions`

## Threads

A thread is an executable unit inside a group.

```detian
thread#inc(int#x) {
  return x + 1;
}
```

Threads can be used in multiple ways:

- direct expression calls: `math.inc(41)`
- explicit execution flow: `@math.inc(41);`
- mounted as Hya handlers: `hya.mount("components.counter", ...)`
- dispatched as reducers/actions: `hya.dispatch("actions.increment", ...)`

## Parameters and typing

```detian
thread#bundle(str#prefix, var#parts...) {
  return prefix;
}
```

Threads support:

- typed parameters
- variadic parameters
- effect annotations like `@pure`, `@read`, `@io`, `@ordered`, `@side_effect`

## Main

The explicit entrypoint is:

```detian
@#main {
  print("hello");
}
```

This keeps the execution surface obvious and consistent with the rest of the language.

## Recommended project structure

For larger apps, groups often fall into recognizable patterns.

### Workflow-heavy app

- `pipeline`
- `jobs`
- `events`
- `report`

### Hya app

- `pages`
- `components`
- `actions`
- `web`

That separation makes both execution and failure/debug context easier to understand.
