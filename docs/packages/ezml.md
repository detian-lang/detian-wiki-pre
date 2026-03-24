---
title: Easy machine learning
description: Numeric/tabular-first baseline ML helpers for datasets, preprocessing, splits, models, and evaluation.
---

# Easy machine learning

`ezml` is Detian’s first-slice machine learning package for **small and medium numeric/tabular workflows**.

Internally, `ezml` now leans on `ndx` for reusable numeric kernels and keeps the ML-specific orchestration/model logic on the `ezml` side.

It is intentionally narrow:

- numeric features only
- train/test style local workflows
- baseline supervised models
- explicit preprocessing and evaluation

## Why you would use it

Use `ezml` when you want a higher-level ML surface than hand-written math/statistics glue, but do **not** want a deep-learning framework or a dataframe engine.

Typical fit:

- quick baseline models for internal tools
- local CSV/tabular experiments
- deterministic preprocessing + holdout evaluation
- package-level ML flows that still feel like ordinary Detian code

## Import

```detian
load "ezml" as ezml;
```

## Example: quick kNN baseline from rows

```detian
load "ezml" as ezml;

var#dataset = ezml.dataset.from_rows([
  { x1: 0.0, x2: 0.0, label: "cold" },
  { x1: 0.0, x2: 1.0, label: "cold" },
  { x1: 1.0, x2: 1.0, label: "hot" },
  { x1: 2.0, x2: 1.0, label: "hot" }
], ["x1", "x2"], "label");

var#split = ezml.split.train_test(dataset, 0.25, 42);
var#model = ezml.knn.fit_classifier(split.train_set, {
  k: 3,
  weighted: true
});
var#pred = ezml.knn.predict_classifier_batch(model, split.test_set.features);
var#report = ezml.metrics.classification_report(split.test_set.labels, pred, "hot");
print(json_stringify(report));
```

## Example: CSV -> scale -> logistic regression

```detian
load "ezml" as ezml;

var#dataset = ezml.dataset.from_csv("./leads.csv", ["score", "visits"], "converted");
var#split = ezml.split.train_test(dataset, 0.2, 17);

var#scaler = ezml.preprocess.fit_minmax_scaler(split.train_set);
var#train_set = ezml.preprocess.apply_minmax_scaler(split.train_set, scaler);
var#test_set = ezml.preprocess.apply_minmax_scaler(split.test_set, scaler);

var#model = ezml.linear.fit_logistic(train_set, {
  epochs: 280,
  learning_rate: 0.2,
  positive_label: "hot",
  negative_label: "cold"
});

var#pred = ezml.linear.predict_class_batch(model, test_set.features, 0.5);
var#report = ezml.metrics.classification_report(test_set.labels, pred, model.positive_label);
print(json_stringify(report));
```

## Example: regression + model save/load

```detian
load "ezml" as ezml;

var#dataset = ezml.dataset.from_rows([
  { size: 10.0, rooms: 1.0, price: 120.0 },
  { size: 20.0, rooms: 2.0, price: 210.0 },
  { size: 30.0, rooms: 3.0, price: 320.0 },
  { size: 40.0, rooms: 4.0, price: 430.0 }
], ["size", "rooms"], "price");

var#split = ezml.split.train_test(dataset, 0.25, 9);
var#scaler = ezml.preprocess.fit_standard_scaler(split.train_set);
var#train_set = ezml.preprocess.apply_standard_scaler(split.train_set, scaler);
var#test_set = ezml.preprocess.apply_standard_scaler(split.test_set, scaler);

var#model = ezml.linear.fit_regression(train_set, {
  epochs: 400,
  learning_rate: 0.1
});

var#pred = ezml.linear.predict_regression_batch(model, test_set.features);
var#report = ezml.metrics.regression_report(test_set.labels, pred);

var#saved = ezml.modelio.save_model("./price-model.json", model);
var#loaded = ezml.modelio.read_model("./price-model.json");
var#info = ezml.modelio.describe_model(loaded);

print(json_stringify({ report: report, saved: saved, info: info }));
```

## Full example in this repo

```bash
cargo run --quiet -- examples/ezml_demo
```

## Example: dataset shaping helpers

```detian
load "ezml" as ezml;

var#dataset = ezml.dataset.from_feature_rows(
  [[1.0, 10.0], [2.0, 20.0], [3.0, 30.0]],
  ["cold", "warm", "hot"],
  ["score", "visits"],
  "label"
);

var#head = ezml.dataset.head(dataset, 2);
var#selected = ezml.dataset.select_features(dataset, ["visits"]);
var#subset = ezml.dataset.take_rows(dataset, [0, 2]);

print(json_stringify({
  head_rows: head.row_count,
  selected_features: selected.feature_names,
  subset_rows: subset.row_count
}));
```

## Example: k-fold cross-validation split

```detian
load "ezml" as ezml;

var#dataset = ezml.dataset.from_rows([
  { x1: 0.0, x2: 0.0, label: "cold" },
  { x1: 0.0, x2: 1.0, label: "cold" },
  { x1: 1.0, x2: 0.0, label: "warm" },
  { x1: 1.0, x2: 1.0, label: "hot" },
  { x1: 2.0, x2: 0.0, label: "warm" },
  { x1: 2.0, x2: 1.0, label: "hot" },
  { x1: 3.0, x2: 0.0, label: "warm" },
  { x1: 3.0, x2: 1.0, label: "hot" }
], ["x1", "x2"], "label");

var#kfold = ezml.split.k_fold(dataset, 4, 29);
print(json_stringify({
  fold_count: len(kfold.folds),
  first_test_rows: get(kfold.folds, 0).test_set.row_count
}));
```

## Source-derived surface

Implementation note: helper groups with `_internal` in the source are runtime plumbing and not intended as the stable public API.

### `dataset.det` → group `dataset`

- `from_rows(var#rows, var#feature_keys, str#label_key)`
- `from_feature_rows(var#features, var#labels, var#feature_names, str#label_name)`
- `from_csv(str#path, var#feature_keys, str#label_key)`
- `take_rows(var#dataset, var#indices)`
- `head(var#dataset, var#count)`
- `select_features(var#dataset, var#feature_keys)`
- `summary(var#dataset)`
- `feature_names(var#dataset)`
- `row_count(var#dataset)`

### `preprocess.det` → group `preprocess`

- `fit_standard_scaler(var#dataset)`
- `apply_standard_scaler(var#dataset, var#scaler)`
- `fit_minmax_scaler(var#dataset)`
- `apply_minmax_scaler(var#dataset, var#scaler)`

### `split.det` → group `split`

- `train_test(var#dataset, var#test_ratio, int#seed)`
- `k_fold(var#dataset, int#k, int#seed)`

Preferred result fields are `train_set` and `test_set`; `holdout_set` is also available as an alias for the test side. `k_fold` returns `{ k, seed, row_count, folds }`.

### `linear.det` → group `linear`

- `fit_regression(var#dataset, var#opts)`
- `predict_regression(var#model, var#features)`
- `predict_regression_batch(var#model, var#feature_rows)`
- `predict_regression_dataset(var#model, var#dataset)`
- `fit_logistic(var#dataset, var#opts)`
  - supports explicit `positive_label` / `negative_label` in `opts`
- `predict_proba(var#model, var#features)`
- `predict_proba_batch(var#model, var#feature_rows)`
- `predict_proba_dataset(var#model, var#dataset)`
- `predict_class(var#model, var#features, var#threshold)`
- `predict_class_batch(var#model, var#feature_rows, var#threshold)`
- `predict_class_dataset(var#model, var#dataset, var#threshold)`

### `knn.det` → group `knn`

- `fit_classifier(var#dataset, var#opts_or_k)`
  - accepts either a legacy integer `k` or an options record like `{ k: 3, weighted: true }`
- `predict_classifier(var#model, var#features)`
- `predict_classifier_batch(var#model, var#feature_rows)`
- `predict_classifier_dataset(var#model, var#dataset)`

### `metrics.det` → group `metrics`

- `mse(var#actual, var#predicted)`
- `rmse(var#actual, var#predicted)`
- `mae(var#actual, var#predicted)`
- `r2(var#actual, var#predicted)`
- `accuracy(var#actual, var#predicted)`
- `binary_counts(var#actual, var#predicted, var#positive_label)`
- `precision(var#actual, var#predicted, var#positive_label)`
- `recall(var#actual, var#predicted, var#positive_label)`
- `f1(var#actual, var#predicted, var#positive_label)`
- `confusion_matrix(var#actual, var#predicted)`
- `regression_report(var#actual, var#predicted)`
- `classification_report(var#actual, var#predicted, var#positive_label)`

### `modelio.det` → group `modelio`

Preferred names:

- `save_model(str#path, var#model)`
- `read_model(str#path)`
- `describe_model(var#model)`

Compatibility aliases also exist:

- `save(str#path, var#model)`
- `load_model(str#path)`
- `describe(var#model)`

## Training summary and dataset-level predict

Model-fitting surfaces now return `training_summary` so you can inspect the final loss and basic fit metadata without recomputing it manually. Dataset-level predict helpers also return a stable record with `actual`, `predictions`, `row_count`, `feature_names`, and `label_name`, which makes evaluation/report flows shorter and more consistent.

## Evaluation/report structure

`binary_counts(...)` gives you the explicit binary confusion breakdown (`tp`, `tn`, `fp`, `fn`) without having to unpack a broader report object.

`classification_report(...)` now returns:
- top-level legacy fields such as `accuracy`, `precision`, `recall`, and `f1`
- nested `metrics`
- nested `binary_counts` / `counts`
- nested `support`
- full `confusion` matrix

`regression_report(...)` now returns:
- top-level legacy fields such as `mse`, `rmse`, `mae`, and `r2`
- `mean_error`
- nested `metrics`
- nested `error_summary`

## Logistic label contract

Default rule:
- `negative_label` = first label seen
- `positive_label` = first distinct later label

If you want deterministic semantics independent of row order, pass them explicitly in `fit_logistic(..., { positive_label: ..., negative_label: ... })`.

## kNN weighting

`fit_classifier` now accepts either:
- `fit_classifier(dataset, 3)`
- `fit_classifier(dataset, { k: 3, weighted: true })`

When `weighted` is `true`, inverse-distance vote score becomes the primary ranking signal.

## Practical guidance

A typical `ezml` flow is:

1. build a dataset from rows or CSV
2. split deterministically with a seed
3. fit a scaler on the training side only
4. train a baseline model
5. evaluate with explicit metrics
6. optionally save the model to JSON

That flow matches Detian’s package/orchestration orientation better than trying to hide the pipeline behind a giant magic abstraction.

## Current scope and honesty

`ezml` is deliberately **not** a deep-learning framework.

Current limitations:

- numeric features only
- binary logistic regression only
- aimed at baseline/local workflows, not large-scale training
- internal `_internal` helper groups are exposed today because of current runtime/package constraints

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
