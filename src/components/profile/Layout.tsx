import React, { useState, useEffect } from "react"
import ProfileContents from "./Contents"
import ProfileHeader from "./Header"
import Cureer from "./Cureer"
import Highlight from "./Highlight"

const ProfileLayout = ({ profileData }: any) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  return (
    <div>
      <h1 className="text-start pb-12 text-2xl font-bold">
        <span className="text-[35px] mr-2">🍀</span>
        <p className="pb-2 inline">
          안녕하세요 3년차 프론트엔드 개발자 박호연입니다.
        </p>
      </h1>

      <ProfileHeader />
      <ProfileContents />
      <Highlight />
      <Cureer />

      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
          aria-label="맨 위로 이동"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  )
}

export default ProfileLayout
