import React, { useRef, useEffect } from "react"
import { Link } from "gatsby"
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"

const Header = () => {
  const elementRef = useRef<any>(null)
  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        if (window.scrollY > 10) {
          // 100px 스크롤 시
          elementRef.current.classList.add("shadow-sm")
        } else {
          elementRef.current.classList.remove("shadow-sm")
        }
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      ref={elementRef}
      className="bg-white z-[99999] font-bold fixed w-full left-0 top-0 px-6 py-4 transition-all duration-100"
    >
      <div className="flex items-center justify-between">
        <Link to={"/"} itemProp="url">
          <h1>Steady On</h1>
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <span>About</span>
          <button className="shadow-md ring-1 ring-gray-300 rounded-full p-2">
            <MoonIcon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
