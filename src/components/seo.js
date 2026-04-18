/**
 * SEO component (Gatsby 5 Head API)
 *
 * canonical, open graph, twitter card, robots directives 를 포함한다.
 * 사용처에서 `pathname`, `image`, `article`, `publishedTime`, `tags` 등을 넘겨 페이지별 메타데이터를 구성한다.
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({
  title,
  description,
  pathname,
  image,
  article,
  publishedTime,
  tags,
  children,
}) => {
  const { site } = useStaticQuery(graphql`
    query SeoMetadata {
      site {
        siteMetadata {
          title
          titleTemplate
          description
          siteUrl
          image
          locale
          author {
            name
          }
          social {
            twitter
            github
          }
          verification {
            google
            naver
          }
        }
      }
    }
  `)

  const meta = site.siteMetadata
  const resolvedTitle = title
    ? meta.titleTemplate
      ? meta.titleTemplate.replace("%s", title)
      : `${title} | ${meta.title}`
    : meta.title
  const resolvedDescription = description || meta.description
  const resolvedPath = pathname || ""
  const resolvedUrl = `${meta.siteUrl}${resolvedPath}`
  const resolvedImage = `${meta.siteUrl}${image || meta.image}`
  const ogType = article ? "article" : "website"

  return (
    <>
      <html lang="ko" />
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <meta name="author" content={meta.author?.name} />
      <link rel="canonical" href={resolvedUrl} />

      {/* robots directives (기본 index, follow + 큰 이미지 프리뷰 허용) */}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={meta.title} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:url" content={resolvedUrl} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:locale" content={meta.locale || "ko_KR"} />
      {article && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {article &&
        Array.isArray(tags) &&
        tags.map(tag => (
          <meta key={`og-tag-${tag}`} property="article:tag" content={tag} />
        ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedImage} />
      {meta.social?.twitter && (
        <meta name="twitter:creator" content={`@${meta.social.twitter}`} />
      )}

      {/* 검색엔진 소유권 확인 */}
      {meta.verification?.google && (
        <meta
          name="google-site-verification"
          content={meta.verification.google}
        />
      )}
      {meta.verification?.naver && (
        <meta
          name="naver-site-verification"
          content={meta.verification.naver}
        />
      )}

      {children}
    </>
  )
}

export default Seo
