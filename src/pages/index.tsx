import * as React from "react"
import Layout from "../components/Layout"
import { Section } from "../components/section/section"

const IndexPage = () => (
  <Layout authenticated={false}>
    <Section/>
  </Layout>
)
export default IndexPage
