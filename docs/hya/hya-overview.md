---
title: Hya Overview
description: The Detian server-first UI and web framework.
---

# Hya Overview

Hya is Detian’s **server-first UI and web framework**. It is not a separate language or runtime. It is a framework layer that sits on top of Detian’s execution model.

## Learn Hya by building

If you want the most practical path, start with the [Hya Tutorial Series](./tutorials/overview.md). It is a multi-page walkthrough that grows from a one-route page into a realistic server-first app with forms, dynamic routes, fine-grained rendering, optimistic actions, and debugging workflow.

## Core Hya surface

- `hya.element`, `hya.text`, `hya.fragment`, `hya.page`
- `hya.html`, `hya.json`, `hya.text_response`, `hya.redirect`
- `hya.get`, `hya.post`, `hya.route`, `hya.static`, `hya.serve`
- `hya.state`, `hya.set_state`, `hya.merge_state`, `hya.action`
- `hya.component`, `hya.mount`, `hya.mount_fine`, `hya.dispatch`

## What Hya is optimized for

- local internal tools
- server-first dashboards
- route/action/component flows that stay explicit
- apps where SSR is the default starting point
- fine-grained hydration as an incremental improvement, not a rewrite of the mental model

## Why Hya fits Detian well

Hya works well in Detian because the language already has explicit execution structure. That makes request handling, actions, server tasks, background work, traces, and UI updates feel like parts of one model rather than disconnected layers.

## Major Hya topics

- routing
- state and action reducers
- HYX authoring
- fine-grained reactivity
- optimistic fine actions
- diagnostics and devtools

## Good next pages

- [Components, State, and Actions](./components-state-actions)
- [Routing](./routing)
- [HYX Guide](./hyx-guide)
- [Fine-Grained Reactivity](./fine-grained-reactivity)
