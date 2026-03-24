# Types and Data

## Core types
- `int`, `float`, `str`, `bool`, `null`
- `bytes`
- `duration`, `timestamp`
- `record`, `list`, `map`
- `error`, `result`, `run`

## Quoted record keys
Reserved keys now work safely in records when quoted.

```detian
var#props = {
  "type": "button",
  "class": "btn"
};
```

## Ternary expression
Detian now supports value-level conditional expressions.

```detian
var#label = count > 2 ? "big" : "small";
```

## Sequence literals
```detian
[1, 2, ..., 10]
[1, 2, 4, ..., 16]
[100ms, 200ms, ..., 500ms]
```

## Collection helpers
Detian now has runtime collection helpers for common list work:

```detian
var#mapped = collect.map(items, "item", item.name);
var#filtered = collect.filter(items, "item", item.active);
var#found = collect.find(items, "item", item.id == target_id);
int#count = collect.count(items, "item", item.active);
bool#some = collect.some(items, "item", item.score >= 90);
bool#every = collect.every(items, "item", len(item.name) > 0);
int#sum = collect.sum(items, "item", item.score);
```

Indexed variants use a fourth argument:

```detian
var#indexed = collect.map(items, "item", "idx", item.name + "-" + str(idx));
```

## Collection comprehension
There is now a shorter comprehension-style surface above the helpers:

```detian
var#names = [for item in items => item.name];
var#active_names = [for item in items if item.active => item.name];
var#indexed = [for item, idx in items => item.name + "-" + str(idx)];
var#mapped = map for item in items => item.name + ":" + str(item.score);
var#filtered = filter for item in items if item.active;
int#active_count = count for item in items if item.active;
int#indexed_sum = sum for item, idx in items => item.score + idx;
bool#has_peak = some for item in items if item.score >= 90;
bool#all_named = every for item in items if len(item.name) > 0;
var#found = find for item in items if item.id == wanted_id;
int#score_total = sum for item in items => item.score;
```

The current first pass supports:
- list comprehension
- `map for ... => ...`
- `filter for ... if ...`
- `count for ... if ...`
- `some for ... if ...`
- `every for ... if ...`
- `find for ... if ...`
- `sum for ... => ...`
