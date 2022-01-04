import { Transition } from '@headlessui/react'
import React from 'react'

export const PlaceBid = () => {
    return (
        <div className="max-w-full space-y-3 w-full border-transparent rounded-2xl lg:pb-3.5 pb-2 ">
        <div className="flex justify-between flex-wrap">
            <div className="flex-col items-start">
            <h1 className="text-base text-left font-sans font-semibold md:leading-8">Current bid</h1>
            {/* <h1 className="text-base text-left font-sans font-semibold md:leading-8">Reserve Price</h1> */}
            {/* <h1 className="text-base text-left font-sans font-semibold md:leading-8">Price</h1> */}
            <p className="font-sans text-left font-bold md:text-3xl text-lg">0.80 <span className="uppercase">eth</span></p>
            <p className="font-sans text-left font-semibold hover:text-black text-gray-800 text-base ">$3,0547.34</p>
            </div>
            <div>
                <p className="text-base sm:text-left font-sans font-semibold md:leading-8 capitalize">auction ending in</p>
                <div className="flex space-x-7">
                <div className=" text-center  text-black">
                <div className="font-sans font-bold md:text-2xl text-left text-lg" x-text="hours">00</div>
                <div className="font-sans capitalize md:text-lg text-base font-medium ">hours</div>
                </div>
                <div className=" text-center  text-black">
                <div className="font-sans font-bold md:text-2xl text-left text-lg" x-text="hours">00</div>
                <div className="font-sans capitalize md:text-lg text-base font-medium">minutes</div>
                </div>
                <div className=" text-center  text-black">
                <div className="font-sans font-bold md:text-2xl text-left text-lg" x-text="hours">00</div>
                <div className="font-sans capitalize md:text-lg text-base font-medium">seconds</div>
                </div>
                </div>
            </div>
        </div>
        <button className="w-full text-center bg-black text-white font-bold font-sans md:p-2.5 p-1.5 text-lg rounded-xl">Place a Bid</button>
        </div>
    )
}
