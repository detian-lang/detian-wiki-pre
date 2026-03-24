---
title: Multi-provider LLM access
description: Compose chat, tools, streaming, and embeddings across provider presets.
---

# Multi-provider LLM access

Compose chat, tools, streaming, and embeddings across provider presets.

## Why you would use it

Use `llmx` when its package family matches your application need more directly than low-level builtins or ad-hoc glue code.

## Import

```detian
load "llmx" as llmx;
```

## Source-derived surface

### `chat.det` → group `chat`

- `headers(var#config)`
- `supports_tools(var#config)`
- `message_text(var#message)`
- `system_text(var#messages)`
- `anthropic_messages(var#messages)`
- `request(var#config, var#messages)`
- `request_with_tools(var#config, var#messages, var#tools, var#tool_choice)`
- `url(var#config)`
- `send(var#config, var#body)`
- `complete_result(var#config, var#messages)`
- `complete_json(var#config, var#messages)`
- `complete_text(var#config, var#messages)`
- `complete_text_retry(var#config, var#messages, int#attempts, var#delay)`
- `one_shot_text(var#config, var#system_prompt, var#user_prompt)`
- `complete_with_tools_result(var#config, var#messages, var#tools, var#tool_choice)`
- `complete_with_tools_json(var#config, var#messages, var#tools, var#tool_choice)`
- `tool_calls(var#config, var#messages, var#tools, var#tool_choice)`

### `config.det` → group `config`

- `supported_providers()`
- `copy_headers(var#headers)`
- `preset(str#provider,
    str#base_url,
    var#api_key,
    var#model,
    str#auth_scheme,
    bool#supports_embeddings,
    str#request_style,
    bool#supports_tools,
    var#max_tokens)`
- `openai_compatible(var#base_url, var#api_key, var#model)`
- `openai(var#api_key, var#model)`
- `openrouter(var#api_key, var#model)`
- `anthropic(var#api_key, var#model)`
- `gemini(var#api_key, var#model)`
- `ollama(var#model)`
- `lmstudio(var#model)`
- `groq(var#api_key, var#model)`
- `xai(var#api_key, var#model)`
- `localai(var#model)`
- `vllm(var#model)`
- `from_provider(str#provider, var#api_key, var#model)`
- `with_base_url(var#config, var#base_url)`
- `with_paths(var#config, str#chat_path, var#embedding_path)`
- `with_header(var#config, str#name, var#value)`
- `headers(var#config)`
- `from_env()`

### `embeddings.det` → group `embeddings`

- `headers(var#config)`
- `supported(var#config)`
- `request(var#config, var#input)`
- `url(var#config)`
- `vector_result(var#config, var#input)`
- `vector(var#config, var#input)`

### `error.det` → group `error`

- `payload_or_null(str#body)`
- `normalize(var#config, var#response)`
- `json_result(var#config, var#response)`
- `text_result(var#config, var#response)`

### `extract.det` → group `extract`

- `message(var#payload)`
- `chat_text(var#payload)`
- `anthropic_text(var#payload)`
- `chat_text_for(var#config, var#payload)`
- `tool_calls(var#payload)`
- `tool_calls_for(var#config, var#payload)`
- `first_tool_name(var#payload)`
- `first_tool_name_for(var#config, var#payload)`

### `messages.det` → group `messages`

- `message(str#role, var#content)`
- `developer(var#content)`
- `system(var#content)`
- `user(var#content)`
- `assistant(var#content)`
- `tool(str#tool_call_id, str#name, var#content)`

### `stream.det` → group `stream`

- `headers(var#config)`
- `request(var#config, var#messages)`
- `send_result(var#config, var#messages)`
- `data_lines(str#raw)`
- `payload_strings(str#raw)`
- `events(str#raw)`
- `event_text(var#event)`
- `anthropic_event_text(var#event)`
- `text_for(var#config, str#raw)`
- `text(str#raw)`
- `stream_text(var#config, var#messages)`
- `stream_text_retry(var#config, var#messages, int#attempts, var#delay)`

### `tools.det` → group `tools`

- `function(str#name, str#description, var#parameters)`
- `tool_choice_auto()`
- `tool_choice_none()`
- `tool_choice_required()`
- `assistant_tool_calls(var#tool_calls)`
- `tool_result(str#tool_call_id, str#name, var#content)`

## Learning advice

- Start with the package family guide before reading every individual thread signature.
- Use this page together with the package catalog to place `llmx` in the wider Detian ecosystem.

## Related package guides

- [Package Catalog Overview](./overview)
- [Package Catalog](./package-catalog)
- [Framework and Web Packages](./framework-and-web)
- [Data and Storage Packages](./data-and-storage)
- [AI, Visualization, and Graph Packages](./ai-visualization-and-graphs)
- [Math, Stats, and Science Packages](./math-stats-and-science)
- [Security, Auth, and Operational Packages](./security-auth-and-ops)
