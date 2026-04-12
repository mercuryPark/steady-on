---
name: openspec
description: 새 기능/페이지 구현 전 구조화된 스펙 문서를 자동 생성하는 스펙 주도 개발 스킬
user_invocable: true
---

# openspec skill

바이브코딩 요청을 구조화된 스펙 문서로 변환합니다. 구현 전에 스펙을 먼저 정의하여 일관된 결과물을 보장합니다.

## 사용법

```
/openspec 새 블로그 카테고리 페이지
/openspec 다크모드 토글 복원
/openspec 포스트 검색 기능
```

## 실행 절차

1. 사용자 요청 분석
2. 관련 기존 코드/컴포넌트 탐색 (재사용 가능 여부 확인)
3. 스펙 문서 생성 → `.specs/[feature-name].md`에 저장
4. 사용자에게 스펙 리뷰 요청
5. 승인 시 구현 시작

## 스펙 문서 템플릿

```markdown
# [기능명] 스펙

## 개요
- **무엇을**: [구현할 기능 한 줄 설명]
- **왜**: [이 기능이 필요한 이유]
- **범위**: [영향받는 페이지/컴포넌트]

## 사용자 시나리오
1. 사용자가 [행동]을 한다
2. 시스템이 [반응]을 보여준다
3. 결과적으로 [상태]가 된다

## UI/UX 요구사항
- 레이아웃: [배치 설명]
- 스타일링: Tailwind 클래스 우선, 필요시 Chakra UI 컴포넌트
- 반응형: 모바일/데스크탑 분기점
- 애니메이션: Framer Motion 사용 여부 및 방식
- 다크모드: 대응 필요 여부

## 데이터 구조

### Frontmatter 변경 (해당 시)
- 새 필드: [필드명, 타입, 용도]

### GraphQL 쿼리 (해당 시)
- 쿼리 위치: [템플릿 파일]
- 필요 필드: [필드 목록]

### Gatsby Node API (해당 시)
- gatsby-node.js 수정 필요 여부: [예/아니오]
- 새 페이지 생성: [경로 패턴]
- createPages 로직: [설명]

## 컴포넌트 설계

| 컴포넌트 | 위치 | 역할 | 재사용 |
|----------|------|------|--------|
| [이름] | src/components/[도메인]/ | [역할] | 신규/기존 |

### Props 인터페이스
```typescript
interface [ComponentName]Props {
  // props 정의
}
```

## 기존 코드 재사용
- [재사용 가능한 컴포넌트/유틸 목록]
- [수정이 필요한 기존 파일 목록]

## 구현 단계
- [ ] 1단계: [설명]
- [ ] 2단계: [설명]
- [ ] 3단계: [설명]

## 검증 기준
- [ ] [구체적 동작 확인 항목]
- [ ] [반응형 확인 항목]
- [ ] [빌드 성공 확인]
```

## 프로젝트 맞춤 규칙

### Gatsby 페이지 생성 판단
- **정적 페이지** (경로 고정): `src/pages/`에 파일 생성
- **동적 페이지** (슬러그/파라미터 기반): `src/templates/`에 템플릿 + `gatsby-node.js`에서 createPages
- **기존 페이지에 섹션 추가**: 해당 컴포넌트만 수정

### 컴포넌트 배치 규칙
- 블로그 관련: `src/components/posts/`
- 포트폴리오 관련: `src/components/profile/`
- 홈페이지 관련: `src/components/showcase/`
- 공통 레이아웃: `src/components/layout/`
- 범용 유틸: `src/utils/`

### 스타일링 가이드
- Tailwind CSS 클래스 우선 사용
- 컴포넌트 라이브러리가 필요하면 Chakra UI
- 커스텀 CSS는 `src/styles/global.css`에 추가
- 디자인 토큰은 `src/style.css`의 CSS 변수 참조
- 태그 색상은 `src/utils/constants.ts`의 TAGS 배열에 추가

### 이미지 처리
- 블로그 포스트 이미지: 해당 포스트 디렉토리에 저장, frontmatter로 참조
- 정적 이미지: `static/images/`에 저장
- 컴포넌트 내 이미지: `gatsby-plugin-image`의 `GatsbyImage` 또는 `StaticImage` 사용
