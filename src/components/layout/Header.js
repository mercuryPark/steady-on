import React, { useRef, useEffect } from "react"

const Header = () => {
  const elementRef = useRef(null)
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
      className="bg-white z-50 font-bold fixed w-full left-0 top-0 p-6 transition-all duration-100"
    >
      <div className="flex justify-between">
        <h1>Steady On</h1>
        <div className="flex gap-4 text-sm">
          <span>About</span>
          <button>Dark Mode</button>
        </div>
      </div>
    </div>
  )
}

export default Header
