import React, { useEffect, useState } from "react"
import { uuid } from "../../../utils/services"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import { Tab } from "@headlessui/react"
import { Link } from "gatsby"
import { NftCard } from "../../NftCard"
import { API } from "aws-amplify"
import { getUsersNfts } from "../../../graphql/queries"

const GetUserNfts = () => {
  const { userData } = useAppSelector(state => state.entity)
  const [nfts, setNFTS] = useState<any>([])

  const fetchNFTS = async () => {
    try {
      const getNFTS: any = await API.graphql({
        query: getUsersNfts,
        variables: { input: { userPublicAddress: userData?.publicAddress } },
      })
      console.log("getNFTS ", getNFTS.data.getUsersNfts.data)
      setNFTS(getNFTS.data.getUsersNfts.data)
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
