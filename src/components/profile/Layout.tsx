import React from "react"
import ProfileContents from "./Contents"
import ProfileHeader from "./Header"
import Cureer from "./Cureer"

const ProfileLayout = ({ profileData }: any) => {
  return (
    <div>
      <h1 className="text-start pb-12 text-2xl font-bold">
        <span className="text-[35px] mr-2">🍀</span>
        <p className="pb-2 inline">
          안녕하세요 3년차 프론트엔드 개발자 박호연입니다.
        </p>
      </h1>

      {/* gatsby-remark-html 플러그인 사용 */}
      {/* <div className="blog-post" dangerouslySetInnerHTML={{ __html: html }} /> */}
      <ProfileHeader />
      <ProfileContents />
      <Cureer />
    </div>
  )
}

export default ProfileLayout
