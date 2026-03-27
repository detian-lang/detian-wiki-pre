# Roadmap

Already landed:
- nested return control-flow fix
- quoted record keys
- ternary expressions
- `||` / `&&` diagnostics
- structured HYX `for` lowering (first pass)
- list/string/bytes slicing with negative indices and steps
- multi-axis access for nested lists / `ndx.matrix` / `ndx.tensor`
- recurrence literals and `reclist(...)`
- `ndx` tensor package
- `ezml` first-slice ML package built around `ndx`
- Hya fine-grained milestones A-E
- `detian dev <entry>` Hya hot reload v0
- resolver/link step with partial slotization and thread fast path

Next:
- continue Hya fine-grained generalization beyond the current safe lowering surface
- strengthen HYX fallback diagnostics and devtools visibility
- finish loop/comprehension slotization
- add global slotization
- move toward IR / bytecode for larger performance wins
- strengthen backend middleware/cache/cookies
- keep moving docs/examples toward the flat Hya API and current dev loop

Detailed design:
- [Hya Fine-Grained Reactivity Plan](../hya/fine-grained-reactivity-plan)
