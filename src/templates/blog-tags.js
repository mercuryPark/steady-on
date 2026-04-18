import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Tags from "../components/posts/tags/Layout"
import PostListLayout from "../components/posts/list/Layout"

const BlogTags = ({ pageContext, data }) => {
  const { tags } = pageContext
  const posts = data.allMarkdownRemark.edges

  return <Layout posts={posts} tags={tags} />
}

export const Head = ({ location }) => {
  const match = location?.pathname?.match(/\/tag\/([^/]+)/)
  const tagName = match ? decodeURIComponent(match[1]) : null
  return (
    <Seo
      title={tagName ? `#${tagName}` : "태그"}
      description={
        tagName
          ? `#${tagName} 태그가 달린 포스트 목록입니다.`
          : "모든 태그를 한눈에 살펴보세요."
      }
      pathname={location?.pathname}
    />
  )
}

export default BlogTags

export const blogTagsQuery = graphql`
  query blogTagsQuery {
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
