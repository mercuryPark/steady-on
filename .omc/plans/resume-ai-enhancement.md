# 이력서 AI/바이브코딩 섹션 보강 계획

> docs/FRONTEND-RESUME.md의 기존 내용을 AI 활용·바이브코딩 관점에서 임팩트 있게 재구성

---

## 요구사항 요약

| 항목 | 설명 |
|------|------|
| 대상 파일 | `docs/FRONTEND-RESUME.md` |
| 방향 | 기존 내용 기반 표현·구조·키워드 강화 + 코드리뷰 구체 사례 보충 |
| 핵심 키워드 | AI 활용, Claude Code, 바이브코딩, AI 기반 개발 자동화, AI 성과 |
| 원칙 | 과장 없이 이미 있는 사실을 더 구체적·임팩트 있게 표현 |

---

## 현재 상태 분석

### 기존 AI 관련 내용 (docs/FRONTEND-RESUME.md)

| 위치 | 현재 내용 | 문제점 |
|------|----------|--------|
| Summary (line 18) | "Claude Code로 테스트 자동화와 코드 리뷰 환경을 구축" | Claude Code만 언급, 바이브코딩·AI 전반 활용 관점 부족 |
| Key Strengths (lines 33-34) | "AI 도구를 활용한 개발 자동화" 1개 항목 | 4개 Key Strengths 중 가장 짧고 구체성 부족 |
| Work Experience - 메신저 (lines 52-77) | AI 활용 내용이 분리되어 Technical Highlights에만 있음 | 실제 메신저 개발에 AI를 적용한 맥락이 Work Experience에는 드러나지 않음 |
| Work Experience - Admin (lines 78-87) | 마이그레이션 언급만 있고 AI 활용 여부 불명확 | AI 기반으로 마이그레이션한 것인지 알 수 없음 |
| Technical Highlights (lines 92-109) | 가장 상세하지만 "Claude Code 기반 개발 환경 구축"이라는 제목이 도구 중심 | 성과·방법론 중심으로 재구성 가능 |
| Skills (line 141) | "AI & Automation: Claude Code — 커스텀 커맨드, MCP 연동, 프로젝트 훅 설계" 한 줄 | 바이브코딩, 프롬프트 엔지니어링, AI 워크플로우 설계 등 키워드 부족 |

---

## 보강 계획 (5단계)

### Step 1: Summary 보강 (line 14-18)

**현재**: Claude Code로 테스트 자동화만 언급
**변경**: AI 활용 개발 방법론 전반을 아우르는 문장으로 확장

- "Claude Code 기반 바이브코딩 워크플로우를 설계해 테스트 자동화·코드 리뷰·마이그레이션에 적용" 방향
- 75% 일정 단축 성과는 유지하되, 적용 범위를 3건 → 구체 프로젝트명(메신저 신규 기능, Admin 마이그레이션)으로 명시

### Step 2: Key Strengths "AI 도구를 활용한 개발 자동화" 섹션 확장 (lines 33-34)

**현재** (2줄):
```
Claude Code로 4단계 테스트 파이프라인(Biome → Vitest → Playwright)을 구성하고,
커스텀 커맨드와 MCP 서버를 연동. 실제 신규 기능 3건에 적용해 일정 75% 단축 후 배포 완료.
```

**변경 방향**:
- 제목을 "AI 기반 개발 자동화 & 바이브코딩"으로 변경
- 3가지 축으로 구분: (1) 테스트 파이프라인 (2) AI 워크플로우 설계 (3) 실무 적용 성과
- 바이브코딩 = Claude Code 활용 개발 방법론이라는 맥락 자연스럽게 삽입
- CLAUDE.md 기반 프로젝트 컨텍스트 관리, 커스텀 스킬 설계 등 워크플로우 설계 역량 강조

### Step 3: Work Experience에 AI 활용 맥락 삽입

**메신저 섹션 (lines 52-77)**:
- 기존 Development 항목 중 "Next.js 전환 마이그레이션을 주도"에 Claude Code 활용 맥락 추가
- 별도 "AI-Driven Development" 소항목 추가는 하지 않고, 기존 항목에 자연스럽게 녹임
- 예: "기존 인증 시스템과 개발 환경을 Next.js로 전환하는 마이그레이션을 Claude Code 기반 바이브코딩으로 주도"

**Admin 섹션 (lines 78-87)**:
- "Nuxt.js → Next.js 전환" 항목에 AI 활용 워크플로우 적용 사실 명시
- 예: "Claude Code 워크플로우를 적용해 Nuxt.js → Next.js 전환 및 주요 페이지 마이그레이션을 단기간에 완료"

### Step 4: Technical Highlights 재구성 (lines 92-109)

**현재 제목**: "Claude Code 기반 개발 환경 구축"
**변경 제목**: "AI 기반 개발 워크플로우 설계 & 바이브코딩 실무 적용"

**구조 변경**:

현재 3개 소제목:
1. 테스트 & 프로세스 자동화
2. 컨텍스트 최적화
3. 실무 적용 & 성과

변경 후 4개 소제목:
1. **바이브코딩 워크플로우 설계** — CLAUDE.md 프로젝트 훅, 실무 커스텀 커맨드(git-commit, test-legacy, test-new-feature), MCP 서버 연동으로 프롬프트만으로 컨벤션에 맞는 코드를 생성하는 환경 구축
2. **테스트 자동화 파이프라인** — Biome → Vitest → Playwright 4단계 파이프라인 (기존 내용 유지)
3. **AI 기반 코드리뷰** — 사용자에게 구체적 사례를 확인받아 보충 (Summary line 18에서 언급했으나 상세 내용 부재였던 부분)
4. **실무 적용 성과** — 기존 성과에 더해 마이그레이션 3건, 워크플로우 고도화 과정 구체화

### Step 5: Skills 섹션 AI 항목 확장 (line 141)

**현재**: `AI & Automation: Claude Code — 커스텀 커맨드, MCP 연동, 프로젝트 훅 설계`

**변경**: 2줄로 확장
```
- **AI & Automation**: Claude Code (바이브코딩) — CLAUDE.md 컨텍스트 설계, 커스텀 커맨드, MCP 서버 연동, 4단계 테스트 파이프라인
- **AI Workflow**: 프로젝트 컨텍스트 설계, AI 기반 코드리뷰, 마이그레이션 자동화, 프로젝트별 AI 워크플로우 설계
```
> 참고: "프롬프트 엔지니어링" → "프로젝트 컨텍스트 설계"로 변경 (이력서에 근거 있는 표현으로 대체)
> 참고: "커스텀 스킬" → "커스텀 커맨드"로 변경 (이력서 line 97의 실무 표현과 일치)

---

## 검증 기준

- [ ] "바이브코딩" 키워드가 Summary, Key Strengths, Technical Highlights 중 2곳 이상에 자연스럽게 등장
- [ ] "Claude Code" 언급이 도구 나열이 아닌 방법론/워크플로우 맥락으로 서술됨
- [ ] Work Experience의 메신저·Admin 섹션에서 AI 활용 사실이 드러남
- [ ] 기존 수치 성과(75% 단축, LCP 45% 개선 등)가 모두 유지됨
- [ ] 코드리뷰 구체 사례가 Technical Highlights에 보충됨 (기존 Summary의 주장을 뒷받침)
- [ ] 이력서 전체 톤이 과장 없이 일관적임
- [ ] Technical Highlights 제목이 AI/바이브코딩 방법론 중심으로 변경됨
- [ ] Skills에 바이브코딩, 프로젝트 컨텍스트 설계, AI 워크플로우 키워드 포함
- [ ] openspec 등 개인 프로젝트용 스킬이 실무 사례로 혼동되지 않음
- [ ] 실무 커맨드(git-commit, test-legacy, test-new-feature)만 이력서에 언급

---

## 리스크 및 대응

| 리스크 | 대응 |
|--------|------|
| "바이브코딩"이 아직 업계에서 정식 용어로 정착하지 않아 면접관이 모를 수 있음 | 괄호로 간단 설명 보충: "바이브코딩(AI 기반 대화형 개발)" 형태 |
| AI 활용을 과도하게 강조하면 본인 역량이 약해 보일 수 있음 | AI는 "도구/방법론"으로 포지셔닝, 핵심은 "설계·판단·적용 역량"으로 서술 |
| Work Experience에 AI 맥락을 넣으면 기존 흐름이 어색해질 수 있음 | 별도 소항목을 만들지 않고 기존 문장에 자연스럽게 합류 |
| 이력서가 지나치게 길어질 수 있음 | 기존 내용 재구성 위주, 줄 수 증가는 5줄 이내로 제한 |

---

## 대상 파일

- 수정: `/Users/hoyeon/Documents/workspace/steady-on/docs/FRONTEND-RESUME.md`
