import React from "react"

import SignBoard from "./Signboard"
import Shorts from "./Shorts"

const ShowCaseLayout = ({
  path,
  posts,
}: {
  path: string[]
  posts: any[]
}): any => {
  if (path.length === 2) {
    return (
      <div className="h-[500px]">
        <div className="flex gap-5 h-full">
          <SignBoard posts={posts} />
          <Shorts posts={posts} />
        </div>
      </div>
    )
  }
}

export default ShowCaseLayout
