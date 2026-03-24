---
title: Actions and Reducers
description: Understand Hya’s action descriptors, reducer-style threads, and the request-response bridge that turns interactions into new UI.
---

# Actions and Reducers

If pages and components explain how a Hya app is shaped, actions explain how it moves.

Hya uses a reducer-like model, but it keeps the pieces grounded in normal Detian threads and explicit payloads. That makes the system surprisingly easy to reason about once you stop expecting client-framework magic.

## The central idea

An interaction in Hya usually has three parts:

1. a UI node emits an action descriptor
2. the Hya bridge posts to `POST /__hya/action`
3. the server resolves an action thread and returns the next UI state

That is the loop. Everything else is detail.

## Action descriptors are data, not execution

Here is the most important thing to internalize:

```detian
hya.action("actions.increment", { delta: 1 })
```

This does **not** run `actions.increment` immediately. It creates a descriptor that says:

- which action thread should run later
- which payload should be sent with the interaction

That descriptor is attached to the rendered node. The browser bridge reads it when the click, submit, input, or change event happens.

## Action threads are plain Detian threads

```detian
group#actions {
  thread#increment(map#state, map#payload) {
    return {
      count: state.count + payload.delta,
      label: state.label
    };
  }
}
```

That plainness is a feature. You can read, test, and reason about this thread without learning a second embedded language.

## The action contract

By convention, an action thread receives:

- the current raw state value
- the payload from the action descriptor or submitted form

And it returns the next raw state value.

This means state transitions stay explicit. If a field disappears, it is usually because your action stopped returning it.

## Dispatching directly on the server

Hya also lets you run the reducer-style logic directly:

```detian
var#next = hya.dispatch("actions.increment", state, { delta: 1 });
```

This is useful for:

- tests
- initial state preparation
- deterministic server-side examples
- data shaping before first render

It is the same logic path, just without a browser event in the middle.

## A complete interaction example

```detian
group#actions {
  thread#increment(map#state, map#payload) {
    return {
      count: state.count + payload.delta,
      label: state.label
    };
  }
}

group#components {
  thread#counter(map#props) {
    return hya.element("button", {
      on_click: hya.action("actions.increment", { delta: 1 })
    }, [
      hya.text(props.state.value.label + ": " + str(props.state.value.count))
    ]);
  }
}
```

When clicked, the Hya bridge has enough information to say:

- this component was mounted from `components.counter`
- the current state payload is `{ count: ..., label: ... }`
- the action name is `actions.increment`
- the payload is `{ delta: 1 }`

That is why Hya can stay server-first without giving up interactivity.

## Action naming discipline helps a lot

A practical naming convention that scales well:

- `actions.increment`
- `actions.decrement`
- `actions.save_name`
- `actions.set_filter`
- `actions.toggle_focus`
- `actions.select_lead`

Choose names that describe state transitions or user intent clearly. This makes patch logs, diagnostics, and later LSP features more useful.

## Avoid “god reducers”

It is tempting to funnel every interaction through one giant action handler. Resist that. Hya stays pleasant when action threads are small and specific.

Better:

```detian
thread#set_stage_filter(map#state, map#payload) { ... }
thread#set_owner_filter(map#state, map#payload) { ... }
thread#toggle_focus(map#state, map#payload) { ... }
```

Worse:

```detian
thread#update_everything(map#state, map#payload) { ... }
```

Specific actions produce cleaner diffs, better logs, and easier debugging.

## Reducer logic belongs close to state shape

If your component state is:

```detian
{
  stage_filter: "all",
  owner_filter: "all",
  focus_only: false
}
```

then your actions should read like deliberate edits to that shape. That relationship is what keeps Hya understandable as the app grows.

## Plain actions versus optimistic actions

The standard form is:

```detian
hya.action("actions.increment", { delta: 1 })
```

Later, Hya also supports optimistic patches:

```detian
hya.action("actions.increment", { delta: 1 }, { count: 2 })
```

We will cover that later. For now, focus on the authoritative server-first action path.

## How rerender versus patch fits in

At the action level, the authoring model is the same regardless of rendering mode:

- plain Hya rerenders the relevant subtree
- fine-grained Hya may patch only the changed bindings

That is an implementation difference, not a different application model. This is great news for authors because it means you do not need to relearn how actions work when you adopt fine-grained rendering.

## Debugging action flow

When something feels off, inspect these things in order:

1. did the node render an action descriptor?
2. is the action name correct?
3. does the payload shape match what the action expects?
4. does the action return the full next state shape you need?
5. did the runtime patch or rerender as expected?

That workflow catches most Hya interaction bugs.

## Common beginner mistakes

### Mutating state mentally instead of returning next state explicitly

Think in “return the next state” terms, not “mutate this thing in place” terms.

### Returning partial state accidentally

If your component reads `count` and `label`, your action must keep both unless you intentionally remove one.

### Hiding business logic inside the component

A component should describe the UI event and display the current state. The action should own the state transition.

## Exercise

Add these actions to your counter app:

- `actions.decrement`
- `actions.reset`
- `actions.rename_counter`

Then test them once by user interaction and once by direct `hya.dispatch(...)`. If both paths make sense to you, you are ready for form handling.

## Next step

Continue to [Forms, Inputs, and Submit Flows](./forms-inputs-and-submit-flows.md), where action descriptors stop being just click handlers and start carrying real user input back to the server.
