import React, { useRef, useEffect } from "react"
import { Link } from "gatsby"

const Header = () => {
  const elementRef = useRef<any>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current && typeof window !== "undefined") {
        if (window.scrollY > 10) {
          elementRef.current.classList.add("shadow-sm")
        } else {
          elementRef.current.classList.remove("shadow-sm")
        }
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)

      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  return (
    <div
      id="header"
      ref={elementRef}
      className="bg-white z-[9999999999] fixed w-full left-0 top-0 px-6 py-4 transition-all duration-100"
    >
      <div className="flex items-center justify-between max-w-[72rem] mx-auto">
        <Link
          to={"/"}
          itemProp="url"
          className="flex items-center gap-2"
          aria-label="Steady On 홈"
        >
          <img
            src="/images/letter-h.png"
            className="size-8"
            alt="Steady On 로고"
          />
          <span className="title-font text-lg">Steady On</span>
        </Link>

        <nav aria-label="주요" className="flex items-center gap-6 text-sm">
          <Link
            to={"/"}
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Blog
          </Link>
          <Link
            to={"/tags"}
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Tags
          </Link>
          <Link
            to={"/profile"}
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default Header
