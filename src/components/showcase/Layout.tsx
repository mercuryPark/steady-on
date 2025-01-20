import React from "react"

import SignBoard from "./Signboard"
import Shorts from "./Shorts"

import _ from "lodash"
import { motion } from "framer-motion"

const ShowCaseLayout = ({
  path,
  posts,
}: {
  path: string[]
  posts: any[]
}): any => {
  if (path.length === 2) {
    return (
      <div className="w-full h-[500px]">
        <motion.div
          initial={{ x: "-5%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "tween", duration: 1.2 }}
          className="flex gap-5 w-full h-full"
        >
          <SignBoard posts={posts} />
          <Shorts posts={posts} />
        </motion.div>
      </div>
    )
  }
}

export default ShowCaseLayout
