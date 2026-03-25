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

## Recurrence sequence literals

- `[1, 2, ($ * 2 + 1)..., 100]`
- requires at least two seed values
- `$` means the previously emitted value
- current support covers `int`, `float`, and `duration`
- `reclist([1, 1, ($[-1] + $[-2])..., 100])` enables indexed history access

## List slicing

- `items[start:end]`
- `items[start:]`
- `items[:end]`
- `items[:]`
- `items[start:end:step]`
- `items[::step]`
- current support covers lists, strings, and bytes
- `step` must currently be a non-zero integer; negative step reverses direction
- single index access can use `items[idx]`; strings return a one-character string and bytes return an integer byte
- negative indices count from the end
- `get(list, idx)` remains valid for explicit builtin-style list/bytes access
- pure list helpers: `list.push`, `list.prepend`, `list.set`, `list.insert`, `list.remove_at`, `list.first`, `list.last`, `list.pop`, `list.extend`, `list.pop_at`, `list.pop_front` (`std.list.*` aliases too)
- indexed list assignment: `items[idx] = value`, `user.items[idx] = value`, `user.items[idx].field = value`
- slice list assignment: `items[a:b] = replacement_list` and `items[a:b:step] = replacement_list`
- multi-axis assignment: `matrix[i, j] = value` for raw nested lists / `ndx.matrix`

## Front-end preprocessing

- HYX blocks are preprocessed/lowered before parsing
- resolver/linking rewrites known builtin and thread calls
- literal-only arithmetic / conditional / index / slice expressions are constant-folded before runtime

## Multi-axis access

- `items[row, col]`
- `items[row, :]`
- `items[:, col]`
- `items[row_start:row_end, col_start:col_end]`
- current support is 2-selector only
- raw nested lists and `ndx.matrix` records are supported
- `ndx.tensor` supports rank-matching selectors and a single ellipsis such as `tensor[..., 0]`

## Hya/HYX-related surfaces

The reference also intersects with Hya through:

- `hya.mount`, `hya.dispatch`, `hya.state`
- HYX lowering
- fine-grained helper surfaces

For more guided material, use the Hya and package sections instead of relying only on this page.
