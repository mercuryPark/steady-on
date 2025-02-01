import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Tags from "../components/posts/tags/Layout"
import PostListLayout from "../components/posts/list/Layout"

const BlogTags = ({ pageContext, data }) => {
  const { tags } = pageContext
  const posts = data.allMarkdownRemark.edges

  return <Layout posts={posts} tags={tags} />
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
