import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import PostListLayout from "../components/posts/list/Layout"

const BlogHome = ({ data, pageContext }) => {
  const { tags } = pageContext
  const posts = data.allMarkdownRemark.edges

  return (
    <div className="max-w-[56rem] mx-auto max-lg:mx-4">
      <Layout posts={posts} tags={tags} />
    </div>
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
