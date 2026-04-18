import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogList = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : `/${currentPage - 1}`
  const nextPage = `/${currentPage + 1}`

  return (
    <Layout>
      <h1>블로그 포스트</h1>
      {posts.map(({ node }) => (
        <article key={node.id}>
          <h2>
            <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
          </h2>
          <p>{node.frontmatter.date}</p>
          <p>{node.excerpt}</p>
        </article>
      ))}

      <nav>
        {!isFirst && (
          <Link to={prevPage} rel="prev">
            ← 이전 페이지
          </Link>
        )}
        {Array.from({ length: numPages }, (_, i) => (
          <Link
            key={`pagination-number${i + 1}`}
            to={i === 0 ? "/" : `/${i + 1}`}
          >
            {i + 1}
          </Link>
        ))}
        {!isLast && (
          <Link to={nextPage} rel="next">
            다음 페이지 →
          </Link>
        )}
      </nav>
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
          }
          excerpt
        }
      }
    }
  }
`
