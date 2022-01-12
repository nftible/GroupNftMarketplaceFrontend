import React, { useEffect, useState } from "react"
import { uuid } from "../../../utils/services"
import { Tab } from "@headlessui/react"
import { Link } from "gatsby"
import { NftCard } from "../../NftCard"
import axios from 'axios';
import { useAuth } from "../../../hooks/useAuth";

const GetUserNfts = () => {
  const [nfts, setNFTS] = useState<any>([]);
  const { logout, currentUser,login } = useAuth();
  const user = currentUser();
  const userAddress = user?.get("ethAddress");

  const fetchNFTS = async () => {
    try {
      const getNFTS: any = await axios.get('https://deep-index.moralis.io/api/v2/0x1E9fA661650ac6fB050E510762e3fF86Dbfb2ca5/nft?chain=mumbai&format=decimal', 
                                                      {headers: {'X-API-Key': "9ZKxMNoGDSMMxIKvOsypJu2Eq5chPxdVPLTXQHkn5Ylo5kICY3L3sots4NsgdOOf"}});
      console.log("getNFTS ", getNFTS.data)
      setNFTS(getNFTS.data.result)
    } catch (err) {
      console.log("err", err)
    }
  }

  useEffect(() => {
    fetchNFTS()
  }, [])

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-3 mt-12">
      {nfts.length > 0 && nfts.map((nft: any) => <NftCard nft={nft} />)}
    </div>
  )
}

export default GetUserNfts
