# Gatsby SEO 구축 계획서

> **Target**: Claude Opus 4.6에게 전달할 실행 계획서
> **전제**: Gatsby 기본 템플릿 상태, 사이트명 검색 시 노출되지 않음
> **원칙**: Battle-tested best practices only

---

## 목차

1. [Phase 0 — 진단 (반드시 선행)](#phase-0--진단-반드시-선행)
2. [권장 스택](#권장-스택)
3. [Phase별 실행 계획](#phase별-실행-계획)
4. [배포 후 필수 작업](#배포-후-필수-작업)
5. [Anti-patterns](#anti-patterns)
6. [검증 툴킷](#검증-툴킷)
7. [Opus 4.6 전달 시 추가 컨텍스트](#opus-46-전달-시-추가-컨텍스트)
8. [불확실한 영역](#불확실한-영역)

---

## Phase 0 — 진단 (반드시 선행)

SEO 작업 전에 **왜 검색이 안 되는지** 먼저 확정해야 합니다. 메타태그만 고쳐도 인덱싱이 막혀 있으면 무의미합니다.

### 진단 체크리스트

| 체크 항목                  | 확인 방법                        | 기대값                  |
| -------------------------- | -------------------------------- | ----------------------- |
| `robots.txt`               | `curl https://도메인/robots.txt` | `Disallow: /` 없어야 함 |
| `<meta name="robots">`     | View Source                      | `noindex` 없어야 함     |
| Google Search Console 등록 | GSC에서 속성 등록 여부           | 등록 + 소유권 확인 완료 |
| `site:도메인.com` 검색     | Google 직접 검색                 | 최소 1개 이상 노출      |
| URL 검사 도구              | GSC → URL 검사                   | "색인 생성됨" 상태      |
| `sitemap.xml` 제출 여부    | GSC → Sitemaps                   | 제출 + 성공 상태        |
| Canonical 충돌             | HTML `<link rel="canonical">`    | 자기 자신 URL 지정      |
| JS 렌더링 의존도           | GSC URL 검사 → 렌더링된 HTML     | 본문이 HTML에 존재      |

### 가장 흔한 실패 모드

> ⚠️ Gatsby 기본 템플릿 중 일부는 `gatsby-plugin-robots-txt`가 `env`에 따라 `Disallow: /`를 뿌립니다.
> **스테이징 설정이 프로덕션에 새어나간 케이스가 1순위 의심 대상입니다.**

---

## 권장 스택

### 핵심 플러그인

```text
gatsby-plugin-react-helmet       # 또는 react-helmet-async
gatsby-plugin-sitemap            # v5+ 공식
gatsby-plugin-robots-txt         # env 기반 제어
gatsby-plugin-manifest           # PWA + 모바일 SEO
gatsby-plugin-image              # LCP 최적화
gatsby-plugin-canonical-urls     # canonical 일괄 처리
```

### 버전별 분기

| Gatsby 버전 | 권장 방식                                |
| ----------- | ---------------------------------------- |
| v4.19+      | `Head` export API                        |
| v5+         | `Head` API가 기본, `react-helmet` 비권장 |
| v4 이하     | `react-helmet-async` (React 18 호환)     |

---

## Phase별 실행 계획

### Phase 1 — 인덱싱 차단 요소 제거 (Day 1)

이게 원인이면 나머지는 모두 소용없습니다.

- [ ] `robots.txt` 정상화 — 프로덕션에서 크롤 허용
- [ ] 모든 페이지 `<meta name="robots" content="index, follow">` 명시
- [ ] GSC 속성 등록 + 소유권 확인
- [ ] `sitemap.xml` 생성 및 GSC 제출
- [ ] 정식 도메인 통일 (www vs non-www, http vs https) — 301 리다이렉트

---

### Phase 2 — 핵심 메타데이터 (Day 2–3)

#### SEO 컴포넌트 (Gatsby 5 Head API 기준)

```jsx
// src/components/seo.jsx
import { useStaticQuery, graphql } from "gatsby"

export const Seo = ({ title, description, pathname, image, article }) => {
  const { site } = useStaticQuery(query)
  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname || ""}`,
  }

  return (
    <>
      <title>{titleTemplate.replace("%s", seo.title)}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <link rel="canonical" href={seo.url} />

      {/* Open Graph */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:locale" content="ko_KR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* 검색엔진 지시어 */}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
    </>
  )
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl
        defaultImage: image
        twitterUsername
      }
    }
  }
`
```

#### 메타데이터 작성 규칙

| 항목          | 권장값                   |
| ------------- | ------------------------ |
| `title`       | 50–60자, 페이지별 고유   |
| `description` | 150–160자, 페이지별 고유 |
| `og:image`    | 1200×630px, 1MB 이하     |
| `canonical`   | 절대 URL, 자기 자신 지정 |
| `og:locale`   | `ko_KR` (한국어 기준)    |

> ⚠️ **중복 금지**: 페이지마다 동일한 title/description은 구글이 가장 싫어하는 패턴입니다.

---

### Phase 3 — 구조화 데이터 (Day 4)

**JSON-LD 방식** (Google 공식 권장). Microdata는 더 이상 사용하지 마세요.

```jsx
<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "...",
    url: "...",
    logo: "...",
    sameAs: ["..."],
  })}
</script>
```

#### 페이지 타입별 스키마 매핑

| 페이지 유형 | 스키마 타입                                    |
| ----------- | ---------------------------------------------- |
| 홈          | `WebSite` + `SearchAction` (사이트링크 검색창) |
| 회사/브랜드 | `Organization`                                 |
| 블로그 글   | `Article` or `BlogPosting`                     |
| 제품        | `Product` + `Offer`                            |
| FAQ         | `FAQPage`                                      |
| 빵부스러기  | `BreadcrumbList`                               |

#### 검증 도구

- [Schema.org Validator](https://validator.schema.org/)
- [Rich Results Test](https://search.google.com/test/rich-results)

---

### Phase 4 — Sitemap & robots (Day 5)

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        output: "/sitemap.xml",
        excludes: ["/preview/**", "/admin/**", "/404"],
        query: `{
          site { siteMetadata { siteUrl } }
          allSitePage { nodes { path } }
        }`,
        resolveSiteUrl: ({ site }) => site.siteMetadata.siteUrl,
        resolvePages: ({ allSitePage: { nodes } }) => nodes,
        serialize: ({ path }) => ({
          url: path,
          changefreq: "weekly",
          priority: path === "/" ? 1.0 : 0.7,
          lastmod: new Date().toISOString(),
        }),
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://도메인.com",
        sitemap: "https://도메인.com/sitemap.xml",
        env: {
          development: { policy: [{ userAgent: "*", disallow: ["/"] }] },
          production: { policy: [{ userAgent: "*", allow: "/" }] },
        },
        resolveEnv: () => process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV,
      },
    },
  ],
}
```

> ⚠️ **실패 모드**: `GATSBY_ACTIVE_ENV`를 프로덕션 빌드에서 설정하지 않으면 `development` 정책이 배포됩니다.
> **CI/CD에 명시적으로 주입하세요.**

---

### Phase 5 — Core Web Vitals (Day 6–7)

Google은 2021년부터 CWV를 랭킹 시그널로 사용합니다. Gatsby는 기본 성능이 좋지만 이미지/폰트에서 자주 무너집니다.

#### 목표 지표

| 지표 | 목표    | 주요 대응                                              |
| ---- | ------- | ------------------------------------------------------ |
| LCP  | < 2.5s  | `gatsby-plugin-image` + `loading="eager"` (above-fold) |
| INP  | < 200ms | 하이드레이션 최적화, 불필요 JS 제거                    |
| CLS  | < 0.1   | 이미지/폰트 크기 명시, `font-display: optional`        |

#### 필수 설정

- `gatsby-plugin-image` + `StaticImage`/`GatsbyImage` (AVIF/WebP 자동)
- `preconnect` / `dns-prefetch` for 외부 도메인
- 폰트: `font-display: swap` (또는 `optional`)
- 서드파티 스크립트: `gatsby-plugin-script`로 `off-main-thread` 또는 `idle` 전략

#### 측정 파이프라인

- `web-vitals` 라이브러리 → GA4 전송
- PageSpeed Insights / Lighthouse CI를 CI에 통합

---

### Phase 6 — 국제화 / 한국 특화 (해당 시)

- [ ] **Naver Search Advisor** 등록 (네이버 점유율 고려)
- [ ] **Daum 웹마스터도구** 등록
- [ ] `hreflang` 태그 (다국어일 때)
- [ ] `og:locale` + `lang` 속성

---

## 배포 후 필수 작업

1. **GSC Sitemap 제출** → 24–72시간 내 인덱싱 시작
2. **URL 검사 도구**로 핵심 페이지 수동 색인 요청
3. **Bing Webmaster Tools** 등록 (GSC에서 import 가능)
4. **Naver / Daum** 등록 (국내 타겟일 경우)
5. **`site:도메인.com` 모니터링** — 일주일 뒤 인덱싱 개수 확인

---

## Anti-patterns

절대 피해야 할 패턴들:

- ❌ 모든 페이지 동일한 `title` / `description`
- ❌ `react-helmet`과 Gatsby `Head` API 혼용 (v5+)
- ❌ 클라이언트 라우팅에만 의존하는 콘텐츠 (`useEffect`로 본문 fetch) — Gatsby라면 SSG로 빼야 함
- ❌ `robots.txt`에 `Disallow: /` 방치 (스테이징 설정 누수)
- ❌ Canonical을 상대 경로로 지정
- ❌ Sitemap에 `noindex` 페이지 포함
- ❌ `og:image`를 CDN 미적용 원본 이미지로 지정 (느림 → SNS 스크래핑 실패)
- ❌ 구조화 데이터와 실제 페이지 내용 불일치 (스팸 페널티)

---

## 검증 툴킷

| 목적              | 도구                                                                |
| ----------------- | ------------------------------------------------------------------- |
| 인덱싱 상태       | Google Search Console, Bing Webmaster Tools                         |
| 메타 / OG 검증    | [OpenGraph.xyz](https://www.opengraph.xyz/), Twitter Card Validator |
| 구조화 데이터     | Rich Results Test, Schema Validator                                 |
| 성능 측정         | PageSpeed Insights, Lighthouse CI, WebPageTest                      |
| 렌더링 확인       | GSC URL 검사 → "렌더링된 HTML"                                      |
| 크롤링 시뮬레이션 | Screaming Frog (무료 500 URL)                                       |

---

## Opus 4.6 전달 시 추가 컨텍스트

다음 정보가 있으면 훨씬 정확한 구현안이 나옵니다:

1. **Gatsby 버전** (v4 / v5 — Head API 결정)
2. **콘텐츠 소스** (Markdown / Contentful / Strapi 등)
3. **배포 환경** (Netlify / Vercel / S3+CF — robots, 리다이렉트 방식 달라짐)
4. **타겟 검색엔진** (Google만 vs Naver 포함)
5. **다국어 여부**
6. **현재 `gatsby-config.js` 전문**
7. **`site:도메인.com` 검색 결과 스크린샷** (인덱싱 상태 확인용)

---

## 불확실한 영역

> 다음 항목은 현재 정보만으로는 확정할 수 없습니다. 전달 시 함께 명시하세요.

- 현재 사이트의 **정확한 인덱싱 차단 원인** — Phase 0 진단 없이는 추측입니다
- **Gatsby 특정 마이너 버전의 플러그인 호환성** — 설치 시점에 공식 문서 재확인 필요
- **Naver 검색 반영 속도** — Google보다 느리고 비공식적이라 보장 불가

---

## 실행 요약 (TL;DR)

```text
Day 1     → Phase 0 진단 + Phase 1 인덱싱 차단 해제
Day 2-3   → Phase 2 메타데이터 컴포넌트 설계 및 적용
Day 4     → Phase 3 JSON-LD 구조화 데이터
Day 5     → Phase 4 Sitemap + robots.txt
Day 6-7   → Phase 5 Core Web Vitals 최적화
이후       → Phase 6 국내 검색엔진 등록 + 모니터링
```

**최우선 원칙**: 인덱싱 파이프라인부터 살리기. 메타태그 튜닝은 그 다음.
