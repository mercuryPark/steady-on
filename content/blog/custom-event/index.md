---
title: 커스텀 이벤트 만들기
subtitle: OverlayPanel 중복 열림 문제 해결하기
date: "2025-07-10T23:46:37.121Z"
signboard: true
shorts: false
tags:
  - JavaScript
  - React
  - Theory
thumbnail_image: "./custom_event_thumbnail.png"
---

## 범용 컴포넌트의 고민

OverlayPanel, Dropdown, Tooltip 같은 범용 컴포넌트를 개발하다 보면
visible 상태를 직접 컨트롤해야 하는 케이스가 생깁니다.

대부분의 경우 blur 처리나 focus 이동으로 닫힘 처리가 가능합니다.

```javascript
// 일반적인 닫힘 처리
useEffect(() => {
  const handleClickOutside = e => {
    if (!panelRef.current?.contains(e.target)) {
      setVisible(false)
    }
  }

  document.addEventListener("click", handleClickOutside)
  return () => document.removeEventListener("click", handleClickOutside)
}, [])
```

그런데 특정 상황에서 문제가 발생했습니다.

## 문제 상황

다른 버튼에서 `e.stopPropagation()`을 사용하고 있는 경우였습니다.

```javascript
// 문제가 되는 상황
const handleButtonClick = e => {
  e.stopPropagation() // 이벤트 전파 중단
  // 다른 로직 실행...
}
```

`stopPropagation()`은 이벤트 버블링을 막기 때문에
document에 등록한 click 리스너가 실행되지 않습니다.

결과적으로 OverlayPanel A가 열려있는 상태에서
`stopPropagation()`이 걸린 버튼을 클릭해 OverlayPanel B를 열면
A가 닫히지 않고 두 개의 패널이 동시에 보이는 현상이 발생했습니다.

사용자 입장에서는 꽤 불편한 경험이었습니다.

## 해결 방법을 찾아서

처음에는 전역 상태 관리로 해결하려고 했습니다.
열려있는 패널의 id를 상태로 관리하고, 새 패널이 열리면 기존 패널을 닫는 방식이었죠.

그런데 단순히 "닫아라"라는 신호를 보내기 위해 전역 상태를 사용하는 건 과도해 보였습니다.

그래서 `커스텀 이벤트`를 사용하기로 했습니다.

## 커스텀 이벤트란?

자바스크립트에서는 `click`, `focus`, `blur` 같은 기본 이벤트 외에도
개발자가 직접 이벤트를 만들어 사용할 수 있습니다.

```javascript
// 커스텀 이벤트 생성
const myEvent = new CustomEvent("my-custom-event", {
  detail: { message: "안녕하세요" },
})

// 이벤트 발생시키기
document.dispatchEvent(myEvent)

// 이벤트 리스닝
document.addEventListener("my-custom-event", e => {
  console.log(e.detail.message) // "안녕하세요"
})
```

`CustomEvent` 생성자로 이벤트를 만들고,
`dispatchEvent`로 이벤트를 발생시키고,
`addEventListener`로 이벤트를 감지할 수 있습니다.

`detail` 속성에 원하는 데이터를 담아 전달할 수도 있습니다.

## React에서 커스텀 이벤트 사용하기

React에서도 DOM 이벤트 시스템을 그대로 사용할 수 있습니다.

```javascript
// 커스텀 이벤트 이름 정의
const CLOSE_ALL_OVERLAY = "close-all-overlay"

// 이벤트 발생 함수
const dispatchCloseOverlay = exceptId => {
  const event = new CustomEvent(CLOSE_ALL_OVERLAY, {
    detail: { exceptId },
  })
  document.dispatchEvent(event)
}
```

OverlayPanel 컴포넌트에서는 이 이벤트를 리스닝합니다.

```javascript
const OverlayPanel = ({ id, visible, onClose, children }) => {
  useEffect(() => {
    const handleCloseAll = e => {
      // 자신을 제외한 패널만 닫기
      if (e.detail.exceptId !== id && visible) {
        onClose()
      }
    }

    document.addEventListener(CLOSE_ALL_OVERLAY, handleCloseAll)
    return () => document.removeEventListener(CLOSE_ALL_OVERLAY, handleCloseAll)
  }, [id, visible, onClose])

  // 패널이 열릴 때 다른 패널들에게 닫으라고 알림
  useEffect(() => {
    if (visible) {
      dispatchCloseOverlay(id)
    }
  }, [visible, id])

  if (!visible) return null

  return <div className="overlay-panel">{children}</div>
}
```

이제 어떤 OverlayPanel이 열리면 `close-all-overlay` 이벤트를 발생시키고,
다른 OverlayPanel들은 이 이벤트를 받아서 스스로 닫힙니다.

`stopPropagation()`과 상관없이 커스텀 이벤트는 정상적으로 전달됩니다.

## 커스텀 이벤트의 장점

`1. 컴포넌트 간 느슨한 결합`

각 OverlayPanel은 서로의 존재를 몰라도 됩니다.
그저 약속된 이벤트를 발생시키고 리스닝할 뿐입니다.

`2. 전역 상태 관리 없이 통신 가능`

Redux나 Zustand 같은 상태 관리 라이브러리 없이도
컴포넌트 간 통신이 가능합니다.
단순한 신호 전달에는 커스텀 이벤트가 더 가볍습니다.

`3. React 외부와도 통신 가능`

DOM 이벤트 시스템을 사용하기 때문에
React 컴포넌트가 아닌 곳에서도 이벤트를 발생시키거나 받을 수 있습니다.

`4. 확장성`

새로운 OverlayPanel을 추가해도 기존 코드를 수정할 필요가 없습니다.
이벤트 리스닝만 추가하면 됩니다.

## 주의할 점

커스텀 이벤트도 만능은 아닙니다.

`1. 이벤트 이름 관리`

프로젝트가 커지면 커스텀 이벤트 이름이 많아질 수 있습니다.
상수로 관리하고 문서화해두는 것이 좋습니다.

`2. 메모리 누수`

컴포넌트가 언마운트될 때 반드시 이벤트 리스너를 제거해야 합니다.
useEffect의 cleanup 함수를 잊지 않도록 주의해야 합니다.

`3. 디버깅`

커스텀 이벤트는 React DevTools에서 추적되지 않습니다.
console.log나 별도의 로깅이 필요할 수 있습니다.

## 마무리

정리하자면

`1. stopPropagation으로 인해 기존 닫힘 처리가 동작하지 않는 문제 발생`<br/>
`2. 커스텀 이벤트로 패널 간 통신하여 해결`<br/>
`3. 전역 상태 없이 느슨한 결합으로 컴포넌트 간 통신 가능`

커스텀 이벤트는 이번 케이스처럼 단순한 신호 전달이 필요할 때 유용합니다.

비슷한 상황에서 활용해보시면 좋겠습니다.
