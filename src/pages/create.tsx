import React from "react"
import { CreateNftForm } from "../components/CreateNft"
import Layout from "../components/Layout"
import SEO from "../components/seo"

const Create = () => {
  return (
    <Layout authenticated={false}>
      <SEO title="updateform" />
      <CreateNftForm />
    </Layout>
  )
}

export default Create
