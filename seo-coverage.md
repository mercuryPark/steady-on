# SEO Coverage

> 최종 업데이트: 2026-04-17
> 참조 계획서: `docs/SEO_PLAN.md`

---

## 현재 상태 요약

| 항목 | 상태 | 비고 |
|------|------|------|
| siteMetadata 정상화 | 완료 | title, description, siteUrl, author, social, image, locale |
| SEO 컴포넌트 (Head API) | 완료 | canonical, og:\*, twitter:\*, robots directives |
| JSON-LD 구조화 데이터 | 완료 | WebSite, Person, ProfilePage, BlogPosting |
| Sitemap 생성 | 완료 | `/sitemap-index.xml` + `/sitemap-0.xml` (35 URL) |
| robots.txt | 완료 | env 기반 Allow/Disallow + Sitemap + Host |
| Core Web Vitals | 완료 | font-display:swap, preconnect, lang="ko" |
| Google Search Console 등록 | **미완료** | 사용자 직접 등록 필요 |
| Naver Search Advisor 등록 | **미완료** | 사용자 직접 등록 필요 |
| Bing Webmaster Tools | **미완료** | 선택사항, GSC에서 import 가능 |

---

## 변경된 파일 목록

| 파일 | 변경 내용 |
|------|-----------|
| `gatsby-config.js` | siteMetadata 전면 교체, sitemap/robots 플러그인 등록, RSS 타이틀 변경 |
| `gatsby-node.js` | SiteSiteMetadata 스키마에 titleTemplate, image, locale, verification, Social.github 추가 |
| `src/components/seo.js` | 전면 재작성 — canonical, og:\*, twitter:\*, robots, verification 메타 태그 |
| `src/templates/blog-home.js` | Head export 추가 + WebSite/Person JSON-LD |
| `src/templates/blog-post.js` | Head에 pathname/article/publishedTime/tags 전달 + BlogPosting JSON-LD, rawDate 쿼리 추가 |
| `src/templates/profile.js` | Head export 추가 + ProfilePage JSON-LD |
| `src/templates/blog-list.js` | Head export 추가 (페이지 번호 포함 title) |
| `src/templates/blog-tags.js` | Head export 추가 (태그명 동적 추출) |
| `src/pages/404.js` | Head에 pathname 전달, 한국어 description |
| `gatsby-ssr.js` | onRenderBody: html lang="ko", preconnect/dns-prefetch (jsdelivr) |
| `src/styles/global.css` | @font-face에 font-display: swap 추가 |

---

## SEO 컴포넌트 사용법

`src/components/seo.js`의 `<Seo>` 컴포넌트를 각 페이지의 `Head` export에서 사용한다.

```jsx
// 기본 (홈 등)
export const Head = ({ location }) => (
  <Seo description="페이지 설명" pathname={location?.pathname} />
)

// 블로그 포스트 (article 모드)
export const Head = ({ data, location }) => (
  <Seo
    title="포스트 제목"
    description="포스트 설명"
    pathname={location.pathname}
    article                          // og:type을 "article"로 변경
    publishedTime="2025-07-10"       // article:published_time
    tags={["JavaScript", "React"]}   // article:tag
    image="/images/custom-og.png"    // 페이지별 og:image (선택)
  >
    {/* children으로 JSON-LD 등 추가 가능 */}
    <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
  </Seo>
)
```

### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `title` | string | siteMetadata.title | 페이지 제목 |
| `description` | string | siteMetadata.description | 페이지 설명 |
| `pathname` | string | "" | 현재 경로 (canonical/og:url 생성) |
| `image` | string | siteMetadata.image | og:image 경로 (사이트 상대경로) |
| `article` | boolean | false | true면 og:type="article" |
| `publishedTime` | string | - | article:published_time |
| `tags` | string[] | - | article:tag 메타 태그 |
| `children` | ReactNode | - | JSON-LD 등 추가 요소 |

---

## JSON-LD 구조화 데이터 매핑

| 페이지 | 스키마 타입 | 파일 |
|--------|------------|------|
| 홈 (`/`) | `WebSite` + `Person` (@graph) | `src/templates/blog-home.js` |
| 프로필 (`/profile`) | `ProfilePage` + `Person` | `src/templates/profile.js` |
| 블로그 포스트 (`/posts/*`) | `BlogPosting` | `src/templates/blog-post.js` |

---

## Sitemap & robots 설정

### gatsby-plugin-sitemap

```
output: "/"  →  /sitemap-index.xml + /sitemap-0.xml
```

- 제외 경로: `/404`, `/404.html`, `/dev-404-page`
- changefreq: weekly
- priority: 홈 1.0, 나머지 0.7

### gatsby-plugin-robots-txt

```
env 기반 정책:
  development → Disallow: /
  production  → Allow: /

resolveEnv: GATSBY_ACTIVE_ENV || NODE_ENV || "development"
```

> `static/robots.txt`가 존재하지만 빌드 시 플러그인이 덮어쓴다. 삭제해도 무방.

---

## 검색엔진 등록 가이드

### 1. Google Search Console

1. https://search.google.com/search-console 접속
2. "URL 접두어" → `https://staysteady.netlify.app` 입력
3. "HTML 태그" 인증 방식 선택 → `content` 값 복사
4. `gatsby-config.js` → `siteMetadata.verification.google`에 붙여넣기
5. 배포 후 소유권 확인
6. 좌측 메뉴 "Sitemaps" → `https://staysteady.netlify.app/sitemap-index.xml` 제출
7. "URL 검사"에서 홈(`/`), 프로필(`/profile`), 주요 포스트 수동 색인 요청

### 2. Naver Search Advisor

1. https://searchadvisor.naver.com 접속
2. 사이트 추가 → `https://staysteady.netlify.app`
3. "HTML 태그" 인증 → `content` 값 복사
4. `gatsby-config.js` → `siteMetadata.verification.naver`에 붙여넣기
5. 배포 후 소유권 확인
6. "요청" → 사이트맵 제출: `https://staysteady.netlify.app/sitemap-index.xml`
7. RSS 제출: `https://staysteady.netlify.app/rss.xml`

### 3. Bing Webmaster Tools (선택)

- https://www.bing.com/webmasters → GSC에서 import 가능

### 4. 모니터링

- 등록 1~2주 후 `site:staysteady.netlify.app` Google 검색으로 인덱싱 확인
- GSC "적용 범위" 보고서에서 색인 상태 추적

---

## 새 페이지/포스트 추가 시 체크리스트

- [ ] Head export에서 `<Seo>` 사용, 고유한 title/description 전달
- [ ] description 150~160자 이내, title 50~60자 이내 권장
- [ ] 블로그 포스트는 `article` + `publishedTime` + `tags` props 전달
- [ ] 필요 시 JSON-LD children으로 구조화 데이터 추가
- [ ] 새 태그 추가 시 `src/utils/constants.ts` + `tailwind.config.js` safelist 반영
- [ ] 포스트별 og:image가 있으면 `image` prop으로 전달 (1200x630px 권장)
