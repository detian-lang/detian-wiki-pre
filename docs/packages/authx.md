---
title: Authentication helpers
description: JWT/session-oriented helpers that pair well with Hya applications.
---

# Authentication helpers

JWT/session-oriented helpers that pair well with Hya applications.

## Why you would use it

Use `authx` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "authx" as authx;
```

## Source-derived surface

### `http.det` → group `http`

- `bearer_from_headers(var#headers)`
- `cookie_header(str#name, str#value, int#ttl_ms)`
- `auth_headers(str#token)`
- `with_session_cookie(var#response, str#name, str#token, int#ttl_ms)`
- `clear_session_cookie(var#response, str#name)`

### `session.det` → group `session`

- `session_id()`
- `base64url_encode(bytes#value)`
- `base64url_decode(str#text)`
- `decode_unverified(str#token)`
- `sign_hs256(str#secret, var#payload)`
- `verify_hs256(str#token, str#secret)`
- `issue_jwt(str#secret, str#subject, int#ttl_ms)`
- `verify_jwt(str#secret, str#token)`
- `subject(str#secret, str#token)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `authx` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
