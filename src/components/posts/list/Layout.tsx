import React from "react"
import _ from "lodash"
import ListContent from "./ListContent"

const PostListLayout = ({ posts }: any) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {_.map(posts, (post: any) => {
          return <ListContent post={post} />
        })}
      </div>
    </div>
  )
}

export default PostListLayout
