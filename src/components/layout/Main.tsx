import React, { useEffect, useState } from "react"
import _ from "lodash"
import Tags from "../posts/tags/Layout"
import ShowCase from "../showcase/Layout"
import PostListLayout from "../posts/list/Layout"

const Main = ({ children, posts, tags }: any) => {
  const [path, setPath] = useState<string[]>([])
  const [blogPosts, setBlogPosts] = useState(posts)

  useEffect(() => {
    let pathname: string[] | string = window.location.pathname
    pathname = _.split(pathname, "/")
    setPath(pathname)

    if (pathname.length > 1 && pathname[1] === "tag") {
      setBlogPosts((posts: any) => {
        return _.filter(posts, (post: any) => {
          const tags: string[] = post.node.frontmatter.tags
          return _.includes(tags, pathname[2])
        })
      })
    }
  }, [window.location])

  return (
    <div className="mt-36 flex justify-center">
      <div className="relative flex flex-col gap-12 justify-center text-center">
        <Tags path={path} tags={tags} />
        <ShowCase path={path} posts={blogPosts} />
        <PostListLayout posts={blogPosts} />

        <div className="w-full mx-auto">{children}</div>
      </div>
    </div>
  )
}

export default Main
