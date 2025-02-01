import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import PostListLayout from "../components/posts/list/Layout"

const BlogHome = ({ data, pageContext }) => {
  const { tags } = pageContext
  const posts = data.allMarkdownRemark.edges

  return <Layout posts={posts} tags={tags} />
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
