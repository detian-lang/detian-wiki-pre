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
```

Rules:

- current slice support covers lists, strings, and bytes
- `start` is inclusive
- `end` is exclusive
- omitted `start` defaults to `0`
- omitted `end` defaults to `len(list)`
- out-of-range bounds are clamped
- negative bounds count from the end (`-1` means the last element)
- `start > end` returns `[]`
- single index bracket access is also available: `items[idx]`
- strings return a single-character string on index access
- bytes return an integer byte on index access
- negative indices count from the end for lists, strings, and bytes
- `get(list, idx)` remains valid when you want the explicit builtin form for lists/bytes
