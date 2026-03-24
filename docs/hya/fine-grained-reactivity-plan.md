# Hya Fine-Grained Reactivity Plan

## 목표

> Current implementation checkpoints:
> - [Milestone A Checklist](./milestones/milestone-a)
> - [Milestone B Checklist](./milestones/milestone-b)
> - [Milestone C Checklist](./milestones/milestone-c)
> - [Milestone D Checklist](./milestones/milestone-d)
> - [Milestone D2 Checklist](./milestones/milestone-d2)
> - [Milestone E Checklist](./milestones/milestone-e)
> - [Milestone D4 Checklist](./milestones/milestone-d4)

Hya를 현재의 **server-first SSR + action roundtrip + subtree rerender** 중심 모델에서 확장해,
장기적으로는 **SolidJS 스타일의 fine-grained reactive rendering system**을 갖춘 프레임워크로 진화시킨다.

핵심 목표:

- 개발자는 렌더링 전략, rerender, memo, signal 같은 내부 메커니즘을 가능한 한 신경 쓰지 않는다.
- Hya/HYX는 state/props/view를 중심으로 작성한다.
- 프레임워크 내부는 dependency graph를 유지하고, 필요한 DOM 위치만 갱신한다.
- SSR-first / server action / flat Hya API 정체성은 유지한다.

## 비목표

이 계획은 다음을 당장 목표로 하지 않는다.

- React-style VDOM diff 엔진
- 전체 Detian evaluator를 브라우저로 이식
- Suspense/resources/transitions/full client router
- 기존 Hya action model 폐기
- framework-wide breaking change

즉 이 계획은 **새 프레임워크 교체**가 아니라,
**현재 Hya 위에 fine-grained hydration/runtime을 추가하는 설계**다.

## 현재 상태 요약

지금 Hya는 이미:

- SSR page render
- flat public API
- component/state/action/mount/dispatch
- action endpoint roundtrip
- HYX lowering
- static asset serving
- route/action diagnostics

을 갖고 있다.

하지만 렌더링 모델은 여전히 대체로:

- component mount
- action dispatch
- HTML subtree 재구성

에 가깝다.

즉 현재는 **server-first reactive UI**이지만,
**fine-grained client renderer**는 아직 아니다.

## 핵심 원칙

### 1. SSR-first 유지

첫 렌더는 계속 SSR이고, hydration은 enhancement여야 한다.
가능한 경우 no-JS 환경에서도 기본 사용성이 유지되어야 한다.

### 2. 의미는 안정적, 렌더링만 최소화

Fine-grained reactivity는 UI 업데이트 전략의 문제이지,
사용자 코드의 의미를 바꾸는 기능이 아니어야 한다.

### 3. 기존 Hya API와 공존

현재 public API:

- `hya.state`
- `hya.set_state`
- `hya.merge_state`
- `hya.action`
- `hya.component`
- `hya.mount`
- `hya.dispatch`

를 유지하면서 additive하게 확장한다.

### 4. 내부는 signal/dependency graph 기반

사용자 표면은 signal-less UX를 목표로 해도,
내부 구현은 결국 signal-like cell / dependency graph / scheduler가 필요하다.

## 최종 UX 방향

개발자는 이런 식으로 작성하는 것을 목표로 한다:

```detian
var#state = hya.state({
  count: 0,
  user: { name: "Detian" },
  items: []
});

hyx {
  <h1>{state.value.user.name}</h1>
  <p>{state.value.count}</p>
  for item in state.value.items {
    <li>{item.name}</li>
  }
}
```

그리고 내부적으로만:

- `state.value.user.name`를 읽는 text binding
- `state.value.count`를 읽는 text binding
- `items`를 읽는 keyed each binding

이 따로 등록되어, 필요한 부분만 patch된다.

## 아키텍처 개요

전체 구조는 다섯 층으로 나눈다.

### A. Server render layer

- static DOM skeleton 생성
- dynamic binding metadata 생성
- hydration payload 직렬화

### B. Hydration protocol

- SSR HTML에 binding marker 삽입
- client가 동적 위치를 다시 식별하게 함

### C. Reactive core

- signal/cell
- computation
- dependency graph
- scheduler

### D. DOM binding runtime

- text binding
- attr/class/style binding
- conditional binding
- keyed each binding

### E. Action/state bridge

- local signal/store update
- server action roundtrip
- reconcile

## 데이터 모델

### Signal / Cell

최소 개념:

- `CellId`
- `SignalCell { value, subscribers }`

### Computation

- `ComputationId`
- `kind: memo | effect | binding`
- `deps`
- `run`
- `stale`

### Binding kinds

- `text`
- `attr`
- `class`
- `style`
- `if`
- `each`

## SSR / Hydration 설계

### 서버가 해야 할 일

현재 Hya node tree를 HTML로 stringify하는 것만으로는 부족하다.
동적 영역에 marker를 심어야 한다.

예시:

```html
<span><!--hya:b:text:12-->0<!--/hya:b:text:12--></span>
```

또는 attr binding:

```html
<button data-hya-bind-attr-class="b:13" class="btn primary">
```

### hydration payload 예시

```json
{
  "componentId": "c1",
  "signals": {
    "s:count": 0
  },
  "bindings": [
    { "id": "b:12", "kind": "text" },
    { "id": "b:13", "kind": "class" }
  ]
}
```

중요한 점:

- expression 자체를 브라우저로 보내는 것보다
- lowering된 binding instruction 형태로 보내는 쪽이 안전하다.

## Reactive core 설계

### 내부 primitive

- `signal`
- `memo`
- `effect`
- `batch`
- `cleanup`

### 사용자 공개 API 방향

처음에는 내부용 primitive로 시작하고,
나중에 필요하면 public API를 추가할 수 있다.

가능한 방향:

- `hya.signal(initial)`
- `hya.read(sig)`
- `hya.write(sig, value)`
- `hya.memo(fn)`
- `hya.effect(fn)`
- `hya.batch(fn)`

하지만 최종 UX는 가능하면 signal-less를 유지한다.

## HYX lowering 방향

HYX는 더 이상 단순 Hya node expr 생성기만이 아니라,
**static DOM skeleton + binding instruction list** 생성기로 가야 한다.

우선 lowering 대상:

1. text interpolation
2. attr/class/style binding
3. `if`
4. `for` / keyed each

특히 `for`는 keyed reconciliation을 전제로 설계해야 한다.

## 상태 모델

현재 `HyaState`는 wrapper 중심이다.
fine-grained로 가려면 두 층이 필요하다.

### logical state

Detian 코드가 보는 state

### reactive runtime state

binding이 subscribe하는 내부 store/cell

### 전략

- `hya.state(...)`는 유지
- hydration 후 내부적으로 reactive store와 연결
- `hya.set_state`, `hya.merge_state`는 store mutation으로 번역

## action 모델

### 현재

- event
- `__hya/action`
- server dispatch
- rerender html

### 단계적 방향

1. local fine-grained patch runtime 추가
2. 기존 action roundtrip 유지
3. 이후 optimistic local update + reconcile 고려

처음에는 **local fine-grained patch와 기존 server action 공존**이 목표다.

## 마일스톤

### Milestone A — Signal core + text binding hydration MVP

산출물:

- signal core
- text marker
- hydration runtime
- text node patch
- counter-style demo

성공 기준:

state 변경 시 component subtree 전체가 아니라 text node만 갱신된다.

### Milestone B — attr/class/style binding

산출물:

- attr binding
- class binding
- style binding

성공 기준:

disabled/class/style/value 등 속성만 부분 patch된다.

### Milestone C — conditional + keyed each

산출물:

- `if` binding
- keyed list reconciliation

성공 기준:

조건 분기와 리스트 갱신에서 subtree 전체 rerender 없이 필요한 부분만 patch된다.

### Milestone D — state/action bridge integration

산출물:

- 기존 `hya.state` 계열 연결
- action roundtrip 후 reconcile

### Milestone E — developer ergonomics

산출물:

- better key syntax
- trace/devtools
- runtime diagnostics

## 구현 순서 추천

가장 현실적인 순서는:

1. text binding vertical slice
2. attr/class/style
3. conditional
4. keyed each
5. state/action bridge

## 테스트 계획

### unit

- dependency registration
- stale propagation
- batching
- nested memo/effect

### DOM

- text node only patch
- attr only patch
- conditional branch patch
- keyed each patch

### hydration

- SSR HTML + hydration after bootstrap
- marker alignment
- no duplicate node creation

### integration

- counter
- form input
- list insert/reorder/remove
- action roundtrip + patch

### performance

기존 `bench_hya`를 확장해서:

- full rerender baseline
- text patch path
- attr patch path
- list patch path

를 비교한다.

## 리스크

### 1. 브라우저에 evaluator를 너무 많이 싣는 문제

전체 Detian evaluator를 client로 보내는 방향은 피해야 한다.

### 2. keyed each가 늦어질 경우 체감 저하

리스트가 많은 UI에서는 keyed reconciliation이 핵심이다.

### 3. 기존 Hya action model과 충돌

local signal 업데이트와 server action이 섞이면 sync 전략이 중요하다.

### 4. hydration marker 설계 실패

marker/schema가 흔들리면 디버깅이 매우 어려워진다.

## 추천 시작점

즉시 구현 시작점은 **Milestone A**다.

첫 실질 목표는:

> “state 하나 바뀌면 text node 하나만 바뀌는 Hya 페이지”

를 end-to-end로 만드는 것.

## 한 줄 요약

Hya fine-grained reactivity의 핵심은:

> **signal-less UX를 목표로 하되,**
> **내부는 signal/dependency graph 기반으로 구현하고,**
> **text → attr → if → keyed each 순서로 vertical slice 구현**

하는 것이다.
