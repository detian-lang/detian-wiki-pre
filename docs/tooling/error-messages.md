# Error Message Guidelines

Detian error messages should optimize for **developer recovery speed**, not internal implementation detail.

## Core rule

Prefer:
- what failed
- what was found
- what was expected
- what to do next

Over:
- raw token dumps
- internal enum/debug formatting
- vague placeholders like `Not implemented`

## Preferred shape

`<what failed>; found <actual>; expected <expected>; hint <next step>`

Examples:
- `Expected a module path string after \`load\`, found int literal \`42\``
- `cannot use \`+\` with map and int; supported: int, float, duration, timestamp+duration, or string+string`
- `Expected record field name; quote reserved keys like "type" or "class"`

## Style rules

1. Name the operator/function/construct directly.
2. Use language-level terms (`identifier`, `string literal`, `group`, `thread`) instead of Rust debug output.
3. Include candidate/help text when the next fix is obvious.
4. Include source context (line/column/caret) when available.
5. Avoid placeholder messages such as `Not implemented` in user-facing paths.
