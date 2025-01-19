import React, { useEffect } from "react"

const Comments = () => {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://utteranc.es/client.js"
    script.async = true
    script.setAttribute("repo", "mercuryPark/blog-comments")
    script.setAttribute("issue-term", "pathname")
    script.setAttribute("theme", "github-light") // 원하는 테마로 변경 가능
    script.setAttribute("crossorigin", "anonymous")
    const commentsDiv: any = document.getElementById("comments")
    commentsDiv.appendChild(script)
  }, [])

  return <div className="my-20 w-full" id="comments" />
}

export default Comments
