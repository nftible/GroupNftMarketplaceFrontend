// import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"

import Layout from "../components/Layout"
import { NftHistory } from "../components/NftHistory"
import { PlaceBid } from "../components/placeBid"
import { ProfileCard } from "../components/profileCard/profileCard"
import Seo from "../components/seo"

const nftDetails = () => (
  <Layout authenticated={false}>
    <Seo title="nftDetails" />
    <div>
      <div className="flex bg-gray-100 justify-center max-h-full md:h-screen-70 h-full ">
        <div className="max-h-full flex  min-h-screen-70 ">
          <img
            className="max-h-screen-60 self-center object-contain"
            src="https://f8n-ipfs-production.imgix.net/QmVo9y2wWfp9nt4nLaJ5bbzogyPJfZhvCGytCv2Gu5ihnC/nft.png?q=80&auto=format%2Ccompress&cs=srgb&max-w=1680&max-h=1680"
            loading="lazy"
            alt=""
          />
        </div>
      </div>
      <div className="flex xl:space-x-24 max-w-screen-2xl justify-center px-3 min-w-full flex-wrap mt-10 ">
        <div className="max-w-screen-md">
          <div className="max-w-2xl  space-y-2.5 flex-col mb-5">
            <h1 className="font-sans font-semibold text-xl ">Creator</h1>
            <div className="relative -left-2.5 bottom-1.5 p-1">
              <ProfileCard />
            </div>
            {/* <div className="space-y-2"> */}
            <h1 className="font-sans font-bold md:text-3xl text-xl">
              WORLDING | WHO WORLDS?
            </h1>
            <h1 className="font-sans font-semibold text-xl capitalize ">
              description
            </h1>
            <p>
              In 2014, a 20-year-old Vitalik Buterin presented a talk at Swiss Institute in New York entitled "Decentralized Autonomous Society." In the years since, he has been hailed as a prophet of the cryptocurrency movement. This arresting portrait by artist Richard Phillips depicts Buterin, co-founder of the decentralized, open-source blockchain, Ethereum, in the style of a Walker Evans photo, framed in close-up against a black background. In years past, Phillips has made uncanny celebrity portraits ranging from Lindsay Lohan to Rihanna. Here, however, he turns his attention to a figure with a different type of fandom. Gazing at the viewer with preternatural wisdom and a tinge of world-weariness, Buterin projects the saintly aura that gives the work its title.
            </p>
            <h1 className="font-sans font-semibold text-xl capitalize ">
              editions
            </h1>
            <h1 className="font-sans font-semibold text-xl capitalize ">1</h1>
            {/* </div> */}
          </div>
        </div>

        <div className="px-2 w-100 space-y-5">
          <PlaceBid />
          <NftHistory />
        </div>
      </div>
    </div>
  </Layout>
)

export default nftDetails
