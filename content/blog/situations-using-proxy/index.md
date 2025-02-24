---
title: Proxy는 언제사용할까?
subtitle: Proxy를 실제로 사용해볼수 있을까?
date: "2025-02-23T22:40:32.169Z"
description: This is a custom description for SEO and Open Graph purposes, rather than the default generated excerpt. Simply add a description field to the frontmatter.
signboard: true
tags:
  - JavaScript
  - Theory
thumbnail_image: "./proxy-thumbnail.jpeg"
---

## Proxy란?

프록시(Proxy)는 자바스크립트에서 객체의 기본 동작을 가로채거나 확장할 수 있는 강력한 기능입니다. 이를 통해 객체의 속성 접근, 할당, 함수 호출 등을 제어하거나 커스터마이즈할 수 있습니다.

프록시(Proxy)는 대게 두가지 종류로 사용됩니다.

`1. CORS 에러를 해결하기 위한 네트워크 프록시(Proxy)`<br/>
`2. 자바스크립트의 객체동작을 커스텀 또는 제어할 수 있는 프록시(Proxy) 객체`

## CORS 에러 파훼하기

프록시(Proxy)는 대체자라는 의미를 가지고있습니다.
간단하게 설명하면 cors가 빈번하게 일어나는 가장 흔한 케이스는

A(내가 요청하는 주소) -> B(요청 받는 서버) 간의 도메인이 일치하지 않을 때를 의미합니다.<br />

프록시(Proxy)는 실제로 localhost:3000에서 요청하더라도
내가 별도로 프록시서버를 `https://apiserver.com`으로 설정해두면 요청을 중개해주면서
cors에러를 파훼할 수 있습니다.

저는 vite를 사용하는 환경에서 사용해봤는데

```javascript
// vite.config.js

server: {
        // Proxy 설정
        proxy: {
            // 경로가 "/api" 로 시작하는 요청을 대상으로 proxy 설정
            "/api": {
                // 요청할 서버
                target: "http://www.apiserver.com",
                // 요청 헤더 host 필드 값을 대상 서버의 호스트 이름으로  변경
                changeOrigin: true,
                // 요청 경로에서 '/api' 제거
                rewrite: (path) => path.replace(/^\/api/, ""),
                // SSL 인증서 검증 무시
                secure: false,
                // WebSocket 프로토콜 사용
                ws: true,
            },
        },
    },
```

사용할때 유의할 점이 있습니다.
내가 요청할 경로 프리픽스를 미리 설정해두어야합니다.

일종의 신호라고 볼 수 있습니다.
예를들어 위 예시에서는 `'/api'`로 경로를 설정해뒀다면 실제로 요청할때도

`fetch('/api/요청할주소')`로 요청해야만 가로채서 원하는 타겟으로 변경해줍니다.

```javascript
// 내가 설정한 요청주소
"/api/test-image-group"

// 실제로 요청된 주소
"http://www.apiserver.com/test-image-group"
```

이렇게 클라이언트단에서 Proxy설정을 해두면<br />
개발단계에서 서버에서 모든 주소에 대한 cors를 다 허용해둘 필요도 없고<br />
docker를 사용해서 로컬서버를 구축하지 않아도 일단 사용이 가능하다는 장점이있습니다.

## 객체 처리하기

자바스크립트에서 설정해둔 객체를 컨트롤 할 수도 있습니다.

원본객체를 설정해두고 객체의 변경을 감지하는 옵저버함수를 만들수도 있고,
유효성검사를 위해 인위적으로 객체 값을 바꿔넣어 테스트 해 볼수도 있습니다.

```javascript
// 대상 객체
const target = {
  message: "Hello, Proxy!",
  count: 0,
  increment() {
    this.count++
    console.log(`Count is now ${this.count}`)
  },
}

// 핸들러 객체
const handler = {
  // get 트랩: 속성 읽기 가로채기
  get(target, prop) {
    console.log(`Getting property: ${prop}`)
    return prop in target ? target[prop] : `Property ${prop} not found`
  },
  // set 트랩: 속성 설정 가로채기
  set(target, prop, value) {
    console.log(`Setting property: ${prop} to ${value}`)
    target[prop] = value
    return true // 설정 성공을 나타내는 true 반환
  },
  // apply 트랩: 함수 호출 가로채기
  apply(target, thisArg, argumentsList) {
    console.log(`Calling function with arguments: ${argumentsList}`)
    return target.apply(thisArg, argumentsList)
  },
}

// 프록시 객체 생성
const proxy = new Proxy(target, handler)

// 속성 읽기
console.log(proxy.message) // "Getting property: message" "Hello, Proxy!"

// 속성 설정
proxy.count = 5 // "Setting property: count to 5"

// 함수 호출
proxy.increment() // "Calling function with arguments: []" "Count is now 6"
```

<span class="img-description">_(get,set,apply를 사용하는 proxy 예시)_</span>

예시와 같이 Proxy는 객체를 가로채서 내가 원하는 동작을 실행 해볼 수 있습니다.

가장 많이 사용되는 케이스는<br />

`1. 데이터 유효성 검사(Validation)`<br />
`2. 속성 접근 로깅(Logging)`<br />
`3. 기본값 제공(Default Values)`<br />
`4. 함수 매개변수 검증`

객채의 내부값과 정의된 함수의 동작을 proxy의 handler로 만들어놓고
동작할 때마다 로그를 찍어보고 잘못된 값을 넣었을때를 캐치해 확인해보고
예기치못한 상황에 대한 예외처리로직을 만들어둘 수 있습니다.

## 실제로 사용할만한가?

사용되는 경우는 객체 데이터값을 옵저빙하면서 확인해 알려주거나,
유효하지 못한 값을 선별하는 것과같이 객체의 움직임을 따라가는 듯한 사용사례가
대부분입니다.

프록시(proxy)가 사용될만한 경우는 충분히 대체될 수 있습니다.

예를들어 웹사이트에서 로그인할 때 validation 체크를 한다던가,
자주사용하는 함수의 매개변수 검증은 이미 함수내부에서 처리가 되어있습니다.

그럼에도 프록시(proxy)를 사용하면 좋은점은<br />

`1. 객체 불변성 보장`

```javascript
const originalObject = { x: 1, y: 2 }
const handler = {
  set(target, prop, value) {
    throw new Error("객체는 읽기 전용입니다.")
  },
  deleteProperty(target, prop) {
    throw new Error("속성을 삭제할 수 없습니다.")
  },
}

const immutableObject = new Proxy(originalObject, handler)

// 아래 코드는 에러를 발생시킵니다
// immutableObject.x = 3;
// delete immutableObject.y;
```

<span class="img-description">_(객체의 불변성을 보장하는 예시)_</span>

객체의 상태가 변하지 않음으로 동작을 예측하기 쉽고,
여러 스레드에서 안전하게 객체를 공유할 수 있습니다.<br />

`2. 추상화 레이어 제공`

```javascript
const api = {
  fetchUser: id =>
    fetch(`https://api.example.com/users/${id}`).then(res => res.json()),
  fetchPost: id =>
    fetch(`https://api.example.com/posts/${id}`).then(res => res.json()),
}

const handler = {
  get(target, prop) {
    return async (...args) => {
      console.log(`Calling ${prop} with args:`, args)
      try {
        const result = await target[prop](...args)
        console.log(`${prop} call successful`)
        return result
      } catch (error) {
        console.error(`Error in ${prop}:`, error)
        throw error
      }
    }
  },
}

const proxiedApi = new Proxy(api, handler)

// 사용 예:
// proxiedApi.fetchUser(1).then(user => console.log(user));
```

<span class="img-description">_(추상화해서 사용하번 원본코드를 수정하지 않아도 된다.)_</span>

실제로 사용되는 내부구현코드를 수정하지 않고 결과값에 대한 핸들링을 할 수 있고,
이러한 핸들링작업을 일관성있게 처리할 수 있습니다.

## 결론

개인적으로 프록시(proxy)를 개발용 테스트 핸들러로 많이 만들어두면 좋겠다는 생각이 들었습니다.

내부로직을 건들다보면 결과값에 대한 상태추적이나 변경된 기획 또는 핫픽스를 수정하는 과정에서 직접적으로 내부로직을 수정하는 케이스가 잦습니다.

이때마다 내부로직을 직접바꾸니 이전코드로 돌아가야할 때나
원래 개발했던 의도를 잊고 뒤죽박죽 엉켜버리는 경우가 종종있었습니다.

케이스별로 프록시함수를 만들어둔다음 객체값의 상태를 추적하는 함수를 사용하면
유용할 것 같습니다.
