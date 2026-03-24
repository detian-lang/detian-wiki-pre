---
title: llmx Chat, Tools, and Embeddings
description: Configure a provider, send chat requests, use tool calls, and request embeddings.
---

# llmx Chat, Tools, and Embeddings

`llmx` is Detian’s multi-provider LLM package.

## 1. Create a config

```detian
load "llmx" as llmx;
var#config = llmx.config.openai(env("OPENAI_API_KEY"), "gpt-5-mini");
```

## 2. One-shot chat

```detian
str#reply = llmx.chat.one_shot_text(
  config,
  "You are concise.",
  "Say hello"
);
```

## 3. Tool support check

```detian
bool#tools_ok = llmx.chat.supports_tools(config);
```

## 4. Embedding support check

```detian
bool#embed_ok = llmx.embeddings.supported(config);
```

## 5. Embeddings

```detian
if (embed_ok) {
  var#vector = llmx.embeddings.vector(config, "detian package");
}
```

## 6. When to choose llmx

Use `llmx` when you want a stable Detian surface across multiple providers and local/hosted endpoints.
