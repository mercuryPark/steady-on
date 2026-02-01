import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import ProfileLayout from "../components/profile/Layout"

const Profile = ({ location }) => {
  return (
    <Layout location={location}>
      <ProfileLayout />
    </Layout>
  )
}

export default Profile
