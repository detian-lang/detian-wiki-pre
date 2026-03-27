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
- `cookie_header_with_options(str#name, str#value, var#options)`
- `cookie_options(int#ttl_ms)`
- `secure_cookie_options(int#ttl_ms)`
- `auth_headers(str#token)`
- `with_session_cookie_options(var#response, str#name, str#token, var#options)`
- `with_session_cookie(var#response, str#name, str#token, int#ttl_ms)`
- `with_signed_session_cookie(var#response, str#name, str#secret, str#subject, int#ttl_ms)`
- `with_secure_session_cookie(var#response, str#name, str#token, int#ttl_ms)`
- `with_signed_secure_session_cookie(var#response, str#name, str#secret, str#subject, int#ttl_ms)`
- `clear_session_cookie(var#response, str#name)`
- `redirect_to_login(str#login_path, str#next_path)`

### `guard.det` → group `guard`

- `require_subject(str#secret, var#ctx, str#cookie_name, str#login_path)`
- `require_payload(str#secret, var#ctx, str#cookie_name, str#login_path)`
- `subject_middleware(str#secret, var#ctx, str#cookie_name, str#login_path)`
- `payload_middleware(str#secret, var#ctx, str#cookie_name, str#login_path)`
- `subject_from_cookie_or_redirect(str#secret, var#ctx, str#cookie_name, str#login_path)`
- `require_store_subject(var#conn, var#ctx, str#cookie_name, str#login_path)`
- `store_subject_middleware(var#conn, var#ctx, str#cookie_name, str#login_path)`

### `store.det` → group `store`

- `init(var#conn)`
- `issue(var#conn, str#subject, int#ttl_ms)`
- `payload(var#conn, str#sid)`
- `subject(var#conn, str#sid)`
- `revoke(var#conn, str#sid)`
- `cleanup_expired(var#conn)`
- `cleanup_revoked(var#conn)`
- `cleanup_inactive(var#conn)`
- `rotate(var#conn, str#sid, int#ttl_ms)`
- `rotate_from_ctx(var#conn, var#ctx, str#cookie_name, int#ttl_ms)`
- `revoke_from_ctx(var#conn, var#ctx, str#cookie_name)`
- `logout_response(var#conn, var#response, var#ctx, str#cookie_name)`
- `rotate_response(var#conn, var#response, var#ctx, str#cookie_name, int#ttl_ms)`

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
- `token_from_cookies(var#cookies, str#name)`
- `token_from_ctx(var#ctx, str#name)`
- `payload_from_cookies(str#secret, var#cookies, str#name)`
- `payload_from_ctx(str#secret, var#ctx, str#name)`
- `subject_from_cookies(str#secret, var#cookies, str#name)`
- `subject_from_ctx(str#secret, var#ctx, str#name)`

## First Hya auth/session slice

`ctx.cookies` and `hya.with_cookie(...)` already exist in the runtime. `authx` now adds a first practical route-guard slice:

```detian
load "authx" as authx;

group#middleware {
  thread#require_auth(map#ctx) {
    return authx.guard.subject_middleware("secret", ctx, "session", "/login");
  }
}

hya.serve(3000, [
  hya.with_middleware(
    hya.get("/private", "pages.private"),
    "middleware.require_auth"
  )
]);
```

Current middleware contract:

- return a map/record to continue with an enriched `ctx`
- return a `HyaResponse` to short-circuit the route immediately

## Cookie option ergonomics first slice

`hya.with_cookie(...)` now accepts an options record, and `authx.http` adds a small convenience layer on top of it.

Current first-slice option fields:

- `path`
- `http_only`
- `secure`
- `same_site`
- `domain`
- `max_age_ms`

## Session store first slice

`authx` now also has a small server-side session-store pattern using SQLite-backed helpers:

```detian
var#conn = db.sqlite_open(":memory:");
authx.store.init(conn);
var#session = authx.store.issue(conn, "detian-user", 60000);
```

This supports:

- opaque session IDs in cookies
- guard middleware backed by stored sessions
- explicit revocation
- logout flows that revoke the server-side session and clear the cookie
- explicit cleanup of expired or revoked rows
- explicit rotation to mint a fresh session ID and revoke the old one

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
