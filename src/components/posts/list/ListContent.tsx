import React, { FC } from "react"
import PostCard from "./Card"
const ListContent = ({ post, className = "p-4" }: any) => {
  return <PostCard post={post} className={className} imageClassName="h-60" />
}

export default ListContent
