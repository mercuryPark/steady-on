import React, { useEffect, useState } from "react"
import PostCard from "../list/Card"
import _ from "lodash"
import ListContent from "../list/ListContent"

const RecommendPosts = ({ posts }: any) => {
  return (
    <div className="mt-40">
      <h1 className="text-left mb-10 text-xl">연관된 게시물</h1>
      <div className="grid grid-cols-2 gap-4">
        {_.map(posts, (post: any) => {
          return <ListContent post={post} />
        })}
      </div>
    </div>
  )
}

export default RecommendPosts
