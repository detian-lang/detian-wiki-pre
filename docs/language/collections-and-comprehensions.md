---
title: Collections and Comprehensions
description: Collection helpers, comprehension syntax, and ergonomics for list processing.
---

# Collections and Comprehensions

Detian supports both explicit collection helpers and more concise comprehension syntax.

## Helpers

```detian
collect.map(items, "item", item.name)
collect.filter(items, "item", item.active)
collect.find(items, "item", item.id == wanted)
collect.count(items, "item", item.active)
collect.some(items, "item", item.score >= 90)
collect.every(items, "item", len(item.name) > 0)
collect.sum(items, "item", item.score)
```

## Comprehensions

```detian
[for item in items => item.name]
[for item in items if item.active => item.name]
[for item, idx in items => item.name + "-" + str(idx)]
count for item in items if item.active
sum for item in items => item.score
```

## Practical rule of thumb

- Use comprehensions in application code when you want concise data shaping
- Use `collect.*` when you want explicit variable binding names or more step-by-step readability
- Keep loops for mutation-heavy or control-heavy logic


## List slicing

```detian
var#items = [10, 20, 30, 40, 50];
var#mid = items[1:4];
var#tail = items[2:];
var#head = items[:2];
var#all = items[:];
var#odds = items[::2];
```

Rules:

- current slice support covers lists, strings, and bytes
- `start` is inclusive
- `end` is exclusive
- omitted `start` defaults to `0`
- omitted `end` defaults to `len(list)`
- out-of-range bounds are clamped
- `step` is supported: `items[start:end:step]` or `items[::step]`
- negative bounds count from the end (`-1` means the last element)
- `start > end` returns `[]`
- `step` must currently be a non-zero integer; negative step reverses direction
- single index bracket access is also available: `items[idx]`
- strings return a single-character string on index access
- bytes return an integer byte on index access
- negative indices count from the end for lists, strings, and bytes
- `get(list, idx)` remains valid when you want the explicit builtin form for lists/bytes


## Multi-axis access

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
```

Rules:

- current multi-axis support accepts exactly 2 selectors
- raw nested lists and `ndx.matrix` records are supported
- index + index returns a scalar
- index + slice or slice + index returns a 1D list
- slice + slice returns a 2D result

## Indexed, stepped slice, and multi-axis assignment

```detian
var#items = [10, 20, 30];
items[1] = 99;
items[-1] = 77;
items[0:3:2] = [5, 6];

var#user = { items: [{ field: "a" }, { field: "b" }] };
user.items[1].field = "updated";

var#matrix = [[1, 2], [3, 4]];
matrix[1, 0] = 99;
```

Rules:

- direct list variables and simple field-path list targets are supported
- index must resolve to an integer
- negative indices count from the end
- out-of-range indices are errors
- slice replacement value must be a list
- stepped slice assignment is allowed when the replacement length matches the number of selected slots
- multi-axis assignment currently supports only integer indices and 2D nested-list / `ndx.matrix` targets

## Pure list helper builtins

```detian
var#items = [1, 2, 3];
items = list.push(items, 4);
items = list.prepend(items, 0);
items = list.set(items, -1, 99);
items = list.insert(items, 1, 42);
items = list.remove_at(items, 0);
var#out = list.pop(items);
var#first = list.first(items);
var#last = list.last(items);
items = list.extend(items, [7, 8]);
var#mid = list.pop_at(items, -2);
var#front = list.pop_front(items);
```

Rules:

- these helpers return new lists rather than mutating in place
- `list.set` and `list.remove_at` support negative indices
- `list.insert` currently expects an index in `0..=len(list)`
- `list.pop`, `list.pop_at`, and `list.pop_front` return a record with `list` and `value` fields
- `list.first` / `list.last` return the boundary item or `null` for an empty list
- `list.extend` appends another list and returns a new list
- `std.list.*` aliases are available



## Recurrence sequence literals

```detian
var#ints = [1, 2, ($ * 2 + 1)..., 100];
var#floats = [2.0, 4.0, ($ + 3.0)..., 20.0];
var#times = [100ms, 200ms, ($ + 150ms)..., 1s];
```

Rules:

- requires at least two seed values
- `$` means the previously emitted value
- current support covers `int`, `float`, and `duration`
- recurrence direction is inferred from the first generated value
- history/index access like `$[0]` is not supported in plain recurrence literals
- for advanced history-based recurrence, use `reclist([1, 1, ($[-1] + $[-2])..., 100])`
