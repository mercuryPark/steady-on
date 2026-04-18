import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ProfileLayout from "../components/profile/Layout"

const Profile = ({ location }) => {
  return (
    <Layout location={location}>
      <ProfileLayout />
    </Layout>
  )
}

export const Head = ({ location }) => {
  const siteUrl = "https://staysteady.netlify.app"
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${siteUrl}${location?.pathname || "/profile"}`,
    mainEntity: {
      "@type": "Person",
      name: "박호연",
      jobTitle: "Frontend Developer",
      url: siteUrl,
      sameAs: ["https://github.com/mercuryPark"],
      image: `${siteUrl}/images/profile-hoyeon.jpeg`,
    },
  }
  return (
    <Seo
      title="포트폴리오"
      description="프론트엔드 개발자 박호연의 이력, 경력, 프로젝트를 한눈에 볼 수 있는 포트폴리오 페이지."
      pathname={location?.pathname}
    >
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Seo>
  )
}

export default Profile
