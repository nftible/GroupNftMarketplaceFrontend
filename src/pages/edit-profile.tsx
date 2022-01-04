import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import { UpdateProfileForm } from "../components/pages/updateProfileForm"

const updateProfile = () => {
  return (
    <Layout authenticated={true}>
      <SEO title="updateform"/>
      <div className="mx-auto max-w-5xl">
      <UpdateProfileForm/>
      </div>
    </Layout>
  )
}

export default updateProfile
