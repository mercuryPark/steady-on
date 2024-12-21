import React from "react"
import _ from "lodash"
import { Link } from "gatsby"

const Shorts = ({ posts }: any) => {
  return (
    <div className="basis-1/3 text-start px-8">
      <h1 id="title" className="text-lg font-bold pb-2">
        Shorts
      </h1>
      {_.map(posts, (post: any) => {
        if (post?.node.frontmatter?.shorts) {
          return (
            <Link to={`/posts${post?.node?.fields?.slug}`} itemProp="url">
              <div className="py-2">
                <h1 className="text-lg font-bold">
                  {post?.node.frontmatter?.title}
                </h1>
                <p className="text-xs text-gray-400">
                  {post?.node.frontmatter?.date}
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
