import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostListLayout from "../components/posts/list/Layout"

const BlogHome = ({ data, pageContext }) => {
  const { tags } = pageContext
  const posts = data.allMarkdownRemark.edges

  return <Layout posts={posts} tags={tags} />
}

export const Head = ({ location }) => {
  const siteUrl = "https://staysteady.netlify.app"
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Steady On",
        description:
          "프론트엔드 개발자 박호연의 기술 블로그 & 포트폴리오. 꾸준함을 무기로 매일 한 걸음씩 성장하는 개발 이야기.",
        inLanguage: "ko-KR",
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "박호연",
        url: siteUrl,
        jobTitle: "Frontend Developer",
        sameAs: ["https://github.com/mercuryPark"],
      },
    ],
  }
  return (
    <Seo
      description="프론트엔드 개발자 박호연의 기술 블로그 & 포트폴리오. 꾸준함을 무기로 매일 한 걸음씩 성장하는 개발 이야기."
      pathname={location?.pathname}
    >
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Seo>
  )
}

export default BlogHome

export const blogHomeQuery = graphql`
  query blogHomeQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            subtitle
            date(formatString: "MMMM DD, YYYY")
            tags
            shorts
            signboard
            thumbnail_image {
              childImageSharp {
                gatsbyImageData(width: 300, placeholder: BLURRED)
              }
            }
          }
          excerpt
        }
      }
    }
  }
`
