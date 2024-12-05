import React from "react"
import Category from "../posts/category/Layout"
import ShowCase from "../showcase/Layout"
import PostList from "../posts/list/Layout"

const Main = ({ children, posts }) => {
  return (
    <div className="mt-36">
      <div className="relative flex flex-col gap-4 ">
        <Category />
        <ShowCase />
        <PostList posts={posts} />
      </div>
      {children}
    </div>
  )
}

export default Main
