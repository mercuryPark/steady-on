import React, { useRef, useEffect, useState } from "react"
import { Link } from "gatsby"
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import { useColorMode } from "@chakra-ui/react"

const Header = () => {
  const elementRef = useRef<any>(null)
  const [darkMode, setDarkMode] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()

  const handleClickDarkMode = () => {
    // setDarkMode(prev => {
    //   localStorage.setItem("darkMode", JSON.stringify(!prev))
    //   return !prev
    // })
    toggleColorMode()
  }

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current && typeof window !== "undefined") {
        if (window.scrollY > 10) {
          // 100px 스크롤 시
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
      className="bg-white z-[9999999999] font-bold fixed w-full left-0 top-0 px-6 py-4 transition-all duration-100"
    >
      <div className=" flex items-center justify-between">
        <Link to={"/"} itemProp="url">
          {/* <h1 className="">Steady On</h1> */}
          <img src="/images/letter-h.png" className="size-8" alt="Letter H" />
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <span>About</span>
          <button
            onClick={handleClickDarkMode}
            className="shadow-md ring-1 ring-gray-300 rounded-full p-2 transition-all delay-200 relative"
          >
            {darkMode ? (
              <SunIcon className="size-4" />
            ) : (
              <MoonIcon className="size-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
