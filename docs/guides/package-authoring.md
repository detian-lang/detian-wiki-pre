---
title: Package Authoring
description: How to design, export, document, and test a Detian package.
---

# Package Authoring

A good Detian package is not just a folder with helpers. It has:

- a clear surface
- a stable import story
- examples
- tests
- documentation that tells users when to use it

## Structure

```text
mypkg/
  detian.toml
  src/
    lib.det
    main.det
```

## Surface design

Prefer a few exported groups over many scattered entry points.

Example:

```detian
export group#core { ... }
export group#render { ... }
```

## Documentation checklist

For each package, try to answer:

- what problem does it solve?
- when should users choose it?
- what are the main groups/modules?
- what is a good first example?
- what should users not assume yet?

## Testing

At minimum, packages should have:

- runtime tests or smoke tests
- example coverage when practical
- regression tests for stable output or important diagnostics

## API stability

Detian is still evolving, so package authors should be honest about maturity. It is better to say "first slice" or "narrow surface" than to imply a universal abstraction that does not exist yet.
