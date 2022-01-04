import { StaticImage } from "gatsby-plugin-image"
import React from "react"
import { ProfileCard } from "../profileCard/profileCard"
import ImagePlaceholder from "../../images/placeholder.png"
export const NftCard = ({nft}) => {
  const metadata = JSON.parse(nft?.metadata);  
  return (
    // <div className="w-80 h-96 border border-gray-200 rounded-xl flex flex-col flex-auto relative overflow-hidden">
    //     <div className="relative">
    //         <div className="box-border m-0 relative overflow-hidden">
    //             <div className="box-border m-0 w-full h-0" style={{paddingBottom: "100%"}}></div>
    //             <div className="box-border m-0 absolute inset-0 flex items-center rounded-xl" style={{backgroundColor: "#f2f2f2"}}>
    //                 <img className="object-cover w-full h-full max-w-full opacity-100 rounded-xl" src="https://f8n-ipfs-production.imgix.net/QmVRCCYDLfCTDH9P9qSyLs2A2aC1m4N6A2E3YpEZ6ZuvuU/nft.jpg?q=80&auto=format%2Ccompress&cs=srgb&h=640"/>
    //             </div>
    //         </div>
    //     </div>
    //     <div className="flex-1 flex items-start">
    //         <h1 className="font-sans font-semibold text-3xl capitalize mb-4">
    //             Metaverse
    //         </h1>
    //     </div>
    //     <div className="p-0.5 max-w-max cursor-pointer relative shadow-outer hover-trigger space-x-2 flex items-center left-2 pr-3.5  rounded-3xl max-h-11 bg-white">
    //         <div className="border-transparent w-9 h-9 rounded-3xl">
    //             <img
    //             className="rounded-full"
    //             src="https://f8n-production.imgix.net/creators/profile/ez13q5uqy-ava-jpg-0bdy8r.jpg?q=50&w=36&h=36&auto=format%2Ccompress&fit=crop&dpr=2"
    //             alt=""
    //             />
    //         </div>
    //         <p className="font-sans text-sm font-extrabold ">@Tanzeel</p>
    //         <div className="w-64 hover-target self-end absolute inset-x-0 bottom-0  px-4 shadow-sm bg-white rounded-lg p-3 space-y-5">
    //             <div className=" flex justify-between items-center">
    //             <div className="border-transparent w-11 h-11 rounded-3xl">
    //                 <img
    //                 className="rounded-full"
    //                 src="https://f8n-production.imgix.net/creators/profile/ez13q5uqy-ava-jpg-0bdy8r.jpg?q=50&w=36&h=36&auto=format%2Ccompress&fit=crop&dpr=2"
    //                 alt=""
    //                 />
    //             </div>
    //             <button className="capitalize rounded-full bg-white w-24 h-9 text-black border-gray-400 hover:text-white hover:bg-black hover:border-transparent border-2 font-bold">
    //                 follow
    //             </button>
    //             </div>
    //             <div>
    //             <h1 className="capitalize text-lg font-sans font-bold">tanzeel</h1>
    //             <p className="text-base font-extrabold font-sans text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-yellow-400">
    //                 @tanzeelabc
    //             </p>
    //             </div>
    //             <div className="flex space-x-8">
    //             <p className="font-extrabold">
    //                 19
    //                 <div className="font-bold capitalize font-sans  text-gray-700 hover:text-black">
    //                 followings
    //                 </div>
    //             </p>
    //             <div className="font-extrabold">
    //                 111
    //                 <div className="font-bold capitalize font-sans text-gray-700 hover:text-black">
    //                 followers
    //                 </div>
    //             </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    <div
      className="w-80 rounded-md relative shadow hover:shadow-outer cursor-pointer"
      style={{ width: "fit-content" }}
    >
      <div className="bg-white rounded-lg">
        <img
          src={metadata?.image ? metadata?.image : ImagePlaceholder }
          className="max-w-xs rounded-t-md h-80 "
          // formats={["jpg"]}
          alt="IMAGE TITLE"
          // as="image"
        />
        <div style={{ marginTop: "-20px" }}>
          <ProfileCard />
        </div>
        <div className="pt-4 flex p-2 flex-col pb-4 pl-4">
          <div className="font-sans font-semibold space-x-1  items-center text-xs inline-flex text-gray-600 capitalize">
            <span>{nft?.name}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=" h-5 w-5 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>

          <h1 className="font-sans font-medium text-xxs capitalize mb-4">
            {metadata?.name ? metadata?.name : nft.tokenId}
          </h1>
          <div className="flex justify-between">
            <div>
              <p className="font-sans font-regular text-xs capitalize">
                Current Bid
              </p>
              {/* <p className="font-sans font-regular text-xs capitalize">Reserve Price</p> */}
              <p className="font-sans font-semibold text-md capitalize">
                1.00 ETH
              </p>
            </div>
            <div className="rounded-2xl space-x-0.5 xl:text-sm text-xs font-semibold text-center my-auto py-1 px-2.5 bg-gray-200">
              <span>08h</span>:<span>36</span>m:<span>20</span>s left
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
