import React from "react"
import ShowCase from "../showcase/Layout"
import Category from "../posts/category/Layout"

const Main = ({ children }) => {
  return (
    <div className="mt-36">
      <div className="relative flex flex-col gap-4 ">
        <Category />
        <ShowCase />
      </div>
      {children}
    </div>
  )
}

export default Main
