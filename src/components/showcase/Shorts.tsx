import React from "react"
import _ from "lodash"
import { Link } from "gatsby"
import moment from "moment"

const Shorts = ({ posts }: any) => {
  return (
    <div className="basis-1/3 text-start px-8 max-md:hidden">
      <h2 className="title-font text-lg pb-2">
        Shorts
      </h2>
      {_.map(posts, (post: any) => {
        if (post?.node.frontmatter?.shorts) {
          return (
            <Link
              key={`shorts-${post?.node?.fields?.slug}`}
              to={`/posts${post?.node?.fields?.slug}`}
              itemProp="url"
            >
              <div className="py-2">
                <h3 className="text-lg font-bold">
                  {post?.node.frontmatter?.title}
                </h3>
                <p className="text-xs text-gray-400">
                  {moment(post?.node.frontmatter?.date).format("ll")}
                </p>
              </div>
            </Link>
          )
        }
      })}
    </div>
  )
}

export default Shorts
