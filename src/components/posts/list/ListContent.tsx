import React from "react"

const ListContent = ({ post }): any => {
  console.log(post)
  return (
    <div className="ring-1 rounded-lg p-4">
      {/* thumbnail image */}
      <div className="w-full h-48 ring-1 rounded-lg">image</div>
      <h1 className="font-bold text-lg">{post.frontmatter.title}</h1>
      <p className="text-xs">{post.frontmatter.date}</p>
      <span>{post.excerpt}</span>
    </div>
  )
}

export default ListContent
