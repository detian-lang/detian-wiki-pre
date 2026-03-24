# Hya Fine-Grained Reactivity — Milestone D4 Checklist

Milestone D4 focuses on action ergonomics beyond plain server roundtrips: explicit optimistic updates, reconcile-friendly patch mode, and safer signal-less UX for common action flows.

## Scope

- [x] Add a canonical Milestone D4 checklist document
- [x] Extend Hya action descriptors with optional optimistic patch metadata
- [x] Render optimistic patch metadata into `data-hya-*` action attributes
- [x] Teach the fine client runtime to apply optimistic patches before the server roundtrip
- [x] Reconcile optimistic local state with authoritative server `state_value`
- [x] Revert optimistic patches on request failure
- [x] Record optimistic / reconcile / revert events in the patch log
- [x] Add focused tests for optimistic action metadata and devtools exposure

## Explicitly out of scope

- [ ] generic client-side expression evaluation for optimistic updates
- [ ] conflict-free merge / CRDT-style reconciliation
- [ ] offline queues
- [ ] transitions / suspense
- [ ] public signal API

## Implementation notes

- D4 stays explicit first: optimistic behavior is opt-in on action descriptors.
- The initial optimistic patch model is intentionally simple: shallow patch replacement/merge on the client.
- If the request succeeds, the server `state_value` remains authoritative.
- If the request fails, the client restores the previous state and records a revert event.

## Done criteria

1. Actions can carry optimistic patch metadata.
2. Fine roots can patch locally before the server responds.
3. Successful responses reconcile to the authoritative server state.
4. Failed responses revert the optimistic patch and leave an inspectable log trail.
5. Focused tests, full test suite, clippy, and wiki rebuild pass.
