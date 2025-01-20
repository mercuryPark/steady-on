import React, { useEffect, useState } from "react"
import _ from "lodash"
import { Link } from "gatsby"
import { motion } from "framer-motion"
import { TAGS } from "../../../utils/constants"

const Tags = ({ tags, path }: any) => {
  const [tagCount, setTagCount] = useState(0)

  useEffect(() => {
    setTagCount(() => {
      if (path[2] === undefined) {
        return _.sumBy(tags, "count")
      } else {
        return _.find(tags, { name: path[2] })?.count
      }
    })
  }, [path])

  if (path.length > 1 && path[1] !== "posts") {
    return (
      <motion.div
        initial={{ y: "-20%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "tween", duration: 1.2 }}
        className="flex flex-col gap-2 items-center pl-5"
      >
        <div className="flex gap-2 w-full">
          <h1
            id="title"
            className={[
              "text-left text-4xl",
              _.find(TAGS, { type: path[2] })?.color,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {path[2] ?? "All Posts"}
          </h1>
          <p className="relative bottom-2 text-gray-400 italic">({tagCount})</p>
        </div>
        <ul className="flex flex-wrap gap-4 w-full  mt-1 pt-2">
          {tags.map((tag: any) => {
            return (
              <li key={`key-${tag.name}`} className="text-sm m-0">
                <Link to={`/tag/${tag.name}`}>
                  <h1 className="flex items-center gap-1 text-gray-500">
                    {tag.name}
                    <p>({tag.count})</p>
                  </h1>
                </Link>
              </li>
            )
          })}
        </ul>
      </motion.div>
    )
  }
}

export default Tags
