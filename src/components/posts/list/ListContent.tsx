import React, { FC } from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import PostCard from "./Card"
const ListContent = ({ post }: any) => {
  return <PostCard post={post} imageClassName="h-60" />
}

export default ListContent
