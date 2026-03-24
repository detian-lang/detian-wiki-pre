---
title: Request Lifecycle
description: How Hya requests, routing, actions, rendering, and response generation fit together.
---

# Request Lifecycle

A Hya request usually moves through these stages:

1. route match
2. handler resolution
3. page/component generation
4. response rendering
5. optional client-side action roundtrip later

## Initial page request

```detian
hya.get("/", "pages.home")
```

The route resolves a handler, builds a Hya view tree, and returns an HTML response.

## Action roundtrip

Client-side Hya action markers post to `POST /__hya/action`.

That action request carries:

- handler
- action name
- payload
- props
- state
- optional fine-grained metadata

## Fine-grained branch

If a component root is fine-grained and the response contract allows patch mode, the client runtime can patch in place instead of replacing the whole subtree.
