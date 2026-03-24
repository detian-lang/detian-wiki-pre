---
title: Cryptography helpers
description: Hashing, HMAC, random values, hex helpers, and JWT-adjacent support.
---

# Cryptography helpers

Hashing, HMAC, random values, hex helpers, and JWT-adjacent support.

## Why you would use it

Use `crypto` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "crypto" as crypto;
```

## Source-derived surface

### `core.det` → group `core`

- `sha256(var#value)`
- `hmac_sha256(var#key, var#value)`
- `hex_encode(bytes#value)`
- `hex_decode(str#text)`
- `random_bytes(int#length)`
- `random_hex(int#length)`

### `jwt.det` → group `jwt`

- `base64url_encode(bytes#value)`
- `base64url_decode(str#text)`
- `decode_unverified(str#token)`
- `sign_hs256(str#secret, var#payload)`
- `verify_hs256(str#token, str#secret)`
- `payload(str#token)`
- `claim(str#token, str#name)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `crypto` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
