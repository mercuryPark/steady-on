import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const ProfileHeader = () => {
  return (
    <div className="flex items-start justify-between gap-12 w-full  border-b pb-12 border-slate-200">
      <div className="ring-1 ring-slate-200 flex rounded-lg shadow-sm">
        <img
          src="/images/profile-hoyeon.jpeg"
          className="size-48 object-cover rounded-lg"
          alt="Profile"
        />
      </div>

      {/* Contact Information */}
      <div className="text-start p-5 rounded-lg w-[calc(100%-14rem)] bg-slate-50/70 h-48 shadow-sm">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="group">
            <div className="flex items-center gap-2 mb-1">
              <span
                role="img"
                aria-label="email"
                className="text-lg opacity-80"
              >
                ✉️
              </span>
              <span className="text-slate-700 text-[15px] font-semibold tracking-wide">
                Email
              </span>
            </div>
            <a
              href="mailto:qkrghdus1113@naver.com"
              className="block pl-8 text-slate-600 hover:text-slate-900 transition-colors text-[13px] font-normal decoration-slate-300"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "2px",
              }}
            >
              qkrghdus1113@naver.com
            </a>
          </div>

          <div className="group">
            <div className="flex items-center gap-2 mb-1">
              <span
                role="img"
                aria-label="phone"
                className="text-lg opacity-80"
              >
                📱
              </span>
              <span className="text-slate-700 text-[15px] font-semibold tracking-wide">
                Phone
              </span>
            </div>
            <a
              href="tel:010-3537-6008"
              className="block pl-8 text-slate-600 hover:text-slate-900 transition-colors text-[13px] font-normal decoration-slate-300"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "2px",
              }}
            >
              010-3537-6008
            </a>
          </div>

          <div className="group">
            <div className="flex items-center gap-2 mb-1">
              <span
                role="img"
                aria-label="github"
                className="text-lg opacity-80"
              >
                💻
              </span>
              <span className="text-slate-700 text-[15px] font-semibold tracking-wide">
                Github
              </span>
            </div>
            <a
              href="https://github.com/mercuryPark"
              className="block pl-8 text-slate-600 hover:text-slate-900 transition-colors text-[13px] font-normal"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/mercuryPark
            </a>
          </div>

          <div className="group">
            <div className="flex items-center gap-2 mb-1">
              <span role="img" aria-label="blog" className="text-lg opacity-80">
                📝
              </span>
              <span className="text-slate-700 text-[15px] font-semibold tracking-wide">
                Blog
              </span>
            </div>
            <a
              href="https://staysteady.netlify.app/"
              className="block pl-8 text-slate-600 hover:text-slate-900 transition-colors text-[13px] font-normal"
              target="_blank"
              rel="noopener noreferrer"
            >
              박호연의 기술블로그
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
