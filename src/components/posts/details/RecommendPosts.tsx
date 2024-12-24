import React from "react"
import PostCard from "../list/Card"
import _ from "lodash"
import ListContent from "../list/ListContent"

const RecommendPosts = ({ posts }: any) => {
  console.log(posts)
  return (
    <div>
      {/* {_.map(posts, (post: any) => {
        return <ListContent post={post} />
      })} */}
    </div>
  )
}

export default RecommendPosts
