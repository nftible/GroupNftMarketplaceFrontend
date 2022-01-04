import { Switch } from "@headlessui/react"
import { StaticImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import { MyDialog } from "../Dialog"

export const CreateNftForm = () => {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="mx-auto max-w-5xl space-y-5 px-3">
      <div className="mt-8 mb-8">
        <h1 className="font-sans font-semibold md:text-4xl text-2xl ">
          Create your NFT
        </h1>
      </div>
      <h1 className="font-sans font-semibold md:text-2xl text-2xl capitalize">
        upload Artwork
      </h1>
      <div className="border-dashed space-y-3 rounded-md max-w-lg h-60 border-2 border-gray-400 hover:bg-gray-50 mt-5 cursor-pointer flex flex-col  justify-center items-center">
        <svg
          className="upload-icon"
          width="40"
          height="40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.438 12.81L20 6.25l6.563 6.56M20 23.75V6.255M33.75 23.75v8.75a1.25 1.25 0 01-1.25 1.25h-25a1.25 1.25 0 01-1.25-1.25v-8.75"
            stroke="#a2a3a8"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
        <p className="font-semibold">PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</p>
        <button className="p-1.5 rounded-3xl border-2 border-black font-semibold hover:text-white hover:bg-gray-900 font-sans text-sm px-6">
          Choose File
        </button>
      </div>
      <h1 className="font-sans font-semibold md:text-2xl text-2xl capitalize">
        Artwork Details
      </h1>
      <form className="bg-white space-y-5  md:max-w-lg">
        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            id="name"
          >
            Name
          </label>
          <input
            className={`shadow appearance-none border text-sm focus:border-transparent focus:ring-2 focus:ring-black rounded w-full py-2 px-3 text-gray-700 leading-loose focus:outline-none focus:shadow-outline `}
            id="name"
            autoComplete="off"
            type="text"
            placeholder="e.g.  Painting #17 Doge"
            name="name"
          />
        </div>

        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            id="bio"
          >
            Add a Description
          </label>
          <textarea
            className={`shadow appearance-none border focus:border-transparent focus:ring-2 focus:ring-black rounded w-full py-2 px-3 text-gray-700 text-sm leading-loose focus:outline-none focus:shadow-outline`}
            id="desc"
            autoComplete="off"
            name="desc"
            placeholder="Provide a detail description of your item."
            rows={5}
          ></textarea>
          <p
            className=" text-xs ml-2 text-gray-500"
            style={{ display: "inline-block" }}
          >
            With preserved line-breaks
          </p>
        </div>

        <div className="flex justify-between">
          <h1 className="font-sans font-semibold md:text-xl text-2xl ">
            Put on marketplace
          </h1>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? "bg-blue-600" : "bg-gray-200"
            } relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span className="sr-only">Enable marketplace</span>
            <span
              className={`${
                enabled ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </Switch>
        </div>
        {!enabled && (
          <p
            className=" text-xs font-semibold text-gray-500"
            style={{ display: "inline-block" }}
          >
            Put your new NFT on our marketplace
          </p>
        )}
        {enabled && (
          <p
            className=" text-xs font-semibold text-gray-500"
            style={{ display: "inline-block" }}
          >
            Enter price to allow users instantly purchase your NFT
          </p>
        )}

        {enabled && (
          <>
            <div className="flex justify-between ">
              <div className="border-2 rounded-2xl p-1.5 w-5/12 h-36 flex flex-col items-center justify-center">
                <StaticImage
                  src="../../images/priceTag.png"
                  alt="FIXED PRICE IMAGE"
                  width={40}
                  style={{ margin: "4px" }}
                />
                <p className="font-semibold">Fixed price</p>
              </div>
              <div className="border-2 rounded-2xl p-1.5 w-5/12 h-36 flex flex-col items-center justify-center">
                <StaticImage
                  src="../../images/clock.png"
                  alt="FIXED PRICE IMAGE"
                  width={40}
                  style={{ margin: "4px" }}
                />
                <p className="font-semibold">Timed auction</p>
              </div>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                id="price"
              >
                Price
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  className={`shadow appearance-none border text-sm focus:border-transparent focus:ring-2 focus:ring-black rounded w-full py-2 px-3 text-gray-700 leading-loose focus:outline-none focus:shadow-outline `}
                  id="price"
                  autoComplete="off"
                  type="text"
                  placeholder="Enter price for one piece"
                  name="price"
                />

                <div className="absolute inset-y-1 right-0 flex items-center">
                  <label htmlFor="currency" className="sr-only">
                    Currency
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    className="focus:outline-none h-full border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                  >
                    <option>ETH</option>
                    <option>WETH</option>
                    <option>MATIC</option>
                    <option>USD</option>
                  </select>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-500 pt-2.5">
                Service fee
                <span className="font-extrabold text-black">5%</span>
              </p>
              <p className=" text-sm font-semibold text-gray-500 pt-1.5">
                You will receive
                <span className="font-extrabold text-black p-0.5">0</span>ETH
              </p>
            </div>
          </>
        )}

        <div className="flex items-center justify-between mt-16">
          <button
            className="text-white hover:bg-black bg-gray-900 font-bold py-2 px-4 rounded-xl w-full mb-4 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Item
          </button>
        </div>
      </form>
    </div>
  )
}
