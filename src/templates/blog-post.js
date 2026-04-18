import * as React from "react"
import { Link, graphql } from "gatsby"

import moment from "moment"
import "moment/locale/ko"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ListTocLayout from "../components/posts/list/toc/Layout"
import RecommendPosts from "../components/posts/details/RecommendPosts"
import Comments from "../components/posts/details/Comments"

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post, allMarkdownRemark },
  pageContext,
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  const { tags: currentTags, allPosts } = pageContext
  const relatedPosts = allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <div className="flex flex-col ">
        <div className="flex gap-12 h-full ">
          <article
            className="flex-1 min-w-0"
            itemScope
            itemType="http://schema.org/Article"
          >
            <section
              className="blog-post"
              dangerouslySetInnerHTML={{ __html: post.html }}
              itemProp="articleBody"
            />
            <hr />
            <RecommendPosts posts={relatedPosts} />
            <footer>
              <Bio />
              <Comments />
            </footer>
          </article>
          <ListTocLayout items={post.tableOfContents} />
        </div>
      </div>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post }, location }) => {
  const siteUrl = "https://staysteady.netlify.app"
  const url = `${siteUrl}${location.pathname}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.frontmatter.title,
    description: post.frontmatter.description || post.excerpt,
    datePublished: post.frontmatter.rawDate,
    dateModified: post.frontmatter.rawDate,
    author: {
      "@type": "Person",
      name: "박호연",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "박호연",
      url: siteUrl,
    },
    inLanguage: "ko-KR",
    keywords: Array.isArray(post.frontmatter.tags)
      ? post.frontmatter.tags.join(", ")
      : undefined,
  }
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
      pathname={location.pathname}
      article
      publishedTime={post.frontmatter.rawDate}
      tags={post.frontmatter.tags}
    >
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Seo>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }

    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents
      frontmatter {
        title
        subtitle
        date(formatString: "MMMM DD, YYYY")
        rawDate: date
        description
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }

    # 전체 포스트 목록
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
