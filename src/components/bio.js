/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio  rounded-lg p-3">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-image.jpeg"
        width={100}
        height={100}
        quality={95}
        alt="Profile picture"
      />
      {author?.name && (
        <p className="flex flex-col">
          <strong className="h-7">{author.name}</strong>
          <span className="text-sm text-green-600">Frontend Developer</span>
          <span className="text-xs text-gray-500">
            {author?.summary || null}
          </span>
        </p>
      )}
    </div>
  )
}

export default Bio
