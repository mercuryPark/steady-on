# 포트폴리오 ↔ 이력서 동기화 계획

> 이력서(docs/FRONTEND-RESUME.md)가 Source of Truth.
> 포트폴리오(/profile 컴포넌트)를 이력서에 맞게 보완.

---

## 검증 기준 (Acceptance Criteria)

- [ ] 포트폴리오에 이력서에 없는 프로젝트/성과가 표시되지 않음
- [ ] 이력서의 Key Strengths 4가지가 포트폴리오 Contents 섹션에 반영됨
- [ ] 이력서의 Skills 목록과 포트폴리오 SKILLS 배열이 일치함
- [ ] OfficeNEXT 메신저의 Design System & UI, Performance 항목이 포트폴리오에 반영됨
- [ ] Career 설명이 이력서 표현과 일치함
- [ ] Technical Highlights의 AI 워크플로우 상세 내용이 Performance 탭에 반영됨
- [ ] `npm run develop`로 로컬 빌드가 깨지지 않음

---

## 구현 단계

### Step 1: Contents.tsx — Key Strengths로 교체
**파일**: `src/components/profile/Contents.tsx`

**현재**: About Me + Communication (이력서에 없는 일반적 내용)
**변경**: 이력서 Key Strengths 4가지로 교체

1. `character` (About Me) 섹션 → **프론트엔드 설계 & 디자인 시스템**
   - "B2B 웹 서비스와 어드민 툴을 초기 설계부터 운영까지 담당"
   - "Toast, FAB, 검색 필터, 버튼 등 공용 컴포넌트를 variants·스타일 props 기반으로 설계"
   - "디자인 토큰(컬러·글꼴·테마) 관리"

2. `communication` 섹션 → **성능 최적화**
   - "IndexedDB 캐싱으로 반복 API 호출 제거, Web Worker로 UI 프리징 해결"
   - "LCP 6초→3초대 (약 45%)"
   - "Vite 번들 분석과 코드 스플리팅"

3. **추가**: **상태관리에 대한 깊은 이해**
   - "Jotai atom 모델 분석 → 의존성 기반 구독 최소화 경량 라이브러리(piko)"
   - "실무에서는 React Query로 서버 상태 관리"

4. **추가**: **AI 기반 개발 자동화 & 바이브코딩**
   - "CLAUDE.md로 프로젝트 컨텍스트 관리"
   - "커스텀 커맨드 + MCP 서버 연동"
   - "Biome→Vitest→Playwright 4단계 테스트 파이프라인"
   - "신규 기능 3건 + 마이그레이션 3건, 일정 75% 단축"

주석 처리된 `strength`/`myJob` 섹션도 제거.

---

### Step 2: Header.tsx — Skills 동기화
**파일**: `src/components/profile/Header.tsx:3-18`

**현재 SKILLS 배열**:
```
Next.js, React, TypeScript, Tailwind CSS, React Native, Expo, Electron, Vite, Web Socket, React Query, Jotai, Claude Code, Biome, Vitest, Playwright
```

**이력서 기준으로 변경**:
```
JavaScript, TypeScript, React, Next.js, React Native, Expo, Electron,
Jotai, React Query, TailwindCSS, CSS Modules, styled-components, Emotion.js,
Vite, Biome, Vitest, Playwright, Claude Code
```

변경 사항:
- **추가**: JavaScript, CSS Modules, styled-components, Emotion.js
- **삭제**: Web Socket (이력서 Skills에 없음)
- 순서: 이력서 Skills 섹션 카테고리 순서 반영 (Languages → Frontend → State → Styling → Build → Testing → AI)

> Note: Gitlab, Jira, Figma, Cursor는 이력서에서 Tools 카테고리. 포트폴리오 "Core Tech Stack" 성격상 개발 도구는 제외해도 무방. 사용자 확인 필요.

---

### Step 3: Cureer.tsx (main) — 프로젝트 구조 이력서 정렬
**파일**: `src/components/profile/Cureer.tsx`

#### 3-1. Internal Ops Platform 삭제 (Line 230-263)
이력서 Work Experience에 없음 → 섹션 전체 삭제 + 구분선 삭제

#### 3-2. OfficeNEXT Messenger에 Design System & UI / Performance 섹션 추가
현재: "Messenger Development" 하나의 ProjectSection에 시간순 나열
변경: 이력서 구조에 맞춰 3개 ProjectSection으로 분리

**Performance & Optimization** (이력서 내용):
- LCP 약 6초 → 3초대 (약 45%)
- IndexedDB 캐싱 + WebSocket 동기화
- MD5 연산 Web Worker 분리 (3초 프리징 해결)
- Chrome Background Throttling → Worker 기반 수신 전환
- Vite 번들 분석, 코드 스플리팅·트리 쉐이킹

**Design System & UI** (이력서 내용):
- Toast, FAB, 검색 필터, 버튼 등 공용 컴포넌트 (variants, 스타일 props)
- 디자인 토큰 (시그니처 컬러, 글꼴, 글자 크기 등 테마 시스템)

**Development** (기존 시간순 항목 유지 + 이력서 내용 보강):
- 기존 인증 시스템 Next.js 전환 (Claude Code 바이브코딩)
- Electron 데스크톱 앱 + IPC 통신
- 채팅, 채널, 메시지, 보관함, 이미지 미리보기 등 핵심 기능
- 웹 앱 전용 인증 서버 + 데모 모드

#### 3-3. OfficeNEXT Admin 이력서 표현 정렬
현재 항목들은 이력서와 거의 일치 → 큰 변경 불필요. "Claude Code로 전환 작업 가속" 표현을 이력서의 "Claude Code 워크플로우를 적용해" 표현으로 정리.

---

### Step 4: Cureer.tsx (side) — 사이드 프로젝트 정리
**파일**: `src/components/profile/Cureer.tsx`

#### 4-1. "박호연의 개발블로그" 삭제 (Line 341-361)
이력서 Other Experience에 없음 → 삭제

#### 4-2. 나머지 사이드 프로젝트 이력서 표현 정렬
- 잠깐살래: "React Native/Expo 모바일 앱 개발, 인증 구현, CI/CD 파이프라인 구축" → 현재 내용과 일치, OK
- 메일트리: "메일 전송 기반 상용 서비스 유지보수, 모바일 앱 내 연산 오류 해결" → 현재 3개 항목을 2개로 축소
- 토박이(동네 정보 공유 플랫폼): "카카오맵·공공지도 API 연계 지도 프론트엔드, 위치 기반 추천 기능 개발" → 현재 4개 항목을 이력서 표현으로 축소

---

### Step 5: Performance.tsx — 이력서 Technical Highlights 기준 정리
**파일**: `src/components/profile/Performance.tsx`

**삭제 대상** (이력서에 없음):
- Data Structure Optimization (O(1))
- Event Handling Optimization (MEM)
- Scalable Architecture & Pattern (FSD)
- Native-like Web Ecosystem (IPC)
- Resource Asset Engineering (50%↓) — LCP 내용은 Step 3에서 메신저 Performance 섹션으로 이동

**유지 및 보강**:
- AI-Driven Development (75%↓) — 이력서 Technical Highlights 전체 내용으로 보강:
  - 바이브코딩 워크플로우 설계 (CLAUDE.md, 커스텀 커맨드, MCP 서버)
  - 테스트 자동화 파이프라인 (Biome→Vitest→통합→Playwright 4단계)
  - AI 에이전트 코딩 리뷰 프로세스
  - 실무 적용 성과 (신규 기능 3건 + 마이그레이션 3건)

**추가**:
- 경량 상태관리 라이브러리 (piko) — 이력서 Technical Highlights에 있음
  - Jotai atom 모델 분석
  - 의존성 기반 업데이트·구독 최소화 구현

---

### Step 6: Career.tsx — 설명 이력서 표현 정렬
**파일**: `src/components/profile/Career.tsx`

- 지란지교소프트 description (Line 79):
  현재: "B2B SaaS 협업툴을 개발하는 회사로, 메신저를 중심으로 어드민 및 운영 플랫폼 개발을 담당하고 있습니다."
  변경: "B2B SaaS 환경에서 기업용 메신저 중심의 협업툴을 개발하고 있습니다."
  tasks: 이력서에는 tasks 목록이 없으므로 현재 tasks 유지 (포트폴리오 보충 설명으로 허용)

- 아웃도어스쿨 description (Line 92):
  현재: 확장된 설명
  변경: "자사 쇼핑몰 프론트엔드 운영. 모바일/PC 반응형 대응과 SEO 작업을 담당했습니다."
  tasks: 이력서에 없는 상세 내용이므로 간결화

---

### Step 7: 빌드 검증
```bash
npm run develop
```
로컬 개발 서버에서 /profile 페이지 정상 렌더링 확인.

---

## 리스크 & 대응

| 리스크 | 대응 |
|--------|------|
| 포트폴리오 콘텐츠 대폭 축소로 빈약해 보일 수 있음 | 이력서 기준으로 동기화하되, 포트폴리오 특성상 시각적 보충은 유지 |
| Performance 탭에 카드가 2개만 남아 밸런스 문제 | AI 워크플로우 카드 내용을 이력서 기준으로 충실히 보강하여 밀도 확보 |
| 메신저 섹션이 3개 ProjectSection으로 분리되면 길어짐 | 각 섹션을 간결하게 유지, 이력서 bullet과 1:1 매핑 |

---

## 작업 순서 우선순위

1. **Contents.tsx** (Key Strengths 교체) — 가장 큰 불일치
2. **Cureer.tsx main** (Internal Ops 삭제 + 메신저 구조 변경) — 구조적 변경
3. **Performance.tsx** (4개 삭제 + AI 보강 + piko 추가) — 대량 삭제
4. **Cureer.tsx side** (블로그 삭제 + 항목 축소) — 경미한 변경
5. **Header.tsx** (Skills 동기화) — 단순 배열 수정
6. **Career.tsx** (설명 정렬) — 텍스트만 수정
7. **빌드 검증**
