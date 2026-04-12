# 바이브코딩 최적화 환경 구성 계획

> Steady On (개발블로그 & 포트폴리오) 프로젝트에 Claude Code 기반 바이브코딩 환경 세팅

---

## 요구사항 요약

| 항목 | 설명 |
|------|------|
| 대상 프로젝트 | Gatsby 5 + React 18 + TypeScript + Tailwind CSS + Chakra UI 블로그/포트폴리오 |
| 목표 | Claude Code로 빠르고 일관된 개발을 위한 프로젝트 컨텍스트 및 스킬 세팅 |
| 산출물 | CLAUDE.md, git-commit skill, openspec skill, ui-ux-pro-max 프로젝트 설정 |

---

## Phase 1: CLAUDE.md 작성

### 목적
프로젝트의 기술 스택, 구조, 컨벤션, 주요 명령어를 Claude Code가 자동으로 인식하게 하여 매 대화마다 반복 설명 없이 정확한 코드를 생성하도록 함.

### 포함 내용

1. **프로젝트 개요**
   - Steady On: 개인 개발블로그 & 포트폴리오 (Gatsby SSG)
   - 배포: Netlify (https://staysteady.netlify.app)
   - Node 20 (.nvmrc), npm

2. **기술 스택**
   - Gatsby 5.14 + React 18 + TypeScript
   - Tailwind CSS 3.4 + Chakra UI 2.3 + Emotion
   - Framer Motion (애니메이션)
   - Prism.js (코드 하이라이팅)
   - Markdown + gatsby-remark-* (콘텐츠)

3. **핵심 명령어**
   - `npm run develop` — 로컬 개발 서버
   - `npm run build` — 프로덕션 빌드
   - `npm run clean` — Gatsby 캐시 정리
   - `npm run format` — Prettier 포맷팅

4. **디렉토리 구조 & 컨벤션**
   - `src/components/` — 컴포넌트 (layout/, posts/, profile/, showcase/)
   - `src/templates/` — Gatsby 페이지 템플릿 (blog-home, blog-post, blog-list, blog-tags, profile)
   - `src/utils/` — 유틸리티 (constants.ts, page.ts)
   - `content/blog/` — 마크다운 블로그 포스트 (frontmatter: title, date, tags, signboard, shorts, thumbnail_image)
   - `docs/` — 이력서/경력 문서 (CAREER.md)
   - `static/images/` — 정적 이미지 에셋

5. **코딩 컨벤션**
   - 레이아웃 컴포넌트: `.tsx` (TypeScript)
   - 템플릿/페이지: `.js` (기존 패턴 유지)
   - 스타일링: Tailwind 클래스 우선, Chakra UI 컴포넌트 보조
   - 한국어 콘텐츠, 한국어 날짜 포맷 (moment/locale/ko)
   - Prettier 포맷팅 적용

6. **라우팅 구조**
   - `/` — 홈 (시그니처 캐러셀 + 쇼츠 + 포스트 리스트)
   - `/profile` — 포트폴리오 (탭 네비게이션)
   - `/posts/:slug/` — 블로그 포스트 상세
   - `/tags`, `/tag/:tagName/` — 태그 필터링
   - `/:pageNum/` — 페이지네이션

7. **주의사항**
   - gatsby-node.js에서 페이지 생성 로직 관리
   - GraphQL 쿼리는 템플릿 파일 하단에 위치
   - 다크모드 토글은 현재 비활성화 상태
   - 이미지는 gatsby-plugin-image + sharp 사용 (WebP 자동 변환)

### 검증 기준
- [ ] Claude Code 새 세션에서 "이 프로젝트가 뭐야?" 물어봤을 때 정확히 답변 가능
- [ ] `npm run develop` 등 명령어를 별도 안내 없이 사용
- [ ] 컴포넌트 생성 시 프로젝트 컨벤션(TSX, Tailwind 우선) 자동 준수

### 대상 파일
- 생성: `/Users/hoyeon/Documents/workspace/steady-on/CLAUDE.md`

---

## Phase 2: git-commit skill 세팅

### 목적
일관된 커밋 메시지 포맷과 한국어 커밋 컨벤션을 자동 적용하여, `/commit` 한 번으로 깔끔한 커밋을 생성.

### 구현 방식
프로젝트 로컬 스킬로 `.claude/skills/git-commit.md` 생성.

### 스킬 내용

1. **커밋 메시지 포맷**
   - 기존 커밋 히스토리 분석: 한국어 커밋 메시지 사용 중
   - 포맷: `[카테고리] 설명` (기존 패턴: `[리뉴얼] 포트폴리오 내용 및 디자인 보완`)
   - 카테고리: `기능`, `수정`, `스타일`, `리팩터`, `문서`, `설정`, `콘텐츠`

2. **자동 동작**
   - 변경 사항 분석 (git diff)
   - 적절한 카테고리 자동 선택
   - 한국어로 간결한 설명 생성
   - Co-Authored-By 태그 포함

### 검증 기준
- [ ] `/commit` 실행 시 한국어 커밋 메시지 자동 생성
- [ ] 카테고리가 변경 내용에 맞게 자동 선택됨
- [ ] 기존 커밋 히스토리 스타일과 일관성 유지

### 대상 파일
- 생성: `/Users/hoyeon/Documents/workspace/steady-on/.claude/skills/git-commit.md`

---

## Phase 3: openspec skill 세팅

### 목적
새 기능이나 페이지를 만들기 전에 스펙을 먼저 정의하고, 그 스펙에 따라 구현하는 스펙 주도 개발 워크플로우 구성. 바이브코딩 시 "대충 이런 거 만들어줘"를 구조화된 스펙으로 변환.

### 구현 방식
프로젝트 로컬 스킬로 `.claude/skills/openspec.md` 생성.

### 스킬 내용

1. **스펙 문서 자동 생성**
   - 요청 분석 → 구조화된 스펙 문서 생성
   - 저장 위치: `.specs/[feature-name].md`

2. **스펙 문서 구조**
   - 개요 (무엇을, 왜)
   - 사용자 시나리오
   - UI/UX 요구사항 (Tailwind + Chakra UI 기반)
   - 데이터 구조 (GraphQL 쿼리, frontmatter 등)
   - 컴포넌트 설계 (파일 위치, props)
   - 구현 단계 (체크리스트)
   - 검증 기준

3. **프로젝트 맞춤 컨텍스트**
   - Gatsby 페이지 생성 시 gatsby-node.js 수정 필요 여부 판단
   - 마크다운 콘텐츠 vs React 컴포넌트 구분
   - 기존 컴포넌트 재사용 가능 여부 분석

### 검증 기준
- [ ] `/openspec 새 블로그 카테고리 페이지` 실행 시 구조화된 스펙 생성
- [ ] 스펙에 Gatsby/GraphQL 관련 고려사항 자동 포함
- [ ] 기존 컴포넌트 재사용 제안 포함

### 대상 파일
- 생성: `/Users/hoyeon/Documents/workspace/steady-on/.claude/skills/openspec.md`
- 생성: `/Users/hoyeon/Documents/workspace/steady-on/.specs/` (디렉토리)

---

## Phase 4: ui-ux-pro-max 프로젝트 설정

### 목적
이미 글로벌 플러그인으로 활성화된 ui-ux-pro-max를 이 프로젝트에 맞게 최적화. 프로젝트의 디자인 시스템(색상, 폰트, 간격)을 인식하여 일관된 UI 생성.

### 구현 방식
CLAUDE.md 내에 UI/UX 디자인 가이드라인 섹션 추가 + ui-ux-pro-max가 참조할 수 있는 디자인 토큰 명시.

### 설정 내용

1. **CLAUDE.md 디자인 섹션 추가**
   - 컬러 팔레트 (CSS 변수 기반)
     - Primary: `#005b99`
     - Text: `#2e353f` / Light: `#4f5969`
     - Heading: `#1a202c`
     - Accent: `#d1dce5`
   - 타이포그래피 스케일 (Minor Third 1.2)
     - Heading: SBAggroB, Montserrat
     - Body: Pretendard, Merriweather
   - 태그 색상 체계 (yellow/purple/blue)
   - 간격 체계 (CSS 변수 --spacing-*)

2. **스택 명시**
   - React + Tailwind CSS + Chakra UI + Framer Motion
   - Gatsby Image 컴포넌트 사용
   - 반응형 모바일 퍼스트

3. **디자인 원칙**
   - 한국어 콘텐츠 최적화 (Pretendard 폰트)
   - 깔끔하고 읽기 쉬운 블로그 레이아웃
   - 애니메이션은 Framer Motion으로 절제된 사용
   - 다크모드 대응 CSS 클래스 구조

### 검증 기준
- [ ] UI 컴포넌트 생성 시 프로젝트 컬러 팔레트 자동 적용
- [ ] Tailwind 클래스 + Chakra UI 컴포넌트 혼용 시 일관된 스타일
- [ ] 새 컴포넌트에 Framer Motion 애니메이션 자연스럽게 적용

### 대상 파일
- 수정: `/Users/hoyeon/Documents/workspace/steady-on/CLAUDE.md` (디자인 섹션 추가)

---

## 실행 순서 및 의존성

```
Phase 1 (CLAUDE.md) ──→ Phase 4 (UI/UX 섹션 추가)
     │
     ├──→ Phase 2 (git-commit skill) [독립]
     │
     └──→ Phase 3 (openspec skill) [독립]
```

- Phase 1이 기반 — CLAUDE.md 생성 후 Phase 4에서 디자인 섹션 추가
- Phase 2, 3은 Phase 1과 독립적이므로 병렬 실행 가능

---

## 리스크 및 대응

| 리스크 | 영향 | 대응 |
|--------|------|------|
| CLAUDE.md가 너무 길어져 Claude가 무시 | 컨텍스트 활용도 저하 | 핵심 정보만 간결하게, 500줄 이내 유지 |
| git-commit 카테고리가 기존 히스토리와 불일치 | 커밋 로그 혼란 | 기존 커밋 패턴 분석 후 호환되는 카테고리 설계 |
| openspec 스펙이 과도하게 상세 | 바이브코딩 흐름 방해 | 간결한 기본 템플릿 + 필요시 상세화 옵션 |
| ui-ux-pro-max 토큰과 실제 CSS 변수 불일치 | 잘못된 스타일 생성 | src/style.css의 실제 CSS 변수 직접 참조 |

---

## 최종 산출물 목록

| 파일 | 작업 | Phase |
|------|------|-------|
| `CLAUDE.md` | 신규 생성 | 1 + 4 |
| `.claude/skills/git-commit.md` | 신규 생성 | 2 |
| `.claude/skills/openspec.md` | 신규 생성 | 3 |
| `.specs/` | 디렉토리 생성 | 3 |
