/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Steady On`,
    titleTemplate: `%s | Steady On`,
    author: {
      name: `박호연`,
      summary: `매일 매일 꾸준한 Steady On`,
    },
    description: `프론트엔드 개발자 박호연의 기술 블로그 & 포트폴리오. 꾸준함을 무기로 매일 한 걸음씩 성장하는 개발 이야기.`,
    siteUrl: `https://staysteady.netlify.app`,
    image: `/images/profile-hoyeon.jpeg`,
    locale: `ko_KR`,
    social: {
      twitter: ``,
      github: `mercuryPark`,
    },
    // 검색엔진 등록 후 웹마스터도구에서 발급받은 토큰을 채워 넣는다.
    // 등록 URL:
    //   Google Search Console — https://search.google.com/search-console
    //   Naver Search Advisor  — https://searchadvisor.naver.com
    verification: {
      google: `rjQveyb7XmXjx4UgUsVGgfFwE0X8J2iLEQbarw3SoWE`,
      naver: ``,
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-typescript`,

    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        resetCSS: true,
        isUsingColorMode: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },

    {
      resolve: `gatsby-remark-table-of-contents`,
      options: {
        // 설정 옵션
        exclude: "Table of Contents", // TOC에서 제외할 헤딩
        tight: true,
        ordered: true,
        fromHeading: 1, // 최소 헤딩 레벨
        toHeading: 6, // 최대 헤딩 레벨
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              maintainCase: false, // 대소문자 구분 없이 id를 생성
              removeAccents: true, // 악센트나 특수문자 제거
              isIconAfterHeader: false,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`], // AVIF 제외
          avifOptions: { lossless: true },
          quality: 90,
        },
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `{
              allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }`,
            output: "/rss.xml",
            title: "Steady On RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Steady On`,
        short_name: `Steady On`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/images/letter-h.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        // output 경로는 디렉토리로 취급되어 내부에 sitemap-index.xml / sitemap-0.xml 이 생성된다.
        // 루트("/")로 두면 https://도메인/sitemap-index.xml 로 깔끔하게 노출된다.
        output: `/`,
        excludes: [`/404`, `/404.html`, `/dev-404-page`, `/offline-plugin-app-shell-fallback`],
        query: `
          {
            site { siteMetadata { siteUrl } }
            allSitePage { nodes { path } }
          }
        `,
        resolveSiteUrl: ({ site }) => site.siteMetadata.siteUrl,
        resolvePages: ({ allSitePage: { nodes } }) => nodes,
        serialize: ({ path }) => ({
          url: path,
          changefreq: `weekly`,
          priority: path === `/` ? 1.0 : 0.7,
          lastmod: new Date().toISOString(),
        }),
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://staysteady.netlify.app`,
        sitemap: `https://staysteady.netlify.app/sitemap-index.xml`,
        env: {
          development: {
            policy: [{ userAgent: `*`, disallow: [`/`] }],
          },
          production: {
            policy: [{ userAgent: `*`, allow: `/` }],
          },
        },
        resolveEnv: () =>
          process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || `development`,
      },
    },
  ],
}
