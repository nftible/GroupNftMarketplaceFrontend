import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import ProfilePage from "../components/pages/Profile"

const Profile = () => {
  return (
    <Layout authenticated={true}>
      <SEO title="updateform"/>
      <ProfilePage />
    </Layout>
  )
}

export default Profile
