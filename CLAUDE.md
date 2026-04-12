# Steady On - 개발블로그 & 포트폴리오

개인 개발블로그 및 포트폴리오 사이트. 박호연(프론트엔드 개발자)의 기술 블로그.

- 배포: Netlify (https://staysteady.netlify.app)
- 저장소: https://github.com/mercuryPark/steady-on

## 기술 스택

- **프레임워크**: Gatsby 5.14 (SSG) + React 18 + TypeScript
- **스타일링**: Tailwind CSS 3.4 (주) + Chakra UI 2.3 (보조) + Emotion
- **애니메이션**: Framer Motion
- **콘텐츠**: Markdown + gatsby-remark-* (Prism.js 코드 하이라이팅)
- **이미지**: gatsby-plugin-image + Sharp (WebP 자동 변환, quality 90)
- **폰트**: Pretendard (본문), SBAggroB (제목), Montserrat, Merriweather
- **런타임**: Node 20 (.nvmrc), npm

## 주요 명령어

```bash
npm run develop   # 로컬 개발 서버 (gatsby develop)
npm run build     # 프로덕션 빌드 (gatsby build)
npm run clean     # Gatsby 캐시 정리 (gatsby clean)
npm run format    # Prettier 포맷팅
```

## 디렉토리 구조

```
src/
  components/
    layout/        # Header, Main, Footer, Container
    posts/         # list/ (Card, Layout, toc/), details/ (Layout, Comments, RecommendPosts), tags/
    profile/       # Layout(탭), Header, Career, Cureer, Contents, Highlight, Performance
    showcase/      # Layout, Signboard(캐러셀), Shorts
  templates/       # blog-home.js, blog-post.js, blog-list.js, blog-tags.js, profile.js
  pages/           # 404.js
  utils/           # constants.ts (태그 색상), page.ts (경로 유틸)
  styles/          # global.css (Tailwind + 커스텀)
  style.css        # CSS 변수 (디자인 토큰)
content/blog/      # 마크다운 블로그 포스트 (디렉토리별)
docs/              # CAREER.md (이력서/경력)
static/images/     # 정적 이미지 에셋
```

## 라우팅

| 경로 | 템플릿 | 설명 |
|------|--------|------|
| `/` | blog-home.js | 홈 (시그니처 캐러셀 + 쇼츠 + 포스트) |
| `/profile` | profile.js | 포트폴리오 (4개 탭) |
| `/posts/:slug/` | blog-post.js | 블로그 포스트 상세 + TOC |
| `/tags`, `/tag/:name/` | blog-tags.js | 태그 필터링 |
| `/:pageNum/` | blog-list.js | 페이지네이션 |

페이지 생성 로직은 `gatsby-node.js`에서 관리. GraphQL 쿼리는 각 템플릿 파일 하단에 위치.

## 블로그 포스트 Frontmatter

```yaml
title: string           # 제목
description: string     # 설명
date: "ISO date"        # 작성일
tags: [string]          # 태그 (JavaScript, React, Gatsby 등)
signboard: boolean      # 홈 캐러셀 노출 여부
shorts: boolean         # 쇼츠 섹션 노출 여부
subtitle: string        # 카드 호버 시 표시
thumbnail_image: path   # 썸네일 (상대 경로)
```

## 코딩 컨벤션

- **컴포넌트**: `.tsx` (TypeScript)
- **템플릿/페이지**: `.js` (기존 패턴 유지)
- **스타일링 우선순위**: Tailwind 클래스 > Chakra UI 컴포넌트 > 커스텀 CSS
- **언어**: 한국어 콘텐츠, moment/locale/ko 한국어 날짜 포맷
- **Prettier**: arrowParens: "avoid", semi: false
- **새 컴포넌트 생성 시**: 해당 도메인 디렉토리 하위에 배치 (posts/, profile/, showcase/)

## 디자인 시스템 (ui-ux-pro-max 참조)

### 컬러 팔레트 (src/style.css)

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--color-primary` | `#005b99` | 링크, 액센트 |
| `--color-text` | `#2e353f` | 본문 텍스트 |
| `--color-text-light` | `#4f5969` | 보조 텍스트 |
| `--color-heading` | `#1a202c` | 제목 |
| `--color-heading-black` | `black` | h1 |
| `--color-accent` | `#d1dce5` | 구분선, 보더 |

### 태그 색상 (src/utils/constants.ts)

| 태그 | 뱃지 | 텍스트 |
|------|------|--------|
| JavaScript | `bg-yellow-50 ring-yellow-600/20` | `text-yellow-800` |
| Gatsby | `bg-purple-50 ring-purple-700/10` | `text-purple-700` |
| React | `bg-blue-50 ring-blue-700/10` | `text-blue-700` |

### 타이포그래피

- **스케일**: Minor Third (1.2) — `--fontSize-0`(0.833rem) ~ `--fontSize-7`(2.986rem)
- **제목 폰트**: SBAggroB (CDN), MontserratVariable (로컬)
- **본문 폰트**: Pretendard-Regular (CDN), Merriweather (로컬)
- **Weight**: normal(400), bold(700), black(900)
- **Line-height**: none(1), tight(1.1), normal(1.5), relaxed(1.625)

### 간격 체계

CSS 변수 `--spacing-{0~32}` (0 ~ 8rem), `--maxWidth-{xs~4xl}` (20rem ~ 56rem)

### UI 컴포넌트 생성 규칙

- **스택**: React + Tailwind CSS + Chakra UI + Framer Motion
- **반응형**: 모바일 퍼스트, Tailwind 브레이크포인트 사용
- **애니메이션**: Framer Motion으로 진입/퇴장 효과 (절제된 사용)
- **이미지**: `GatsbyImage` 또는 `StaticImage` 컴포넌트 (gatsby-plugin-image)
- **아이콘**: @heroicons/react
- **다크모드**: `.chakra-ui-dark` / `.dark` CSS 클래스 대응 구조 유지
- **새 태그 추가 시**: `src/utils/constants.ts`의 TAGS 배열에 추가 + `tailwind.config.js` safelist에 색상 추가

## 주의사항

- 다크모드 토글은 Header에서 현재 비활성화 상태 (Chakra useColorMode는 설정됨)
- 이미지는 gatsby-plugin-image의 GatsbyImage 컴포넌트 사용
- 댓글은 Utterances (GitHub Issues 기반)
- 태그 색상 매핑은 `src/utils/constants.ts`에 정의
- 캐러셀은 react-slick 사용
