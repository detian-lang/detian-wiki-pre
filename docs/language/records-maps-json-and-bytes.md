---
title: Records, Maps, JSON, and Bytes
description: The major data container surfaces and when to prefer each one.
---

# Records, Maps, JSON, and Bytes

Detian has several overlapping but distinct data containers.

## Records

Records are the most natural shape for structured values.

```detian
var#user = { name: "Detian", role: "demo" };
```

Typed records can also be declared through `type`.

## Maps

Maps are better when you want dynamic keys and map-like mutation.

```detian
map#headers = map();
headers = put(headers, "content-type", "application/json");
```

## JSON

JSON is common at boundaries:

- network requests
- package interop
- Hya payloads
- traces and diagnostics

```detian
var#data = json_parse('{"name":"detian"}');
str#text = json_stringify(data);
```

## Bytes

Bytes matter for file IO, base64 workflows, and lower-level payload handling.

```detian
bytes#payload = bytes("Hi");
str#b64 = base64_encode(payload);
bytes#decoded = base64_decode(b64);
```

## When to use what

- record: static structured value
- map: dynamic key/value work
- JSON string: serialization boundary
- bytes: binary boundary
