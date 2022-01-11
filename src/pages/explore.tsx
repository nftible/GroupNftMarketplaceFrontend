import { Listbox, Transition } from "@headlessui/react"
import React, { Fragment, useState } from "react"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import CheckMartImg from "../images/checkmark.png"
const updateProfile = () => {
  const types = ["all", "art", "metaverses", "games"]
  const people = [
    { id: 1, name: "Recently added", unavailable: false },
    { id: 2, name: "price high to low", unavailable: false },
    { id: 3, name: "price low to high", unavailable: false },
    { id: 4, name: "auction ending soon", unavailable: true },
    { id: 5, name: "Date: Newest", unavailable: false },
    { id: 5, name: "Date: Oldest", unavailable: false },
  ]

  const [isActive, setIsActive] = useState(types[0])
  const [selectedPerson, setSelectedPerson] = useState(people[0])

  console.log(isActive)
  return (
    <Layout authenticated={false}>
      <SEO title="explore page nft" />
      <div>
      <div className="flex justify-between md:px-12">
       <div className="">
        <h1 className="font-sans font-semibold md:text-4xl text-3xl capitalize ">
        Explore Artworks
        </h1>
        {types.map((type: string) => (
          <button
            onClick={() => setIsActive(type)}
            className={` ${
              isActive === type ? "bg-black text-white" : "bg-gray-100 text-black"
            } hover:text-white hover:bg-black p-1.5 m-1 rounded-lg focus:outline-none focus:shadow-outline capitalize font-medium text-sm`}
            type="reset"
          >
            {type}
          </button>
        ))}
        </div>

        <div>
          <Listbox value={selectedPerson} onChange={setSelectedPerson}>
            <Listbox.Button className="relative w-max capitalize border py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 focus:ring-white focus:ring-offset-2 focus:border-black sm:text-sm">
              {selectedPerson.name}
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute w-max mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {people.map(person => (
                  <Listbox.Option
                    className={({ active }) =>
                      `${
                        active ? "text-black font-medium " : "text-gray-900 "
                      }
                      cursor-pointer w-full select-none relative pb-2 pt-2 p-3 capitalize`
                    }
                    key={person.id}
                    value={person}
                    as="li"
                  >
                    {({ active, selected }) => (
                      <li
                        className={`
                        text-black rounded-md p-0
                        `}
                      >
                        {person.name}
                      </li>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </div>
      </div>
      </div>
    </Layout>
  )
}

export default updateProfile

// ${
//   active
//     ? "bg-gray-100"
//     : "bg-white"
// }