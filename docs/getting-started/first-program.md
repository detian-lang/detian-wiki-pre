---
title: First Program
description: A small but realistic first Detian program with direct calls and flow-shaped execution.
---

# First Program

A minimal Detian program usually has:

- one or more groups
- one or more threads inside each group
- an `@#main { ... }` block as the entry point

## Minimal example

```detian
group#math {
  thread#inc(int#x) {
    return x + 1;
  }
}

@#main {
  int#value = math.inc(41);
  print(value);
}
```

## What is happening

### `group#math`

Defines a named execution surface. You can think of it as a namespace-like unit, but in Detian it is also part of the execution model.

### `thread#inc`

Defines a callable thread.

```detian
thread#inc(int#x) {
  return x + 1;
}
```

This thread takes one typed parameter and returns a value.

### `@#main`

The entry point block.

Detian programs do not execute top-level statements in the same style as many scripting languages. The main block keeps the entry surface explicit.

## A flow-shaped version

Here is a slightly more Detian-shaped example:

```detian
group#pipeline {
  thread#load() {
    return [1, 2, 3, 4];
  }

  thread#sum(var#items) {
    return sum for item in items => item;
  }
}

@#main {
  @pipeline.load -> pipeline.sum;
}
```

This reads as:

1. start `pipeline.load`
2. pipe the result into `pipeline.sum`

## Another useful variation: explicit run control

```detian
group#workers {
  thread#slow() {
    sleep 100ms;
    return "done";
  }
}

@#main {
  run#job = @workers.slow;
  join job;
  print(job.status);
}
```

This is important because it shows that execution control is a first-class part of the language surface.

## What to practice next

After this page, the best next pages are:

- [Groups, Threads, and Main](../language/groups-threads-and-main)
- [Flows, Pipes, and Run Handles](../language/flows-pipes-and-run-handles)
- [Types and Data](../language/types-and-data)
