---
title: Nullability and Autoflow
description: Nullable types, null-coalescing, optional field access, and autoflow scheduling.
---

# Nullability and Autoflow

## Nullability

Detian supports nullable types directly in the type surface.

```detian
str?#name = null;
var#label = name ?? "guest";
var#city = user?.profile?.city;
```

### Current nullable surface

- `T?` as nullable type sugar
- `??` null coalescing
- `?.field` optional field access

## Autoflow

Autoflow lets the runtime defer and auto-join certain safe thread calls.

```detian
autoflow on;
autoflow max 4;
```

### Current behavior

- Direct expression thread calls can be deferred
- Values auto-join at consumption points
- `autoflow_trace()` records spawn/join/skip/diagnostic events
- `autoflow max <n>` constrains parallel fan-out

### Safety model

The current model stays conservative. It only auto-schedules obviously safe thread bodies or annotated effects such as `@pure`, `@read`, or `@io`. Threads marked `@ordered` or `@side_effect` stay serial.
