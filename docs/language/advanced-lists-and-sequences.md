---
title: Advanced Lists and Sequences
description: Advanced indexing, slicing, multi-axis access, and recurrence list patterns in Detian.
---

# Advanced Lists and Sequences

This page collects the more advanced list and sequence surfaces in one place:

- list/string/bytes indexing
- slicing with steps and negative indices
- multi-axis access on nested lists, `ndx.matrix`, and `ndx.tensor`
- recurrence sequence literals and `reclist(...)`

## 1. Index access

```detian
var#items = [10, 20, 30];
str#name = "detian";
bytes#payload = bytes("hello");

var#first = items[0];
var#last = items[-1];
var#char = name[1];
var#byte = payload[-1];
```

Notes:

- list index returns the item
- string index returns a one-character string
- bytes index returns an integer byte
- negative indices count from the end
- out-of-range index returns `null`

## 2. Slicing

```detian
var#items = [10, 20, 30, 40, 50];

var#mid = items[1:4];
var#tail = items[2:];
var#head = items[:2];
var#all = items[:];
var#every_other = items[::2];
var#reverse = items[::-1];
var#window = items[-3:-1];
```

Rules:

- `start` is inclusive
- `end` is exclusive
- omitted bounds default naturally
- `step` must be non-zero
- negative step reverses direction
- out-of-range bounds are clamped
- `start > end` with positive step yields `[]`

The same bracket slicing model also works for strings and bytes.

## 3. Multi-axis access

### Raw nested lists

```detian
var#rows = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

var#cell = rows[1, 2];
var#row = rows[1, :];
var#col = rows[:, 1];
var#block = rows[0:2, 1:3];
var#rev_cols = rows[:, ::-1];
```

### `ndx.matrix`

```detian
load "ndx" as ndx;

var#matrix = ndx.matrix.from_rows(
  [[1.0, 10.0], [2.0, 20.0], [3.0, 30.0]],
  ["score", "visits"]
);

var#scalar = matrix[1, 1];
var#row = matrix[1, :];
var#col = matrix[:, 1];
var#block = matrix[0:2, 1:2];
```

### `ndx.tensor`

```detian
load "ndx" as ndx;

var#tensor = ndx.tensor.from_flat([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 2]);

var#scalar = tensor[1, 0, 1];
var#face = tensor[:, :, 1];
var#last_axis0 = tensor[..., 0];
```

Current rules:

- raw nested lists / `ndx.matrix` are currently treated as 2D targets
- `ndx.tensor` supports rank-matching selectors
- tensor also supports a single ellipsis
- all-index selectors return a scalar
- mixed index/slice usually returns a 1D result
- slice-based multi-axis selection returns a 2D/n-D structured result

## 4. Sequence literals

### Inferred arithmetic/geometric sequence literals

```detian
[1, 2, ..., 10]
[0, 5, ..., 20]
[1, 2, 4, ..., 16]
[100ms, 200ms, ..., 500ms]
```

### Recurrence sequence literals

```detian
[1, 2, ($ * 2 + 1)..., 100]
[2.0, 4.0, ($ + 3.0)..., 20.0]
[100ms, 200ms, ($ + 150ms)..., 1s]
```

Rules:

- at least two seed values are required
- `$` means the previously emitted value
- current support covers `int`, `float`, and `duration`
- recurrence direction is inferred from the first generated value
- plain recurrence literals do not support `$[...]`

## 5. Advanced recurrence with `reclist(...)`

```detian
reclist([1, 1, ($[-1] + $[-2])..., 100])
reclist([1, 1, 2, ($[-1] + $[-2] + $[-3])..., 100])
```

Rules:

- `reclist(...)` expects exactly one recurrence sequence literal argument
- inside `reclist(...)`, bare `$` is not allowed
- use indexed history references like `$[-1]`, `$[-2]`, `$[0]`
- history indices must currently be integer literals
- the recurrence sees a history snapshot for the current step

## 6. Practical guidance

Use this page when you are doing data-heavy or numeric work and want the shortest reference for Detian's most advanced sequence/list capabilities.

For the broad language picture, start from:

- [Collections and Comprehensions](./collections-and-comprehensions)
- [Language Reference](./language-reference)
- [Types and Data](./types-and-data)
