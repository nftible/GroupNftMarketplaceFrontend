import React from "react"

export const NftHistory = () => {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl text-left font-sans font-semibold mb-2">
        Activity
      </h1>

      <div className="shadow-outer max-w-full p-2 rounded-xl">
        <div className="flex items-center">
          <img
            className="inline object-cover w-12 h-12 mr-2 rounded-full"
            src="https://ethoz-light.vistothemes.com/assets/img/user-Image16.jpg"
            alt="Profile image"
          />
          <div className="flex justify-between space-x-1 max-w-xl w-full">
            <div className="md:text-base text-sm font-sans space-y-0.5 font-semibold tracking-normal">
              <span>Bid placed </span>
              <span className="text-gray-600">by</span>
              <span className="font-semibold pl-1">@uzair</span>
              <div className="font-semibold md:text-base text-sm">
                At <span className="text-gray-600">2.30 PM</span> on <span>19</span>
                <span className="capitalize pl-0.5">June,</span>
                <span className="pl-0.5">2021</span>
              </div>
            </div>
            <div className="md:text-lg text-right text-base font-sans font-bold ">
              <span>1.333</span>
              <span className="pl-1.5">ETH</span>
              <div>$586.11</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
