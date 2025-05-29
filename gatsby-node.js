/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
// Define the template for blog post
const blogPost = path.resolve(`./src/templates/blog-post.js`)
const blogList = path.resolve(`./src/templates/blog-list.js`)
const blogHome = path.resolve(`./src/templates/blog-home.js`)
const blogTags = path.resolve(`./src/templates/blog-tags.js`)
const profile = path.resolve(`./src/templates/profile.js`)
/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            tags
            signboard
            shorts
            thumbnail_image {
              childImageSharp {
                gatsbyImageData(width: 300, placeholder: BLURRED)
              }
            }
          }
          tableOfContents
        }
      }
    }
  `)

  const tagResult = await graphql(`
    {
      allMarkdownRemark {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes
  const tags = tagResult.data.allMarkdownRemark.group

  // 페이지네이션 설정
  const postsPerPage = 1 // 페이지당 포스트 수
  const numPages = Math.ceil(posts.length / postsPerPage)

  // Home Page
  createPage({
    path: "/",
    component: blogHome,
    context: {
      tags: tags.map(tag => ({
        name: tag.fieldValue,
        count: tag.totalCount,
      })),
    },
  })

  // ProfilePage
  createPage({
    path: "/profile",
    component: profile,
  })

  // Tags Page
  createPage({
    path: `/tags`,
    component: blogTags,
    context: {
      tags: tags.map(tag => ({
        name: tag.fieldValue,
        count: tag.totalCount,
      })),
    },
  })

  // Individual Tag Pages
  tags.forEach(tag => {
    createPage({
      path: `/tag/${tag.fieldValue}/`,
      component: blogTags,
      context: {
        tags: tags.map(tag => ({
          name: tag.fieldValue,
          count: tag.totalCount,
        })),
      },
    })
  })

  // Route Page
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: `/${i + 1}`,
      component: blogList,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // Detail Page
  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: `/posts${post.fields.slug}`,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
          tags: post.frontmatter.tags,
          allPosts: posts,
        },
      })
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      tags: [String]
      signboard : Boolean
      shorts: Boolean
    }

    type Fields {
      slug: String
    }
  `)
}
