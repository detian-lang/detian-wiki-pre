---
title: Error, Result, and Diagnostics
description: Error values, result values, assertions, and diagnostics design.
---

# Error, Result, and Diagnostics

Detian treats failures as part of normal program structure, not only as out-of-band exceptions.

## Error values

```detian
error#e = error("not authorized", "auth");
```

## Result values

```detian
result#ok_res = result_ok({ user: "detian" });
result#err_res = result_err(e);
```

## Helpers

- `is_ok(result)`
- `is_err(result)`
- `unwrap(result)`
- `unwrap_err(result)`

## Assertions

```detian
assert score > 0;
assert user != null, "user must exist";
```

## Diagnostics philosophy

The project increasingly prefers messages that say:

- what failed
- what was found
- what was expected
- what the next likely fix is

That philosophy now shows up in parser errors, runtime operator errors, variable/field suggestions, and LSP diagnostics.
