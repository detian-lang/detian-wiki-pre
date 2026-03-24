---
title: Data and Storage Packages
description: Packages for persistence, files, JSON, tabular data, caching, and queues.
---

# Data and Storage Packages

This family covers the packages most applications rely on first.

## Primary packages

- `db`
- `tabular`
- `jsonx`
- `filex`
- `cachex`
- `queuex`
- `datetime`
- `uuidx`

## When to use each

### `db`
Use when you need local SQLite persistence, transactions, or migrations.

### `tabular`
Use for CSV-like ingestion/export pipelines.

### `jsonx`
Use when ordinary field access is not enough and you need path-oriented JSON helpers.

### `filex`
Use for filesystem ergonomics rather than raw builtins alone.

### `cachex`
Use when a SQLite-backed cache is enough and you want deterministic local storage.

### `queuex`
Use for durable queue-like workflows that fit SQLite-backed task processing.

## Common stack

A very common Detian internal-tool stack is:

- `db`
- `jsonx`
- `tabular`
- `cachex`
- `queuex`

This gives you persistence, import/export, caching, and background-style queue patterns without leaving the core Detian ecosystem.
