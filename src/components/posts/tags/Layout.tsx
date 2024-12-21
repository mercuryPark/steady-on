import React, { useEffect, useState } from "react"
import _ from "lodash"
import { Link } from "gatsby"

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
      <div className="flex flex-col gap-2 items-center ">
        <div className="flex gap-2">
          <h1 id="title" className="text-center font-bold text-4xl">
            {path[2] ?? "All Posts"}
          </h1>
          <p className="relative bottom-2 text-gray-400 italic">({tagCount})</p>
        </div>
        <ul className="flex gap-4">
          {tags.map((tag: any) => {
            return (
              <li key={`key-${tag.name}`}>
                <Link to={`/tag/${tag.name}`}>
                  <h1 className="flex items-center gap-1 ">
                    {tag.name}
                    <p>({tag.count})</p>
                  </h1>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Tags
