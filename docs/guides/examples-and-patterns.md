# Examples and Patterns

## Recommended examples
- `examples/ultimate_showcase.det`
- `examples/hya_flat_api_p0`
- `examples/hya_greeter_service`
- `examples/launchpad_crm`
- `examples/clix_demo`

## Flat Hya API
```detian
var#state = hya.state({ count: 1, label: "Counter" });
var#next = hya.dispatch("actions.increment", state, { delta: 1 });
var#view = hya.mount("components.counter", { state: next });
```

## HYX
```detian
var#view = hyx {
  <>
    <p>{count > 2 ? "big" : "small"}</p>
    <ul>
      for item in items {
        <li>{item.name}</li>
      }
    </ul>
  </>
};
```

## CLIX demo
```bash
cargo run -- examples/clix_demo serve dashboard --name Codex --port 8080 --watch
```

Checks:
- forwarded argv support
- `argv()` / `argc()`
- `clix.argv.*`
- `clix.flags.*`
- `clix.current.*`


## DB demo
```bash
DB_DEMO_PATH=/tmp/detian-db-demo.sqlite cargo run --quiet -- examples/db_demo
```

Checks:
- SQLite schema creation
- parameterized insert/query
- transaction begin/commit
- scalar/query_one/query row records


## Regex demo
```bash
cargo run --quiet -- examples/regex_demo
```

Checks:
- regex match / find / captures
- replace / split
- package wrapper surface


## Flowviz demo
```bash
FLOWVIZ_PORT=3147 cargo run --quiet -- examples/flowviz_demo
```

Checks:
- `run_graph()` visualization
- SVG node/edge rendering
- Hya page response
- zoom / pan / status filter legend


## LLMX demo
```bash
LLMX_PROVIDER=anthropic LLMX_BASE_URL=http://127.0.0.1:9000 LLMX_API_KEY=demo-key LLMX_MODEL=claude-sonnet-4-5 cargo run --quiet -- examples/llmx_demo
LLMX_PROVIDER=gemini LLMX_BASE_URL=http://127.0.0.1:9000 LLMX_API_KEY=demo-key LLMX_MODEL=gemini-3-flash-preview cargo run --quiet -- examples/llmx_demo
```

Checks:
- OpenAI-compatible chat request
- embedding request
- env-based provider config


## Graph demo
```bash
cargo run --quiet -- examples/graph_demo
```

Checks:
- graph.core / search / dag / render
- DOT / Mermaid export


## Chart demo
```bash
CHART_PORT=3150 cargo run --quiet -- examples/chart_demo
```

Checks:
- `chart.bar` / `chart.line` / `chart.pie`
- legend + dashboard page composition


## RenderX demo
```bash
RENDERX_OUT=/tmp/renderx-demo cargo run --quiet -- examples/renderx_demo
```

Checks:
- chart / flowviz SVG file output
- HTML export
- data URI generation


## IMGX demo
```bash
IMGX_OUT=/tmp/imgx-demo cargo run --quiet -- examples/imgx_demo
```

Checks:
- chart SVG generation
- SVG -> PNG rasterization
- PNG data URI


## Foundation stack demo
```bash
FOUNDATION_DB_PATH=/tmp/detian-foundation.sqlite cargo run --quiet -- examples/foundation_stack_demo
```

Checks:
- datetime / crypto / uuid / file / json helpers
- CSV stringify/parse
- queue/cache on SQLite


## HTTPX demo
```bash
HTTPX_BASE_URL=http://127.0.0.1:9010 cargo run --quiet -- examples/httpx_demo
```

Checks:
- query string generation
- GET JSON / POST JSON wrappers


## 21. benchmark rail examples
```bash
cargo run --quiet -- examples/bench_core
cargo run --quiet -- examples/bench_collections
cargo run --quiet -- examples/bench_hya
BENCH_PACKAGES_DB=/tmp/detian-bench-packages.sqlite cargo run --quiet -- examples/bench_packages
```

검증 포인트:
- core arithmetic / dispatch baseline
- collection comprehension cost
- Hya render/page cost
- package-layer regex/crypto/json/db cost
