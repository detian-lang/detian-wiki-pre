---
title: Debugging Hya Apps
description: Debug routes, handler resolution, actions, HYX lowering, fine-grained patches, and fallback diagnostics with a practical workflow.
---

# Debugging Hya Apps

A good framework is not just easy to write. It is also easy to debug when something goes wrong. Hya’s recent work on diagnostics, fine-grained inspection, and more human-readable error messages makes that much better than it used to be.

This page gives you a practical workflow for debugging real Hya applications.

## Start with the request path

When something is wrong, first identify where the failure lives:

- route resolution
- page handler
- component resolution
- action handler
- rendering mode
- fine-grained patching
- client-side asset or browser enhancement code

Trying to debug all of those at once is what makes server-first frameworks feel confusing. Break the path into steps.

## Route and handler diagnostics are your first checkpoint

Modern Hya diagnostics are much better about saying:

- what route pattern was involved
- what handler string was being resolved
- which group or thread was missing
- which alternatives exist

So if a page does not load, start by confirming:

1. the route exists in the table
2. the handler string is correct
3. the handler group and thread exist exactly as expected

This is especially important with HYX component mapping, where `<CounterCard />` maps to `components.counter_card`.

## Confirm whether you are in classic or fine mode

The next question is simple but important:

- did the component mount with `hya.mount(...)`?
- or with `hya.mount_fine(...)`?

That determines whether Hya should be doing whole-subtree rerendering or fine-grained patching.

If you are in fine mode, open the browser console and use:

```js
window.__hyaFine.inspectAll()
```

That lets you see all active fine roots and their metadata.

## Inspect one fine root directly

You can inspect by selector or by element:

```js
window.__hyaFine.inspect('[data-hya-fine-root]')
```

Look for:

- `fine_mode`
- `fine_contract`
- `state_version`
- `bindings`
- `diagnostics`

This is often enough to answer the question, “Did the runtime understand this component the way I thought it did?”

## Use patch logs after interactions

After clicking or submitting, inspect:

```js
window.__hyaFine.lastPatches()
```

You may see entries like:

- `patch`
- `rerender`
- `optimistic`
- `reconcile`
- `revert`
- `error`

This is incredibly useful. It turns “the page felt weird” into something concrete like:

> The runtime fell back to rerender because the HYX pattern was not safely lowered.

or:

> The optimistic patch applied, then the request failed and reverted.

## Understand fallback diagnostics

When Hya cannot safely lower a HYX pattern into fine-grained bindings, it keeps the legacy rendering path and records diagnostics.

Common examples include:

- `complex_state_text_expr`
- `complex_state_if`
- `complex_state_each`
- `complex_state_attr_expr`

That means the question is not just “did it work?” but also “did it stay on the expected render path?”

If not, diagnostics often explain why.

## A practical debugging ladder

Here is a good default workflow:

### 1. Reproduce with the smallest route possible

Can you make the issue happen on a minimal page or in one component only?

### 2. Verify route registration

Check the exact `hya.get(...)` or `hya.post(...)` entry.

### 3. Verify handler strings

Make sure the route, component, or action handler actually exists under the expected group.

### 4. Inspect returned state shape

Many “render bugs” are really state-shape bugs. If a field disappeared, maybe the action stopped returning it.

### 5. Inspect fine roots and patch logs

If the app uses fine mode, inspect whether it patched, rerendered, or reverted.

### 6. Reduce HYX complexity temporarily

If the issue looks like lowering or patch behavior, rewrite the suspicious slice in plain Hya for a moment. Plain Hya is still the best “ground truth” debug surface.

## Debugging forms

Forms add their own failure modes:

- wrong input `name`
- payload field missing
- wrong action attached to `on_submit` or `on_input`
- checkbox expecting `payload.excited` but receiving something else

A great technique is to temporarily simplify the action to a pure echo-like state transition and confirm the payload shape first.

## Debugging dynamic routes

If a detail page is wrong, inspect:

- `ctx.params`
- `ctx.route_pattern`
- `ctx.route_kind`
- `ctx.query`

That immediately tells you whether the handler matched the way you expected. Because Hya supports static, parameterized, and wildcard routes, route precedence is worth checking explicitly.

## Debugging HYX component resolution

If a HYX component fails to resolve:

- confirm the PascalCase → snake_case mapping
- confirm the handler group (`components` by default in many examples)
- confirm the thread name exists exactly

This is one of the most common early mistakes, and the fix is usually simple once you look in the right place.

## Debugging with examples

Keep these repository examples nearby:

- `examples/hya_flat_api_p0`
- `examples/hya_greeter_service`
- `examples/hya_package_app`
- `examples/launchpad_crm`

They make excellent comparison points when you want to ask, “What is the healthy version of this pattern supposed to look like?”

## When to stop being clever

A very practical Hya debugging rule:

> If you are unsure whether the problem is the renderer, the lowering path, or the action contract, temporarily simplify the code.

That might mean:

- rewriting a HYX slice in plain Hya
- removing optimistic patches
- switching from `mount_fine(...)` to `mount(...)`
- shrinking the state shape

You are not giving up. You are isolating the moving parts.

## Common anti-patterns

### Debugging only in the browser

Remember that page handlers, actions, and route resolution still live on the server.

### Blaming fine-grained rendering first

Often the problem is just a wrong handler string or missing state field.

### Keeping huge components while debugging

Break them apart. Smaller components are easier to inspect mentally and operationally.

## Final checklist

When a Hya bug appears, ask:

1. Did the route resolve correctly?
2. Did the page handler produce the expected state and props?
3. Did the component mount correctly?
4. Did the action payload look right?
5. Did the action return the full next state?
6. Did the runtime patch, rerender, reconcile, or revert?
7. Did fine diagnostics record a fallback reason?

If you can answer those seven questions, you can usually find the bug quickly.

## Next step

Continue to [Capstone: LaunchPad CRM Walkthrough](./capstone-launchpad-crm.md), where we connect the ideas from the whole tutorial series to a bigger repository example with routes, filters, API endpoints, and richer page structure.
