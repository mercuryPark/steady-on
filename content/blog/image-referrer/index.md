---
title: 외부 이미지 로딩이 되지않을때
subtitle: Referer 정책 이해하기
date: "2025-12-22T23:46:37.121Z"
signboard: true
shorts: true
tags:
  - JavaScript
  - Theory
thumbnail_image: "./referrer_thumbnail.png"
---

## 외부에서 가져온 이미지 로딩이 되지않는다.

![image](./couldn't_be_loaded.png)
<span class="img-description">_(이미지 로딩 실패 화면)_</span>

웹 개발할때 이미지를 로드할 수 없는 상황은 흔히 발생합니다.

회사에서 외부 이미지를 사용할 일이 있었습니다.
OG Tag 이미지를 가져와 썸네일로 보여주는 기능이었는데, 대부분의 사이트에서는 정상적으로 이미지가 로드되었습니다.

그런데 네이버 블로그처럼 권한에 민감한 사이트에서는 OG Tag 이미지조차 로드되지 않는 케이스가 있었습니다.

개발자 도구를 열어보니 이미지 요청에서 `403 Forbidden` 에러가 발생하고 있었습니다.

## 원인 분석

조사를 하다보니 `Referer` 헤더가 원인이었습니다.

### Referer 헤더란?

브라우저가 서버에 요청을 보낼 때, 요청 헤더에 `Referer`를 자동으로 포함합니다.<br/>
이 헤더에는 현재 요청을 보내는 페이지의 URL이 담겨있습니다.

```javascript
// 예시: mysite.com에서 naver.com의 이미지를 요청할 때
// 요청 헤더에 다음과 같이 포함됨
Referer: https://mysite.com/page
```

### 핫링크(Hotlink) 방지

네이버 블로그 같은 사이트에서는 이미지 서버에서 `Referer` 헤더를 검사합니다.

`1. 이미지 요청이 들어옴`<br/>
`2. Referer 헤더 확인`<br/>
`3. 자신의 도메인이 아니면 이미지 제공 거부 (403)`<br/>

이러한 정책을 `핫링크(Hotlink) 방지`라고 합니다.<br/>
다른 사이트에서 자신의 이미지를 무단으로 가져다 쓰는 것을 막기 위한 보안 정책입니다.

이미지 서버 입장에서는 자신의 도메인에서 요청한 것만 허용하고,
외부 도메인에서의 요청은 차단하는 것이죠.

## 해결 방법

해결 방법은 간단합니다.<br/>
이미지 요청 시 `Referer` 헤더를 보내지 않으면 됩니다.

### referrerPolicy 속성

HTML img 태그에 `referrerPolicy` 속성을 추가하면 됩니다.

```html
<!-- HTML -->
<img src="https://외부이미지주소.com/image.jpg" referrerpolicy="no-referrer" />
```

`referrerPolicy="no-referrer"`를 설정하면 브라우저가 해당 이미지 요청 시
`Referer` 헤더를 전송하지 않습니다.

이미지 서버는 요청이 어디서 왔는지 알 수 없기 때문에
핫링크 방지 정책을 적용하지 못하고 이미지를 제공하게 됩니다.

### React에서 사용하기

React에서는 카멜케이스로 작성합니다.

```jsx
// React
<img src={externalImageUrl} referrerPolicy="no-referrer" alt="외부 이미지" />
```

### Next.js Image 컴포넌트

Next.js의 Image 컴포넌트에서도 동일하게 사용할 수 있습니다.

```jsx
// Next.js
import Image from "next/image"
;<Image
  src={externalImageUrl}
  referrerPolicy="no-referrer"
  width={200}
  height={200}
  alt="외부 이미지"
/>
```

## 주의사항

모든 상황에서 작동하는 것은 아닙니다.

일부 사이트는 `Referer` 헤더 외에도 추가적인 보안 정책을 적용하고 있습니다.<br/>
예를 들어, 인증 토큰이 필요하거나 특정 쿠키가 있어야만 이미지를 제공하는 경우가 있습니다.

또한 `no-referrer`를 사용하면 해당 요청에 대한 출처 정보가 완전히 사라지므로,
분석 도구나 로깅에서 트래픽 출처를 파악하기 어려워질 수 있습니다.

## 마무리

정리하자면

`1. 외부 이미지가 로드되지 않을 때 Referer 정책을 의심해볼 것`<br/>
`2. referrerPolicy="no-referrer" 속성으로 Referer 헤더 전송을 막을 것`<br/>
`3. 모든 케이스에 적용되는 것은 아님을 인지할 것`

간단한 속성 하나로 해결할 수 있는 문제였지만,
원인을 파악하기까지 시간이 걸렸던 경험이었습니다.

외부 이미지를 다룰 때 비슷한 문제가 발생한다면 참고해보시면 좋겠습니다.
