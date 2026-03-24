---
title: Optimistic Actions and Reconcile
description: Add responsive optimistic updates to fine-grained Hya components without giving up server authority.
---

# Optimistic Actions and Reconcile

By default, Hya is unapologetically server-first. That is a strength, but sometimes you want interaction feedback to feel more immediate. This is where optimistic actions come in.

An optimistic action lets the browser apply a temporary patch before the server response arrives. Hya still treats the server as authoritative, but the UI can feel faster in the meantime.

## The optimistic action shape

The action helper accepts an optional third argument:

```detian
hya.action("actions.increment", { delta: 1 }, { count: 2 })
```

That third value is the optimistic patch.

## What happens at runtime

The lifecycle is:

1. the user triggers the action
2. the fine runtime applies the optimistic patch locally
3. the request is sent to the server
4. the server returns the authoritative `state_value`
5. the runtime reconciles the optimistic state with the authoritative state
6. if the request fails, the runtime reverts to the previous state

This gives you responsiveness without fully surrendering control to client-only logic.

## When optimistic patches are worth using

They are most useful when:

- the state transition is small and obvious
- the likely server result is easy to predict
- the UI feels noticeably laggy without immediate feedback
- you want to preserve a server-owned state model

Examples:

- incrementing a counter
- toggling a visual filter
- selecting an item
- marking a row as expanded or focused

## A concrete example

```detian
group#components {
  thread#counter(map#props) {
    return hya.element("button", {
      on_click: hya.action(
        "actions.increment",
        { delta: 1 },
        { count: props.state.value.count + 1 }
      )
    }, [
      hya.text("Count: "),
      hya.state_text(props.state, "count")
    ]);
  }
}
```

The optimistic patch makes the count appear to jump immediately. Then the server response confirms or corrects it.

## Keep optimistic patches simple

Hya currently treats optimistic patches conservatively. The best optimistic patches are:

- shallow
- small
- easy to explain
- easy to recover from if the request fails

That is not a limitation to fight—it is a guardrail that keeps the system trustworthy.

## Reconcile is not optional

A common misconception is that optimistic state “becomes” the real state if the action succeeds. That is not the right model. The correct model is:

- the optimistic patch is provisional
- the server result is authoritative
- the runtime reconciles to the returned state

This matters because the server may:

- clamp values
- reject invalid state transitions
- add derived fields
- update related fields you did not predict client-side

## Revert behavior matters too

If the request fails, the fine runtime reverts to the previous state and records the failure in the patch log. This is important for trust: optimistic UI should never leave the interface in a silently incorrect state.

## Inspect the patch log

Use the browser tools:

```js
window.__hyaFine.lastPatches()
```

You can see events such as:

- `optimistic`
- `patch`
- `reconcile`
- `revert`
- `rerender`
- `error`

That makes optimistic flows much easier to debug than in systems where the temporary state is invisible.

## Good optimistic candidates in real Hya apps

### Filters and focus state

A CRM or dashboard app often has state like:

- `stage_filter`
- `owner_filter`
- `focus_only`

These are great optimistic candidates because the intended state change is obvious.

### Simple counters or toggles

If the action’s expected result is “basically this number plus one” or “basically this boolean flipped,” optimistic patches are easy to justify.

## Bad optimistic candidates

Be cautious when:

- the server may reject the change often
- the server computes several related fields you cannot predict cheaply
- the action touches security-sensitive state
- the user would be confused if a visible revert happened frequently

In those cases, classic server-authoritative interaction may be the better UX.

## A good rule of thumb

If you cannot explain the optimistic patch in one sentence, it is probably too clever.

Good:

> “Pretend the count increased by one until the server confirms it.”

Less good:

> “Speculatively update this nested set of dependent records and hope the server agrees.”

## Common beginner mistakes

### Treating optimistic patches as permanent state

Always remember that the server response wins.

### Making the optimistic patch broader than the action’s likely effect

That increases the chance of jarring reconcile jumps.

### Forgetting to inspect failure behavior

A revert path is part of the feature, not an edge case you can ignore.

## Exercise

Add an optimistic patch to one of these interactions:

- counter increment
- toggle focus mode
- select a lead row in a dashboard

Then simulate a failing request and inspect the patch log. If you can explain the optimistic → reconcile → revert flow clearly, you are using the feature well.

## Next step

Continue to [Debugging Hya Apps](./debugging-hya-apps.md), where we bring together routes, actions, fine bindings, diagnostics, and devtools into one practical troubleshooting workflow.
