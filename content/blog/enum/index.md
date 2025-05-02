---
title: Typescript Enum
subtitle: 상수 관리하기
date: "2025-05-02T22:40:32.169Z"
signboard: false
shorts: true
tags:
  - JavaScript
  - React
  - 회고
thumbnail_image: "./enum_thumbnail.jpeg"
---

## Enum이란?

enum은 열거형 변수입니다. 정수를 하나로 합칠 수 있어 편리하고, 상수를
객체형태로 미리 선언해두기 때문에 중복되는 값을 효율적으로 관리할 수 있습니다.

```typescript
// Javascript는 Java나 C# 과같이 Enum을 지원하는 내장 타입이 없음
const EnumColors = Object.freeze({
  BLUE: "blue",
  RED: "red",
  GREEN: "green",
})

// Typescript는 제공함
enum EnumColors {
  Red = "red",
  Green = "green",
  Blue = "blue",
}
```

이렇게 열거형 변수는 변경되지 않는 상수값으로 미리 선언해두고
이 값들을 사용하는 모든곳을 일괄적용해 예외상황을 줄이는데 효율적입니다.

## Typescript Enum을 사용하면 안되는 경우

이제는 더 나은 안정성을 위해서라도 대부분 typescript를 사용하기 때문에
typescript enum을 사용하면 되지 않을까 싶었지만, 몇몇의 사용하면
오히려 성능을 저하시킬 수 있는 요인이 있습니다.

### Tree-Shaking

번들러(Webpack, Vite, Rollup 등)가 빌드 과정에서 실제로 사용하지 않는
코드를 제거하는 과정이 `Tree-Shaking`입니다.

이는 번들 크기를 감소시켜 로딩시간이나 트래픽을 감소시켜 최적화를 도와줍니다.

Typescript에서 사용하는 Enum은 런타임에서 객체로 존재하기 때문에
번들링 과정에서 `Tree-Shaking`이 되지 않습니다.

## Enum을 사용하는 다른 방법들

```typescript
// TypeScript - 일반 enum
enum Direction {
  Up = "UP",
  Down = "DOWN",
}
const value = Direction.Up

// 컴파일된 JavaScript
var Direction
;(function (Direction) {
  Direction["Up"] = "UP"
  Direction["Down"] = "DOWN"
})(Direction || (Direction = {}))
const value = Direction.Up

// TypeScript - const enum
const enum Direction {
  Up = "UP",
  Down = "DOWN",
}

// 컴파일된 JavaScript
const value = "UP" // 값이 직접 인라인으로 대체됨
```

`1. const enum`<br/><br/>
우선 const enum이 있습니다. 이는 typescript의 enum과 다르게 런타임에서
객체를 생성하지 않기때문에 `Tree-Shaking`이 됩니다.

그러나 typescript의 isolatedModules 옵션과 사용할 수 없고, Babel과 같은 일부 도구와 호환성 문제가 있습니다.

<br/><br/>

```typescript
// 객체에 상수로 관리
export const ApiStatus = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
} as const

// union types
export type ApiStatus = (typeof ApiStatus)[keyof typeof ApiStatus]
```

`2. Union Types과 const 객체 사용`<br/><br/>

union types와 const 객체에 상수를 담아 사용합니다.
Tree-Shaking도 안정성있게 동작할뿐더러 코드가 명확하고 타입 안정성도 제공됩니다.

## 마무리

Tree-Shaking의 측면에서 본다면 Union Types + const 객체 조합이 안정성이 뛰어나 보입니다.

그러나 이는 사용하지 않는 enum이 있다는 가정에서만 적용되므로,
생성한 enum을 빈틈없이 사용하고 관리가 잘된다면 문제가 없다는 의견도 있었습니다.
