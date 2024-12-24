import React, { useEffect, useState } from "react"

const ListTocLayout = ({ items }: any): any => {
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    // const headings = document.querySelectorAll(".toc a")
    // console.log(headings)
    // headings[0].classList.add("active")

    const handleScroll = () => {
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6")

      let currentHeading = ""
      headings.forEach(heading => {
        const { top } = heading.getBoundingClientRect()
        if (top <= 120) {
          currentHeading = heading.id
        }
      })

      setActiveId(currentHeading)

      // TOC 링크에 active 클래스 추가
      const links = document.querySelectorAll(".toc a")
      links.forEach((link: any) => {
        const hrefId = decodeURIComponent(link.getAttribute("href").slice(1))
        if (hrefId === currentHeading) {
          link.classList.add("active")
        } else {
          link.classList.remove("active")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="w-1/3 max-xl:hidden">
      <div className="sticky pl-[20px] flex-1 top-[120px] ">
        <nav
          className="toc sticky"
          dangerouslySetInnerHTML={{ __html: items }}
        />
      </div>
    </div>
  )
}

export default ListTocLayout
