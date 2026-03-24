---
title: Internal Tool Stack
description: A practical package stack for a local Detian internal tool.
---

# Internal Tool Stack

A very practical Detian internal-tool stack looks like this:

- `hya`
- `db`
- `jsonx`
- `queuex`
- `cachex`
- `regex`
- `httpx`
- `metricsx`

## Why this combination works

- `hya` provides the app shell
- `db` provides durable local persistence
- `jsonx` helps with nested payload access
- `queuex` and `cachex` handle durable background-ish work and caching
- `regex` helps with messy user input and text normalization
- `httpx` handles external service access
- `metricsx` helps visibility and operational reporting

## Mental model

This stack is good when you want a **single-language internal app** with explicit execution, strong local tooling, and deterministic behavior.
