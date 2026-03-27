---
title: Forms, Actions, and State
description: Practical patterns for Hya forms, actions, state wrappers, and server-first updates.
---

# Forms, Actions, and State

## State wrappers

```detian
var#state = hya.state({ name: "Detian" });
```

## Action descriptors

```detian
hya.action("actions.save_name", { name: "Codex" })
```

## Form helpers

The Hya package includes helper surfaces for forms and inputs. These are useful when you want more structure than hand-building every element.

## Validation first slice

Hya now also has a small validation convention:

- `hya.validation.field(name, message)`
- `hya.validation.errors([...])`
- `hya.validation.invalid(state, field_errors, form_error)`
- `hya.validation.clear(state)`
- `hya.validation.message(state, name)`
- `hya.validation.form_message(state)`
- `hya.validation.has_errors(state)`

Matching rendering helpers:

- `hya.form.error_text(message)`
- `hya.form.field_error(state, name)`
- `hya.form.form_error(state)`

This is a first slice for server-side validation redisplay, not a full client-side validation system.

## Richer issue schema

Hya now also has a richer issue shape for cases where a field needs more than one diagnostic:

- `hya.validation.issue(name, message, code, level)`
- `hya.validation.issues([...])`
- `hya.validation.invalid_with_details(state, field_errors, details, form_error)`
- `hya.validation.issue_list(state, name)`
- `hya.validation.first_issue(state, name)`
- `hya.form.field_errors(state, name)`

This keeps the simple `errors` map for compatibility while adding an optional `error_details` list for richer records.

## Form UX second slice

Hya now also has a tiny `form_state` convention layer:

- `hya.form_state.init(state)`
- `hya.form_state.mark_touched(state, name)`
- `hya.form_state.mark_dirty(state, name)`
- `hya.form_state.set_submitting(state, bool)`
- `hya.form_state.is_touched(state, name)`
- `hya.form_state.is_dirty(state, name)`
- `hya.form_state.is_submitting(state)`

This keeps `dirty`, `touched`, and `submitting` in the ordinary server-owned state shape instead of introducing a separate client-side form-state model.

## Typical reducer pattern

```detian
thread#save_name(map#state, map#payload) {
  return { name: payload.name };
}
```

## Validation-oriented reducer pattern

```detian
thread#save_name(map#state, map#payload) {
  if (payload.name == null or trim(str(payload.name)) == "") {
    return hya.validation.invalid(
      state,
      hya.validation.errors([
        hya.validation.field("name", "Name is required")
      ]),
      "Please fix the form"
    );
  }

  return hya.validation.clear({
    name: str(payload.name)
  });
}
```

## Fine-grained and optimistic actions

When you combine `hya.mount_fine(...)` with fine actions, Hya can now:

- apply optimistic patches
- reconcile to authoritative server state
- revert on failure

That is part of the newer fine-grained action bridge work.

## Flash messages and PRG

Hya now also has a first flash-message slice for post-redirect-get flows.

Helpers:

- `hya.flash.set(...)`
- `hya.flash.set_value(...)`
- `hya.flash.message(ctx, name)`
- `hya.flash.value(ctx, name)`
- `hya.flash.consume(response, ctx, name)`
- `hya.flash.see_other(...)`
- `hya.flash.see_other_value(...)`
- `hya.flash.message_record(level, text)`

This means you can keep a tiny flash payload in a cookie, redirect with `303`, and then clear it on the next GET.

Recommended flash taxonomy helpers:

- `hya.flash.info(text)`
- `hya.flash.success(text)`
- `hya.flash.warning(text)`
- `hya.flash.error(text)`

There is also light alias normalization:

- `ok` → `success`
- `warn` → `warning`
- `err` → `error`
