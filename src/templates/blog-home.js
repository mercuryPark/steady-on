import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import PostListLayout from "../components/posts/list/Layout"

const BlogHome = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges

  console.log(posts)

  return (
    <Layout>
      <PostListLayout posts={posts} />
    </Layout>
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
            date(formatString: "MMMM DD, YYYY")
          }
          excerpt
        }
      }
    }
  }
`