---
title: Regex and Text Processing
description: Extract IDs, normalize text, and split structured strings with the regex package.
---

# Regex and Text Processing

`regex` becomes especially useful once your data stops being clean.

## Match

```detian
bool#ok = regex.core.is_match("^[a-z]+$", "detian");
```

## Find and capture

```detian
var#caps = regex.core.captures("([A-Za-z]+)-([0-9]+)", "lead-204");
str#kind = regex.core.capture_at("([A-Za-z]+)-([0-9]+)", "lead-204", 1);
str#id = regex.core.capture_at("([A-Za-z]+)-([0-9]+)", "lead-204", 2);
```

## Replace and normalize

```detian
str#normalized = regex.core.replace("\s+", "a   b", "-");
```

## Split

```detian
var#parts = regex.core.split("\s+", "lead-204 ready codex@example.com");
```

## Practical pairing

`regex` pairs very well with:

- `jsonx`
- `tabular`
- `clix`
- `httpx`
