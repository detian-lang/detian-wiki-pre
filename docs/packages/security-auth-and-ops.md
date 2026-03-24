---
title: Security, Auth, and Operational Packages
description: Packages for hashing, auth, metrics, and operational support.
---

# Security, Auth, and Operational Packages

This family includes security-sensitive and operational packages that often sit near the edges of an app.

## Main packages

- `crypto`
- `authx`
- `metricsx`
- `regex`
- `httpx`
- `testx`

## Examples

### `crypto`
Hashing, HMAC, hex helpers, random bytes, and JWT-adjacent utility surface.

### `authx`
Authentication/session helpers, especially in Hya-oriented server-first workflows.

### `metricsx`
Metrics and Prometheus-oriented export surfaces.

### `regex`
Not security-only, but extremely useful in validation, extraction, and operational tooling.

## Guidance

Keep these surfaces close to the boundary of the system. Security-sensitive transformations, auth checks, and metrics/reporting usually benefit from being explicit and isolated.
