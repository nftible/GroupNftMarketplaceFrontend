import { StaticImage } from "gatsby-plugin-image"
import React from "react"

export const NftDetail = () => {
  return (
    //   <div className="mx-auto">
    <div className="flex justify-evenly  border border-red-500">
        <div className=" border border-black">
          <StaticImage
            src="https://raroin.creabik.com/assets/img/items/item_2.png"
            alt="..."
            className="lg:max-w-4xl rounded-xl lg:max-h-full "
          />
        </div>
      <div className="px-3 border border-green-500">
         <p className="font-sans text-2xl font-semibold">Creative girl illustration</p>
         <div className="max-w-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.</div>
      </div>
    </div>
    // </div>
  )
}
      {/* <div className="max-w-f max-h-full border p-3 border-green-300">
        <StaticImage
          className="rounded max-w-full h-auto align-middle border-none"
          src="https://img.rarible.com/prod/image/upload/t_big/prod-itemImages/0x06d1fcd527e608abd94e33c2dd62f585c768d814:102/fb621d3d"
          alt=""
        />
      </div> */}