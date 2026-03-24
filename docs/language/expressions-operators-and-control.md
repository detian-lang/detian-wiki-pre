---
title: Expressions, Operators, and Control
description: Direct expression calls, conditionals, operators, and control constructs.
---

# Expressions, Operators, and Control

## Direct expression calls

```detian
int#value = math.inc(41);
```

Detian supports direct thread-style expression calls while still keeping execution-shape syntax available when you need it.

## Conditionals

### Statement-level

```detian
if (ok) {
  print("yes");
} else {
  print("no");
}
```

### Expression-level ternary

```detian
var#label = count > 2 ? "big" : "small";
```

## Operators

### Arithmetic

- `+`
- `-`
- `*`
- `/`
- `%`

### Comparison

- `==`
- `!=`
- `<`
- `>`
- `<=`
- `>=`

### Boolean

Detian prefers:

- `and`
- `or`
- `not`

rather than `&&` and `||`.

### Null-aware

- `??`
- `?.field`

## Loops

```detian
loop 3 {
  print("tick");
}

while (keep_going) {
  print("work");
}
```

## Retry / timeout / try

Detian includes orchestration-oriented control blocks such as:

- `retry`
- `timeout`
- `try / on fail / finally`

These are part of the language’s workflow-first nature.
