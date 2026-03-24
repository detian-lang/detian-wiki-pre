# Stdlib, builtin packages, and Hya

## Layers
1. Prelude
2. generic alias surfaces (`std.*`, `html.*`, `reactive.*`, `server.*`)
3. loadable builtin packages and `hya`

Useful core helpers also include:
- `argv`, `argc`
- `starts_with`, `ends_with`, `contains`, `split`, `join_text`, `trim`

## Flat Hya public API
Preferred app-author surface:
- `hya.element`, `hya.text`, `hya.fragment`, `hya.page`
- `hya.html`, `hya.json`, `hya.text_response`, `hya.redirect`
- `hya.get`, `hya.post`, `hya.route`, `hya.static`, `hya.serve`
- `hya.state`, `hya.set_state`, `hya.merge_state`, `hya.action`
- `hya.component`, `hya.mount`, `hya.dispatch`

Nested wrappers still exist but are closer to compatibility/internal surfaces.
