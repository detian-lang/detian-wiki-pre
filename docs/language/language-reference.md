---
title: Language Reference
description: The compact but serious reference for Detian’s implemented syntax and behavior.
---

# Language Reference

This page is a compact reference, not the best first learning page.

## Declarations

```detian
const int#PORT = 8080;
var#name = "Detian";
int#count = 1;
```

## Groups and threads

```detian
group#jobs {
  thread#run(int#count) {
    return count + 1;
  }
}
```

## Main

```detian
@#main {
  print("hello");
}
```

## Core execution operators

- `@` start execution
- `|` parallel segment
- `;` sequential segment boundary
- `->` pipe value flow

## Run control

- `run#job = @...`
- `join job`
- `cancel job`

## Types

- `int`
- `float`
- `str`
- `bool`
- `bytes`
- `map`
- `duration`
- `timestamp`
- `error`
- `result`
- `var`
- `dynamic`
- `T?`
- unions like `int|str`

## Data forms

- records
- typed records
- maps
- lists
- bytes
- JSON stringification/parsing

## Nullability

- `T?`
- `??`
- `?.field`

## Expressions

- arithmetic
- comparison
- `and` / `or` / `not`
- ternary `cond ? a : b`

## Control blocks

- `if`
- `while`
- `loop`
- `retry`
- `timeout`
- `try / on fail / finally`

## Comprehensions

- list comprehensions
- `count for ...`
- `sum for ...`
- `map for ...`
- `find for ...`
- `some for ...`
- `every for ...`

## List slicing

- `items[start:end]`
- `items[start:]`
- `items[:end]`
- `items[:]`
- `items[start:end:step]`
- `items[::step]`
- current support covers lists, strings, and bytes
- `step` must currently be a positive integer
- single index access can use `items[idx]`; strings return a one-character string and bytes return an integer byte
- negative indices count from the end
- `get(list, idx)` remains valid for explicit builtin-style list/bytes access

## Hya/HYX-related surfaces

The reference also intersects with Hya through:

- `hya.mount`, `hya.dispatch`, `hya.state`
- HYX lowering
- fine-grained helper surfaces

For more guided material, use the Hya and package sections instead of relying only on this page.
