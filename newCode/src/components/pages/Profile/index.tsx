import React, { useEffect, useState } from "react"
import { uuid } from "../../../utils/services"
import { Tab } from "@headlessui/react"
import { Link } from "gatsby"
import { NftCard } from "../../NftCard"
import GetUserNfts from "./GetUserNfts"
import { useAuth } from "../../../hooks/useAuth";

const Profile = () => {
    
    const { logout, currentUser,login } = useAuth();
    const user = currentUser();
    const [isCopied, setIsCopied] = useState(false);
    const [showMore, setShowMore] = useState(false);

    console.log("user ", user)
  
  async function copyTextToClipboard(text: string) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text)
    } else {
      return (
        document &&
        document !== undefined &&
        document.execCommand("copy", true, text)
      )
    }
  }

  // const handleCopyClick = () => {
  //   // Asynchronously call copyTextToClipboard
  //   copyTextToClipboard(userData?.publicAddress!)
  //     .then(() => {
  //       // If successful, update the isCopied state value
  //       setIsCopied(true)
  //       setTimeout(() => {
  //         setIsCopied(false)
  //       }, 1500)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  return (
        <div className="flex max-w-screen-3xl mx-auto flex-col items-center py-2.5 px-2">
            {/* {
                userData?.coverImage
                ?
                <>
                    <img src={`${process.env.s3_url}/${userData?.coverImage}?${uuid()}`} className="object-cover bg-gray-200 w-full h-64 rounded-2xl"/>
                </>
                : */}
                <div className="flex justify-center items-center w-full h-64 rounded-2xl bg-gray-200">
                </div>
            {/* } */}
            {/* {
                userData?.profileImage
                ?
                    <img src={`${process.env.s3_url}/${userData?.profileImage}?${uuid()}`} className="object-cover  w-32 h-32 absolute top-64 rounded-full bg-gray-200 border-4 border-white"></img>
                :
                    <div className="w-32 h-32 absolute top-64 rounded-full bg-gray-200 border-4 border-white"></div>
            } */}

              <div className="md:w-32 w-32 md:h-32 h-32 absolute top-64 rounded-full cursor-pointer bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"></div>

              <div className="flex justify-center items-center flex-col mt-20">
                    <h1 className="font-sans font-semibold text-3xl capitalize mb-4">
                        {/* {userData?.displayName} */}
                    </h1>
                {/* <div className="flex justify-center items-center rounded-2xl bg-gray-100 h-5 w-28 cursor-pointer hover:bg-gray-200 mb-4" onClick={handleCopyClick}>
                    <p className="text-xs" style={{color: "rgb(128, 128, 128)"}}>
                        {isCopied ? "Copied!" : `${userData?.publicAddress.substring(0, 6)}...${userData?.publicAddress.substr(userData?.publicAddress.length - 4)}`}
                    </p>
                </div> */}
                <p className="font-normal text-md mb-4">
                    {/* @{userData?.username} */}
                </p>
                {
                    showMore
                    ?
                    <p className="text-xs text-center max-w-md mb-4 whitespace-pre-wrap break-words" style={{color: "rgb(128, 128, 128)"}}>
                        {/* {userData?.bio} */}
                        <button className="no-underline hover:underline inline-block ml-1.5" style={{color: "rgb(0, 102, 255)"}} onClick={() => setShowMore(!showMore)}>Read less</button>
                    </p>
                    :
                    <div>
                        <p className="text-xs text-center max-w-md mb-4 inline-block whitespace-pre-wrap" style={{color: "rgb(128, 128, 128)"}}>
                            {/* {userData?.bio?.substring(0, 250)}... */}
                            <button className="no-underline hover:underline inline-block ml-1.5" style={{color: "rgb(0, 102, 255)"}} onClick={() => setShowMore(!showMore)}>Read more</button>
                        </p>
                    </div>
                }
                {/* <div className="flex p-2 md:mb-5 justify-around w-full items-center">
                    <p className="font-bold text-base">0<span className="ml-2 font-medium font-sans text-gray-700 hover:text-black">followers</span></p>
                    <p className="font-bold text-base">0<span className="ml-2 font-medium font-sans text-gray-700 hover:text-black" >followings</span></p>
                </div> */}
                
                <Link to="/edit-profile">
                    <button className="capitalize rounded-full bg-white w-32 h-9 text-black border-gray-200 border-2 p-0.5 font-medium">
                        Edit Profile
                    </button>
                </Link>
            </div>
      <Tab.Group>
        <Tab.List className="capitalize border-b-2 border-gray-200  flex w-full justify-evenly p-4 mt-7 px-0 space-x-2 bg-blue-900/20 ">
          <Tab className={({ selected }) =>
                selected ? 'text-black capitalize lg:text-sm md:text-base sm:text-sm text-xs font-sans sm:font-semibold font-bold' : 'capitalize lg:text-sm md:text-base sm:text-sm text-xs font-sans sm:font-semibold font-bold text-gray-400'
            } >on Sale <span>46</span> </Tab>
          <Tab className={({ selected }) =>
                selected ? 'text-black capitalize lg:text-sm md:text-base sm:text-sm text-xs font-sans sm:font-semibold font-bold' : 'capitalize lg:text-sm md:text-base sm:text-sm text-xs font-sans sm:font-semibold font-bold text-gray-400'
            }>created <span>71</span></Tab>
          <Tab className={({ selected }) =>
                selected ? 'text-black capitalize lg:text-sm md:text-base sm:text-sm text-xs font-sans sm:font-semibold font-bold' : 'capitalize lg:text-sm md:text-base sm:text-sm text-xs font-sans sm:font-semibold font-bold text-gray-400'
            }>groups/invested <span>20</span></Tab>
          <Tab className={({ selected }) =>
                selected ? 'text-black capitalize lg:text-sm md:text-base sm:text-sm text-xs font-sans sm:font-semibold font-bold' : 'capitalize lg:text-sm md:text-base sm:text-sm text-xs font-sans sm:font-semibold font-bold text-gray-400'
            }>favourited <span>1</span></Tab>
        </Tab.List>
        <Tab.Panels className="w-full">
          <Tab.Panel>
              <GetUserNfts />
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
          <Tab.Panel>Content 4</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default Profile
