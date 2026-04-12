# /profile 포트폴리오 - 이력서 동기화 & AI/바이브코딩 보강 계획

> docs/FRONTEND-RESUME.md 기반으로 /profile 포트폴리오 페이지의 내용을 일치화하고, AI/바이브코딩 경험을 기존 4개 탭 구조에 자연스럽게 녹이기

---

## 요구사항 요약

| 항목 | 설명 |
|------|------|
| 대상 | `/profile` 페이지 (7개 컴포넌트) |
| 원칙 | 이력서와 내용 일치 + 이력서보다 더 구체적인 경험 표현 |
| 구조 | 기존 4개 탭 유지, 각 탭 내에 AI/바이브코딩 내용 녹이기 |
| 데이터 소스 | docs/FRONTEND-RESUME.md (최신 버전) |

---

## 불일치 분석 & 수정 범위

### 즉시 수정 (팩트 불일치)

| 위치 | 현재 | 이력서 | 수정 |
|------|------|--------|------|
| Layout.tsx 연차 | "4년차" | "3.5년차" | 이력서에 맞게 수정 |
| Header.tsx 스킬 목록 | 13개 (AI 없음) | Claude Code, Biome, Vitest, Playwright 포함 | 스킬 추가 |
| Header.tsx 이력서 파일명 | `이력서_프론트엔드_박호연.pdf` | 현재 파일 존재 여부 확인 필요 | 확인 후 수정 |

### AI/바이브코딩 보강 (기존 탭에 녹이기)

---

## 수정 계획 (8 Step)

### Step 1: Layout.tsx — 히어로 섹션 보강

**파일**: `src/components/profile/Layout.tsx`

**수정 내용**:
1. "4년차 프론트엔드 개발자" → "3.5년차 프론트엔드 개발자" (이력서 line 14 일치)
2. 메인 헤딩에 AI 역량 키워드 자연스럽게 반영
   - 현재: "사용자 경험을 깊이 고민하며 실질적인 해결책을 제시하는 박호연입니다."
   - 변경 방향: 이력서 Summary의 3가지 축(B2B 서비스 설계, 성능 최적화, AI 바이브코딩)을 반영하면서도 포트폴리오에 맞는 톤

**검증**: 이력서 Summary와 메시지가 일관적인지 확인

---

### Step 2: Header.tsx — 스킬 목록 & 연락처 동기화

**파일**: `src/components/profile/Header.tsx`

**수정 내용**:
1. SKILLS 배열에 AI/테스팅 관련 기술 추가:
   - 추가: `Claude Code`, `Vitest`, `Playwright`, `Biome`
   - 이력서 Skills 섹션(lines 139-147)과 일치시키기
2. 이력서 다운로드 링크 파일명 확인 (`/이력서_프론트엔드_박호연.pdf` → `static/` 디렉토리 확인)
3. 기존 13개 스킬 순서/구성 이력서와 대조

**검증**: Skills 배열이 이력서 Skills 섹션과 일치

---

### Step 3: Contents.tsx — About Me AI 항목 보강

**파일**: `src/components/profile/Contents.tsx`

**수정 내용**:
1. About Me 섹션의 AI 관련 항목 보강
   - 현재: "업무에 AI를 활용해 적용해보고, 개발 시간과 코드품질을 개선하는 것을 좋아해요."
   - 변경: 바이브코딩 워크플로우 설계, CLAUDE.md 컨텍스트 관리, 테스트 파이프라인 등 구체적인 역량으로 확장
   - 이력서 Key Strengths "AI 기반 개발 자동화 & 바이브코딩"(line 33-34) 기반
2. 필요시 AI 활용 관련 항목을 1개 더 추가하여 구체화

**검증**: 이력서 Key Strengths AI 항목과 톤/내용 일관성

---

### Step 4: Career.tsx — 지란지교소프트 AI 활용 업무 추가

**파일**: `src/components/profile/Career.tsx`

**수정 내용**:
1. 지란지교소프트 tasks 배열에 AI 활용 업무 추가
   - 이력서 Technical Highlights(lines 92-114) 기반
   - 예: "Claude Code 바이브코딩 워크플로우 설계 및 3개 프로젝트 전면 적용"
   - 예: "AI 기반 테스트 자동화 파이프라인 구축 및 운영"

**검증**: tasks 배열의 항목이 이력서 Work Experience/Technical Highlights와 일치

---

### Step 5: Cureer.tsx — 프로젝트 타임라인에 AI 활용 사항 추가

**파일**: `src/components/profile/Cureer.tsx`

**수정 내용**:

**메신저 프로젝트 타임라인**:
- Next.js 마이그레이션 항목에 "Claude Code 바이브코딩 워크플로우 적용" 맥락 추가 (이력서 line 73)
- AI 워크플로우 설계/적용 타임라인 항목 추가 (시기: 이력서 Technical Highlights 기반)

**Admin 프로젝트 타임라인**:
- "Claude Code 워크플로우를 적용해 Nuxt.js → Next.js 전환" 맥락 추가 (이력서 line 86)

**Admin 프로젝트 기간**:
- 현재: 2024.12 - 2025.12 → 이력서: 2025.02 - 진행중 → 확인 후 일치시키기

**사이드 프로젝트**:
- 이력서 Other Experience(lines 124-128)와 대조하여 기간/설명 일치시키기

**검증**: 모든 프로젝트 기간이 이력서와 일치

---

### Step 6: Highlight.tsx — AI 관련 트러블슈팅 사례 검토

**파일**: `src/components/profile/Highlight.tsx`

**수정 내용**:
- 현재 4개 트러블슈팅은 모두 기술적 이슈(Chrome Throttling, 하이브리드 디바이스, Race Condition, 데이터 동기화)
- AI/바이브코딩 관련 트러블슈팅이 있다면 추가, 없으면 기존 유지
- 이력서에 AI 관련 트러블슈팅 사례는 별도 없으므로 **기존 유지 가능성 높음**
- 단, 4개 케이스의 설명이 이력서 Performance & Optimization(lines 60-64)과 일치하는지 확인

**검증**: 트러블슈팅 사례의 기술적 디테일이 이력서와 모순되지 않음

---

### Step 7: Performance.tsx — AI 성과 항목 추가 & 수치 보강

**파일**: `src/components/profile/Performance.tsx`

**수정 내용**:
1. AI/바이브코딩 성과 카드 추가:
   - 이력서 "실무 적용 & 성과"(lines 111-114) 기반
   - 예: "AI-Driven Development" 카드 — 메트릭: "75%↓" (일정 단축)
   - 설명: 바이브코딩 워크플로우로 신규 기능 3건 + 마이그레이션 3건 완료

2. 기존 카드의 수치 보강:
   - 이력서에 있는 구체적 수치(LCP 45% 개선, 40% 절감 등)와 일치시키기
   - 현재 일부 카드에 수치가 없는 항목은 이력서 기반으로 보충

**검증**: 모든 수치가 이력서와 일치, AI 성과 카드가 이력서 Technical Highlights 기반

---

### Step 8: 최종 검증 — 이력서 vs 포트폴리오 일치성 확인

1. 이력서의 모든 Key Strengths가 포트폴리오에 반영되었는지 확인
2. 수치/기간/프로젝트명 일관성 체크
3. `npm run develop`으로 로컬에서 /profile 페이지 렌더링 확인
4. 모바일/데스크탑 반응형 확인

---

## 검증 기준

- [ ] 연차: 이력서 "3.5년차"와 포트폴리오 일치
- [ ] 스킬 목록: Claude Code, Vitest, Playwright, Biome이 Header.tsx에 포함
- [ ] Contents.tsx AI 항목이 이력서 Key Strengths "AI 기반 개발 자동화 & 바이브코딩"과 일관적
- [ ] Career.tsx tasks에 AI 활용 업무 포함
- [ ] Cureer.tsx 프로젝트 타임라인에 AI 활용 맥락 반영
- [ ] Cureer.tsx Admin 프로젝트 기간이 이력서와 일치
- [ ] Performance.tsx에 AI/바이브코딩 성과 카드(75% 일정 단축) 추가됨
- [ ] 기존 수치(LCP 45%, 40% 절감, 50% 절감)가 이력서와 일치
- [ ] "바이브코딩" 키워드가 포트폴리오 내 2곳 이상에 자연스럽게 등장
- [ ] 기존 4개 탭 구조 유지, 새 탭 추가 없음
- [ ] `npm run develop` 빌드 성공 및 /profile 페이지 정상 렌더링

---

## 리스크 및 대응

| 리스크 | 대응 |
|--------|------|
| 하드코딩된 데이터가 많아 수정 범위가 넓음 | 7개 파일을 순차적으로 수정, 각 Step마다 빌드 체크 불필요 (최종 1회) |
| 이력서와 포트폴리오의 톤이 다름 (이력서: 간결, 포트폴리오: 서술적) | 이력서 내용을 포트폴리오 톤에 맞게 확장하여 서술 |
| 프로젝트 기간 불일치 가능성 | 이력서를 기준으로 통일 (이력서가 최신) |
| Performance.tsx 카드 6개로 늘어나면 레이아웃 변경 필요 | 기존 그리드 레이아웃이 유동적이므로 문제 없음 (확인 필요) |
| Cureer.tsx의 타임라인 항목이 매우 상세해서 수정 범위 판단 어려움 | AI 관련 항목만 추가/수정, 기존 항목은 최소 변경 |

---

## 수정 대상 파일 목록

| 파일 | Step | 수정 유형 |
|------|------|----------|
| `src/components/profile/Layout.tsx` | 1 | 텍스트 수정 (연차, 헤딩) |
| `src/components/profile/Header.tsx` | 2 | SKILLS 배열 추가 |
| `src/components/profile/Contents.tsx` | 3 | AI 항목 보강 |
| `src/components/profile/Career.tsx` | 4 | tasks 배열에 AI 업무 추가 |
| `src/components/profile/Cureer.tsx` | 5 | 타임라인 항목 추가/수정 |
| `src/components/profile/Highlight.tsx` | 6 | 확인만 (변경 최소) |
| `src/components/profile/Performance.tsx` | 7 | AI 성과 카드 추가 + 수치 보강 |
