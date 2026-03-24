---
title: The @ Sigil and Execution Start
description: Learn what changes when @ is present, why Detian separates evaluation from execution, and how run handles and flows depend on that distinction.
---

# The `@` Sigil and Execution Start

If you only learn one unusual thing about Detian early, it should be this:

> `@` is not decoration. It marks the difference between **evaluating a call as a value** and **starting work as an execution unit**.

That distinction is one of the reasons Detian feels different from mainstream languages. Many languages use one surface for both computation and operational work. Detian tries to make the difference visible.

## The shortest possible explanation

### Without `@`

```detian
var#x = math.add(1, 2);
```

Read that as:

- evaluate `math.add(1, 2)`
- produce a value
- bind the value to `x`

### With `@`

```detian
@math.add(1, 2);
```

Read that as:

- start `math.add(1, 2)` as work
- treat it as part of the execution model
- allow it to participate in flow/orchestration semantics

That is the core difference.

## Why this matters

In many languages, the same function-call surface has to carry all of these meanings at once:

- evaluate a value now
- create or launch a task
- start a pipeline stage
- become something cancellable
- become something traceable
- become something you may want to join later

Detian separates those concerns more clearly.

That makes code easier to reason about when your program is not just “calculate a value,” but rather:

- launch work
- control work
- pipe work
- join work
- inspect work

## Value evaluation versus execution start

A good way to think about it is this:

| Form | Main meaning |
| --- | --- |
| `foo.bar()` | evaluate a value |
| `@foo.bar()` | start executable work |

This does **not** mean `@` is simply “async.” That would be too narrow and misleading.

Instead, `@` means the expression is entering the **execution/orchestration layer** of the language.

## Example: direct value call

```detian
group#math {
  thread#add(int#a, int#b) {
    return a + b;
  }
}

@#main {
  var#sum = math.add(20, 22);
  print(sum);
}
```

Here, `math.add(20, 22)` behaves like a direct value-producing call. You care about the returned value immediately.

## Example: explicit execution

```detian
group#math {
  thread#add(int#a, int#b) {
    return a + b;
  }
}

@#main {
  @math.add(20, 22);
}
```

Now the same thread is being treated as executable work. In a tiny example that difference may feel subtle, but it becomes extremely important once you add:

- segments
- pipes
- run handles
- cancellation
- trace inspection

## The best intuition: “evaluate” versus “launch”

If you want a short mental model, use this one:

- **no `@`** → evaluate
- **with `@`** → launch

Again, “launch” does not always mean “spawn another OS thread” or “turn this into generic background async.” It means “treat this as an execution unit in Detian’s runtime model.”

That is the safer way to think about it.

## Run handles make the distinction obvious

The easiest place to see why `@` matters is with run handles.

```detian
group#jobs {
  thread#slow() {
    sleep 200ms;
    return "ok";
  }
}

@#main {
  run#job = @jobs.slow();
  join job;
  print(job.value);
}
```

Why does this make sense?

Because `run#job` wants a **real execution unit**:

- something that starts
- something that has status
- something that can be joined
- something that can be traced

That is exactly what `@jobs.slow()` provides.

If you only think in ordinary value-call terms, the meaning of `run`, `join`, and `cancel` becomes much harder to explain. Once you accept that `@` marks execution start, the model becomes much clearer.

## Why `foo.bar()` and `@foo.bar()` should not be mentally merged

A common beginner mistake is to assume:

> “It is the same call, just with a funny symbol.”

That is not the right mental model. They are related, but they live in different layers:

- `foo.bar()` is primarily about **what value do I get?**
- `@foo.bar()` is primarily about **what work starts now?**

If you keep those questions separate, Detian becomes easier much faster.

## Flow start is one of the clearest examples

```detian
@pipeline.load -> pipeline.transform -> pipeline.save;
```

This is not “a chain of expressions that happens to look like a pipeline.” It is a statement about execution shape.

Read it like this:

1. start `pipeline.load`
2. take its result
3. feed it into `pipeline.transform`
4. take that result
5. feed it into `pipeline.save`

The leading `@` matters because it tells Detian that this pipeline is not merely being described. It is being **started**.

## Compare that with a plain value call

```detian
var#loaded = pipeline.load();
var#transformed = pipeline.transform(loaded);
var#saved = pipeline.save(transformed);
```

This is still fine code, but it tells a different story:

- value first
- orchestration second

Detian’s execution syntax exists because many real applications care deeply about orchestration shape. The `@` sigil is the doorway into that model.

## Parallel branches become easier to read

```detian
@prepare -> ( @score.left | @score.right ) -> report.build;
```

This is one of the places where Detian becomes unusually expressive.

Read it as:

- start `prepare`
- feed its output into two explicit execution branches
- run those branches in parallel
- collect the results
- continue into `report.build`

Here, `@` is doing important semantic work. It tells you where work actually starts and which branches are executable stages rather than plain values.

## “Does @ change execution behavior?”

Yes—but be precise about what kind of change you mean.

### Yes, it changes the execution model

With `@`, the expression can participate in:

- flows
- segments
- run handles
- joins
- cancellation
- tracing

So in that sense, yes, the execution behavior changes.

### No, it does not mean “always async”

It is a mistake to translate `@` as “this becomes background async now.”

`@` does **not** mean all of these things automatically:

- always parallel
- always background
- always a separate thread
- always detached

That is too simplistic.

The better reading is:

> `@` moves the expression from ordinary value-evaluation semantics into Detian’s execution/orchestration semantics.

That is the real rule.

## Why Detian made this explicit

Detian could have chosen a more “mainstream” route and hidden execution start inside:

- a task library
- a workflow framework
- an async helper layer
- naming conventions

But then the language would lose one of its biggest strengths: the ability to show the operational shape of the program directly in the syntax.

By marking execution start explicitly, Detian makes it easier to answer questions like:

- what starts here?
- what is still only a value?
- what can I join or cancel later?
- what belongs to the run graph?
- where does this pipeline actually begin?

Those are not minor questions in orchestration-heavy software. They are often the central questions.

## A comparison table

| Example | What it means |
| --- | --- |
| `math.add(1, 2)` | evaluate the call and use the returned value |
| `@math.add(1, 2)` | start the call as executable work |
| `run#job = @jobs.slow()` | create a tracked execution handle |
| `@load -> transform -> save` | start a pipeline and move values through stages |

That table is worth memorizing.

## A practical reading rule

When you see ordinary calls, ask:

> What value is being computed?

When you see `@`, ask:

> What work is being started here?

That single shift in reading style makes a huge difference in how quickly Detian starts feeling coherent.

## Common misunderstandings

### “`@` is just async.”

Too narrow. `@` is about execution/orchestration semantics, not merely generic async behavior.

### “If a thread can be called directly, `@` is redundant.”

No. Direct calls and execution-start calls serve different roles.

### “I can ignore `@` and still understand Detian.”

Not really. You can read syntax, but you will miss the core execution story.

## Good follow-up pages

If this page helped, continue with:

- [Execution Model](./execution-model)
- [Flows, Pipes, and Run Handles](./flows-pipes-and-run-handles)
- [Groups, Threads, and Main](./groups-threads-and-main)
- [Why Detian?](../why-detian)
