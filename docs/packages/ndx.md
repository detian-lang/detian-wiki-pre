---
title: Numeric kernel helpers
description: Small vector, matrix, and reduction helpers for Detian-native numeric workflows.
---

# Numeric kernel helpers

`ndx` is a **small Detian-native numeric package** for generic vector/matrix/statistics work.

Think of it as a small NumPy-like layer, but deliberately narrow:

- vectors
- 2D matrices
- axis-0 reductions
- matvec / matmul

It is not trying to be a full tensor or dataframe system.

## Why you would use it

Use `ndx` when you need reusable numeric kernels that are more generic than `mathx`'s scalar/vec2 helpers but much smaller and simpler than a full scientific-computing runtime.

Typical fit:

- reusable matrix helpers for ML packages like `ezml`
- local analytical transforms on rows/columns
- package-level numeric plumbing where explicit record-based data is preferred

## Import

```detian
load "ndx" as ndx;
```

## Matrix contract

Matrices use an explicit record shape:

```detian
{
  rows: [[1.0, 2.0], [3.0, 4.0]],
  row_count: 2,
  col_count: 2,
  column_names: ["x1", "x2"]
}
```

## Example: matrix shaping and axis stats

```detian
load "ndx" as ndx;

var#matrix = ndx.matrix.from_rows(
  [[1.0, 10.0], [2.0, 20.0], [3.0, 30.0]],
  ["score", "visits"]
);

var#shape = ndx.matrix.shape(matrix);
var#visits = ndx.matrix.take_named_cols(matrix, ["visits"]);
var#means = ndx.stats.mean_axis0(matrix);

print(json_stringify({
  row_count: shape.row_count,
  col_count: shape.col_count,
  visits_cols: visits.col_count,
  means: means
}));
```

## Example: transpose / matvec / matmul

```detian
load "ndx" as ndx;

var#matrix = ndx.matrix.from_rows(
  [[1.0, 10.0], [2.0, 20.0], [3.0, 30.0]],
  ["score", "visits"]
);

var#transpose = ndx.matrix.transpose(matrix);
var#product = ndx.matrix.matvec(matrix, [0.5, 0.1]);
var#gram = ndx.matrix.matmul(transpose, matrix);

print(json_stringify({
  transpose_rows: transpose.row_count,
  transpose_cols: transpose.col_count,
  product_last: get(product, 2),
  gram_cols: gram.col_count
}));
```

## Example: multi-axis matrix access

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

## Full example in this repo

```bash
cargo run --quiet -- examples/ndx_demo
```

## Source-derived surface

Implementation note: helper groups with `_internal` in the source are runtime plumbing and not intended as the stable public API.

### `vector.det` → group `vector`

- `dot(var#a, var#b)`
- `add(var#a, var#b)`
- `sub(var#a, var#b)`
- `scale(var#v, var#factor)`
- `norm_l2(var#v)`
- `distance_l2(var#a, var#b)`

### `matrix.det` → group `matrix`

- `from_rows(var#rows, var#column_names)`
- `shape(var#matrix)`
- `row(var#matrix, int#index)`
- `col(var#matrix, int#index)`
- `take_rows(var#matrix, var#indices)`
- `take_cols(var#matrix, var#indices)`
- `take_named_cols(var#matrix, var#names)`
- `transpose(var#matrix)`
- `matvec(var#matrix, var#vector)`
- `matmul(var#left, var#right)`

### `stats.det` → group `stats`

- `sum(var#values)`
- `mean(var#values)`
- `minmax(var#values)`
- `variance(var#values)`
- `stddev(var#values)`
- `mean_axis0(var#matrix)`
- `stddev_axis0(var#matrix)`
- `minmax_axis0(var#matrix)`

## Tensor contract

Dense tensors use an explicit record shape:

```detian
{
  values: [1.0, 2.0, 3.0, 4.0],
  shape: [2, 2]
}
```

## Example: tensor metadata and indexing

```detian
load "ndx" as ndx;

var#tensor = ndx.tensor.from_rows([[1.0, 2.0], [3.0, 4.0]]);
var#shape = ndx.tensor.shape(tensor);
var#ndim = ndx.tensor.ndim(tensor);
var#size = ndx.tensor.size(tensor);
var#value = ndx.tensor.get(tensor, [1, 1]);
var#reshaped = ndx.tensor.reshape(tensor, [4]);
```

### `tensor.det` → group `tensor`

- `from_flat(var#values, var#shape)`
- `zeros(var#shape)`
- `full(var#shape, var#value)`
- `shape(var#tensor)`
- `ndim(var#tensor)`
- `size(var#tensor)`
- `reshape(var#tensor, var#shape)`
- `get(var#tensor, var#indices)`
- `from_rows(var#rows)`
- `to_rows(var#tensor)`

## Example: tensor multi-axis access

```detian
load "ndx" as ndx;

var#tensor_cube = ndx.tensor.from_flat([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 2]);
var#scalar = tensor_cube[1, 0, 1];
var#face = tensor_cube[:, :, 1];
```

## Ellipsis

```detian
load "ndx" as ndx;

var#tensor_cube = ndx.tensor.from_flat([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 2]);
var#face = tensor_cube[..., 0];
```

At most one ellipsis is allowed. It expands to enough full-axis selectors to match the tensor rank.

## Relation to other packages

- `mathx` stays focused on scalar helpers, vec2 helpers, and curves
- `ndx` handles generic list/vector/matrix numeric kernels
- `ezml` can build ML workflow helpers on top of `ndx` instead of carrying every numeric primitive itself

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
