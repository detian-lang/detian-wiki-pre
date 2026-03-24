---
title: Forms, Inputs, and Submit Flows
description: Build Hya forms with text inputs, debounced updates, checkboxes, and submit actions that stay server-first.
---

# Forms, Inputs, and Submit Flows

Forms are where Hya starts to feel like a full application framework rather than a page renderer. They bring together:

- page state
- reducer-style actions
- browser event metadata
- server round-trips
- optional debounced previews

The good news is that Hya keeps forms simple. They are still ordinary HTML-like nodes. The main difference is that the framework helps you attach the right action descriptors.

## The built-in form helpers

The `hya` package includes a small but useful form surface:

- `hya.form(...)`
- `hya.text_input(...)`
- `hya.text_input_debounced(...)`
- `hya.checkbox(...)`
- `hya.submit_button(...)`

These are convenience helpers around normal Hya nodes. They exist to remove repetitive prop-building code.

## A basic form example

```detian
group#components {
  thread#greeting_card(map#props) {
    return hya.form(
      hya.action("actions.save_name", null),
      [
        hya.text_input(
          "name",
          props.state.value.name,
          "Type your name",
          null
        ),
        hya.submit_button("Save")
      ]
    );
  }
}
```

That is already enough to submit form data back to the server through the Hya action bridge.

## Add debounced preview

Now let’s upgrade it with the pattern used by `examples/hya_greeter_service`:

```detian
hya.text_input_debounced(
  "name",
  props.state.value.name,
  "Type your name",
  hya.action("actions.preview_name", null),
  300ms
)
```

This is a powerful pattern because it gives you a “preview while typing” experience without abandoning server-first behavior.

## Add a checkbox

```detian
hya.checkbox(
  "excited",
  props.state.value.excited,
  "excited mode",
  hya.action("actions.set_excited", null)
)
```

That gives you a compact server-driven toggle flow.

## Matching actions to forms

Here is the corresponding reducer group:

```detian
group#actions {
  thread#preview_name(map#state, map#payload) {
    return {
      name: payload.name,
      excited: state.excited
    };
  }

  thread#save_name(map#state, map#payload) {
    return {
      name: payload.name,
      excited: state.excited
    };
  }

  thread#set_excited(map#state, map#payload) {
    return {
      name: state.name,
      excited: payload.excited
    };
  }
}
```

This is a great example of Hya philosophy:

- inputs are explicit
- form payloads are explicit
- server transitions are explicit
- rendering is still server-owned

## A full greeting form component

```detian
group#components {
  thread#greeting_card(map#props) {
    var#greeting = "Hello, " + props.state.value.name + "!";
    if (props.state.value.excited) {
      greeting = upper(greeting);
    }

    return hya.element("section", { class: "card" }, [
      hya.element("h1", {}, [hya.text("Hya Greeting Service")]),
      hya.form(hya.action("actions.save_name", null), [
        hya.text_input_debounced(
          "name",
          props.state.value.name,
          "Type your name",
          hya.action("actions.preview_name", null),
          300ms
        ),
        hya.checkbox(
          "excited",
          props.state.value.excited,
          "excited mode",
          hya.action("actions.set_excited", null)
        ),
        hya.submit_button("Update greeting")
      ]),
      hya.element("p", { class: "greeting" }, [
        hya.text(greeting)
      ])
    ]);
  }
}
```

This is already a real user-facing interaction pattern: live preview, explicit save, checkbox toggle, derived presentation.

## Why Hya forms feel stable

A lot of form systems feel magical because they blend local mutations, client validation, and hidden state containers. Hya is calmer than that. You can usually point at every step:

- which input emitted the action
- which payload was generated
- which action thread ran
- which state value came back
- which component rerendered or patched

That visibility becomes even more valuable as the form grows.

## Handling submit versus input

Use these modes deliberately:

- `on_input` or debounced input when the UI should react while typing
- `on_change` when toggles or selection controls should update immediately
- `on_submit` when the user is intentionally committing a form

Hya does not force you into one model. It lets you combine them, which is exactly what the greeting example does.

## A good form-state rule

Keep form state small and obvious. For example:

```detian
{ name: "Detian", excited: false }
```

That makes reducer logic trivial. If you grow the form later, add fields incrementally and keep actions named after concrete transitions.

## Fine-grained forms later

The examples in this chapter work perfectly in classic rerender mode. Later, you can layer fine-grained binding on top if you want more targeted UI updates. The important thing is that the form model does not change—you are still using explicit state and explicit actions.

## Common beginner mistakes

### Putting all input logic in one big action

It is often clearer to use separate actions for preview, submit, and toggles.

### Losing unrelated fields

If `preview_name` returns only `{ name: payload.name }`, you may accidentally drop `excited`. Preserve the full shape you need.

### Using debounced input when immediate submit would be clearer

Debounce is great when preview matters. It is unnecessary ceremony when a plain submit button would do.

## Exercise

Build a small profile form with:

- a debounced `display_name` input
- a checkbox for `public_profile`
- a submit button that saves both
- a live preview sentence below the form

If you can do that without feeling confused about what runs where, you are ready for bigger route structures.

## Next step

Continue to [Dynamic Routes and Detail Pages](./dynamic-routes-and-detail-pages.md), where we turn a single dashboard into an app that can navigate from a list page to a detail page using route parameters.
