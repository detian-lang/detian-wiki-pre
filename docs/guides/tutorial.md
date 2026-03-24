---
title: Tutorial
description: A paced tutorial that moves from direct calls to flow-driven Detian and then into Hya.
---

# Tutorial

This tutorial assumes you have the interpreter working locally.

## Step 1: Define a group and thread

```detian
group#hello {
  thread#say(str#name) {
    return "Hello, " + name;
  }
}
```

## Step 2: Call the thread directly

```detian
@#main {
  str#msg = hello.say("Detian");
  print(msg);
}
```

## Step 3: Think in flow shape

```detian
group#pipeline {
  thread#load() { return [10, 20, 30]; }
  thread#sum(var#items) { return sum for item in items => item; }
}

@#main {
  @pipeline.load -> pipeline.sum;
}
```

## Step 4: Keep control over work

```detian
group#jobs {
  thread#slow() {
    sleep 200ms;
    return "ok";
  }
}

@#main {
  run#job = @jobs.slow;
  join job;
  print(job.done);
}
```

## Step 5: Use records and maps

```detian
@#main {
  var#user = { name: "Detian", role: "demo" };
  map#headers = map();
  headers = put(headers, "content-type", "application/json");
  print(user.name);
}
```

## Step 6: Move into Hya

If you want a full application-focused path after this short language tutorial, continue with the [Hya Tutorial Series](../hya/tutorials/overview.md).


```detian
load "hya" as hya;

group#pages {
  thread#home(map#ctx) {
    return hya.html(hya.page("Hello", [
      hya.element("main", {}, [
        hya.element("h1", {}, [hya.text("Hello from Hya")])
      ])
    ]));
  }
}
```

## Step 7: Try HYX

```detian
var#view = hyx {
  <main>
    <h1>{title}</h1>
  </main>
};
```

## Step 8: Explore packages

A realistic Detian app almost always uses packages. Good early packages to study are:

- `db`
- `regex`
- `clix`
- `flowviz`
- `llmx`

## Suggested next reading

- [Examples and Patterns](./examples-and-patterns)
- [Hya Overview](../hya/hya-overview)
- [Package Catalog](../packages/package-catalog)
