import React, { FC, useState } from "react"
import _ from "lodash"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { TAGS } from "../../../utils/constants"
import moment from "moment"
import "moment/locale/ko"
import { motion } from "framer-motion"

const PostCard = ({ post, className, imageClassName }: any) => {
  const image: any = getImage(post.node.frontmatter.thumbnail_image)

  return (
    <div className={`${className} rounded-lg text-start z-50 min-w-[200px]`}>
      <Link to={`/posts${post?.node?.fields?.slug}`} itemProp="url">
        {/* thumbnail image */}
        <div
          className={`w-full ${imageClassName} mb-2 rounded-lg shadow-lg ring-1 ring-gray-200 relative `}
        >
          {image && (
            <GatsbyImage
              image={image}
              className="object-contain w-full  h-full rounded-lg hover:bg-black"
              alt="image"
            />
          )}

          <motion.div
            whileHover={{ opacity: 1, transition: { delay: 0 } }}
            initial={{ opacity: 0 }}
            className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] text-white flex items-end rounded-lg"
          >
            <p className="px-4 py-3 font-semibold">
              {post?.node.frontmatter?.subtitle ??
                moment(post?.node.frontmatter?.date).format("ll")}
            </p>
          </motion.div>
        </div>

        <div className="py-2">
          <h1 className="font-bold text-lg">{post?.node.frontmatter?.title}</h1>

          <p className="text-xs text-gray-400">
            {moment(post?.node.frontmatter?.date).format("ll")}
          </p>
        </div>

        <ul className="flex gap-2 flex-wrap">
          {_.map(post.node.frontmatter.tags, (tag: string, index: number) => {
            const className = _.find(TAGS, { type: tag })?.styleClassName
            return (
              <li className="card-tag !m-0" key={`post-key-${tag}`}>
                <span
                  className={[
                    className
                      ? className
                      : "bg-gray-50 text-gray-600 ring-gray-500/10",
                    `inline-flex items-center rounded-md  text-xs px-2 py-1 font-medium  ring-1 ring-inset `,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {tag}
                </span>
              </li>
            )
          })}
        </ul>
      </Link>
      {/* <span>{post?.node.excerpt}</span> */}
    </div>
  )
}

export default PostCard
