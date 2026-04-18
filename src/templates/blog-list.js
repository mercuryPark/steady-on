import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Pagination from "../components/posts/list/Pagination"

const BlogList = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges
  const { currentPage, numPages, tags } = pageContext

  return (
    <Layout posts={posts} tags={tags}>
      <Pagination currentPage={currentPage} numPages={numPages} />
    </Layout>
  )
}

export const Head = ({ location, pageContext }) => (
  <Seo
    title={`블로그 포스트 — ${pageContext.currentPage}페이지`}
    description="프론트엔드 개발자 박호연의 개발 이야기 모음."
    pathname={location?.pathname}
  />
)

export default BlogList

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
