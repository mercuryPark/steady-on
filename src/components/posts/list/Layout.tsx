import React from "react"
import _ from "lodash"
import ListContent from "./ListContent"
import { motion } from "framer-motion"

const PostListLayout = ({ posts }: any) => {
  return (
    <div>
      <motion.div
        initial={{ x: "-5%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "tween", duration: 1.2 }}
        className="grid grid-cols-2 max-md:grid-cols-1 gap-4"
      >
        {_.map(posts, (post: any) => {
          return <ListContent post={post} />
        })}
      </motion.div>
    </div>
  )
}

export default PostListLayout
