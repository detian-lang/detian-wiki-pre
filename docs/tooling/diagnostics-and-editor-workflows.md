---
title: Diagnostics and Editor Workflows
description: Error messages, diagnostics, and editor-facing workflows for working with Detian.
---

# Diagnostics and Editor Workflows

Detian now emphasizes developer-friendly diagnostics.

## Design goals

- tell developers what failed
- say what was found
- say what was expected
- suggest the next fix when obvious

## Current examples

- parser messages with language-level token names
- runtime type errors with operand types and supported combinations
- variable/field not-found suggestions
- HYX parse errors with line/column/caret context
- Hya resolution errors that include component and route context

## LSP

The language server reuses parser/runtime wording where possible, so improving core error messages improves editor diagnostics too.
