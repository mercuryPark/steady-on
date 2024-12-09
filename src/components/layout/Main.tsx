import React from "react"
import Category from "../posts/category/Layout"
import ShowCase from "../showcase/Layout"

const Main = ({ children, posts }: any) => {
  return (
    <div className="mt-36 flex justify-center">
      <div className="relative flex flex-col gap-4 ">
        <Category />
        <ShowCase />
        {/* <PostList posts={posts} /> */}
        <div className="w-4/5 mx-auto">{children}</div>
      </div>
    </div>
  )
}

export default Main
