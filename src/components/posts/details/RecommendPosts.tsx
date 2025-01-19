import React, { useEffect, useState } from "react"
import PostCard from "../list/Card"
import _ from "lodash"
import ListContent from "../list/ListContent"

const RecommendPosts = ({ posts }: any) => {
  return (
    <div className="mt-40 ">
      <h1 className="text-left font-bold mb-10 text-xl">연관된 게시물</h1>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-10">
        {_.map(posts, (post: any, i: number) => {
          if (i < 4) {
            return <ListContent post={post} className="p-0" />
          }
        })}
      </div>
    </div>
  )
}

export default RecommendPosts
