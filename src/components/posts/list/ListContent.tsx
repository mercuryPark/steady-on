import React, { FC } from "react"
import { Link } from "gatsby"

const ListContent = ({ post }: any) => {
  console.log(post)
  return (
    <div className="ring-1 rounded-lg p-4">
      {/* thumbnail image */}
      <div className="w-full h-48 ring-1 rounded-lg">image</div>

      <Link to={post?.node?.fields?.slug} itemProp="url">
        <h1 className="font-bold text-lg">{post?.node.frontmatter?.title}</h1>
      </Link>

      <p className="text-xs">{post?.node.frontmatter?.date}</p>
      <span>{post?.node.excerpt}</span>
    </div>
  )
}

export default ListContent
