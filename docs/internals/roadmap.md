# Roadmap

Already landed:
- nested return control-flow fix
- quoted record keys
- ternary expressions
- `||` / `&&` diagnostics
- structured HYX `for` lowering (first pass)

Next:
- reduce `hya.when` dependence in HYX `if`
- improve collection ergonomics
- strengthen backend middleware/cache/cookies
- keep moving docs/examples toward flat Hya API
- build Hya fine-grained reactivity in phases:
  - text binding hydration MVP
  - attr/class/style binding
  - conditional + keyed each
  - state/action bridge integration

Detailed design:
- [Hya Fine-Grained Reactivity Plan](../hya/fine-grained-reactivity-plan)
