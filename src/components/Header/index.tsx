import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { Menu, Popover, Transition } from "@headlessui/react"
import { Fragment, useRef } from "react"
import { useAuth } from "../../hooks/useAuth";
import { useMoralis } from "../../hooks/useMoralis";

// declare global {
//   interface Window {
//     ethereum: any
//   }
// }

enum authStateType {
  PENDING = "PENDING",
  SIGNED_IN = "SIGNED_IN",
  SIGNED_OUT = "SIGNED_OUT"
}

const Header = () => {
  

  // const installMetamask = () => {
  //   try {
  //     const onboarding =
  //       typeof window !== "undefined" && new MetaMaskOnboarding()
  //     typeof window !== "undefined" &&
  //       onboarding &&
  //       onboarding.startOnboarding()
  //   } catch (err) {
  //     setLoading(false)
  //   }
  // }



  const { logout, currentUser,login } = useAuth();
  const user = currentUser();
  const userAddress = user?.get("ethAddress");

  const [authState, setAuthState] = useState<authStateType>(authStateType.SIGNED_OUT);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  
  const handleSubmitLogin = async () => {
    setLoading(true)
    try {
    await login()
    setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  const handleLogout = async() => {
        setLoading(true)

    try {
       await logout()
       setLoading(false)

    }
    catch(e){
      console.log(e)
      setLoading(false)

   }
  }



  React.useEffect(() => {

    console.log(user)

    if (loading){
      setAuthState(authStateType.PENDING)
    }
  
    else {
    if (user) {
      setAuthState(authStateType.SIGNED_IN)
    }
    else{
    setAuthState(authStateType.SIGNED_OUT)
  }
  
}

  }, [user,loading]);

  return (
    <nav className="relative my-auto bg-white shadow-sm border-b-2 border-gray-200">
      <div className="flex lg:justify-around max-w-screen-3xl mx-auto justify-between items-center py-2.5 lg:space-x-14 md:space-x-11 px-2">
        <button className="text-base font-sans font-semibold text-gray-600 hover:text-black">
          LOGO
        </button>
        <div className="md:flex flex-auto hidden relative items-center">
          <svg
            className="absolute left-3 w-4 h-4 text-gray-600"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
          </svg>
          <input
            className="font-sans flex-grow border-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black pl-8 text-sm font-medium p-3 rounded-full"
            type="search"
            placeholder="Search item, collection and art piece"
          ></input>
        </div>
        <div className={`-mr-2 -my-2  md:hidden`}>
          <button
            type="button"
            onClick={() => {
              setIsOpen(!isOpen)
            }}
            className="bg-white rounded-md p-2 inline-flex items-center justify-center"
            aria-expanded="false"
          >
            <span className="sr-only">Open menu</span>
            {!isOpen ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
        <div
          className={` md:flex items-center lg:space-x-10 md:space-x-6 hidden`}
        >
          <a className="text-base relative font-sans font-semibold text-gray-600 hover:text-black">
            FindNFTs
          </a>
          <a className="text-base font-sans font-semibold text-gray-600 hover:text-black">
            Trending
          </a>

          {authState !== "PENDING" ? (
            user ? (
              <>
                <Popover className="relative flex">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={`
                ${open ? "" : "text-opacity-90"}
                  rounded-full border-transparent inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                      >
                        {user.profileImage ? (
                          <div className="border-transparent w-9 h-9 rounded-3xl">
                            <img
                              className="rounded-full w-full h-full object-cover"
                              // src={`${process.env.s3_url}/${
                              //   user.profileImage
                              // }?${uuid()}`}
                              alt=""
                            />
                          </div>
                        ) : (
                          <div className="md:w-8 w-8 md:h-8 h-8 rounded-full cursor-pointer bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"></div>
                        )}
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel
                          className="absolute z-10 w-60 max-w-sm transform -translate-x-full left-1/2 sm:px-0"
                          style={{ marginTop: "3.2rem" }}
                        >
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="p-4 bg-gray-50">
                              <ul className="space-y-3 dark:text-white">
                                <li className="font-medium capitalize">
                                  <Link
                                    to="/profile"
                                    className="flex items-center cursor-pointer border-transparent "
                                  >
                                    <div className="mr-3">
                                      <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        ></path>
                                      </svg>
                                    </div>
                                    Profile
                                  </Link>
                                </li>
                                <hr className="dark:border-gray-700" />
                                <li className="font-medium">
                                  <Link
                                    to="/edit-profile"
                                    className="flex items-center cursor-pointer border-transparent "
                                  >
                                    <div className="mr-3">
                                      <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        ></path>
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        ></path>
                                      </svg>
                                    </div>
                                    Setting
                                  </Link>
                                </li>
                                <hr className="dark:border-gray-700" />
                                <li className="font-medium">
                                  <div
                                    className="flex cursor-pointer items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
                                    onClick={handleLogout}
                                  >
                                    <div className="mr-3 text-red-600">
                                      <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        ></path>
                                      </svg>
                                    </div>
                                    Logout
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </>
            ) : loading ? (
              <div
                style={{
                  borderTopColor: "transparent",
                  display: "inline-block",
                }}
                className="w-5 h-5 border-2 border-black border-solid rounded-full animate-spin"
              ></div>
            ) : (
              <button
                className="capitalize p-2.5 rounded-full font-sans hover:shadow-outer font-bold text-white text-sm duration-500 ease-in-out bg-gray-900 hover:bg-black transform-gpu hover:-translate-y-1 hover:scale-110 "
                onClick={handleSubmitLogin}
              >
                connect wallet
              </button>
            )
          ) : (
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-200 w-9 h-9"></div>
            </div>
          )}
        </div>
      </div>

      <aside
        className={`${isOpen ? "flex" : "hidden"} 
        h-screen overflow-hidden relative space-y-4 flex-col bg-white w-full px-2 py-8 min-h-screen z-30 
        `}
      >
        <div className="relative flex items-center">
          <svg
            className="absolute left-1 w-4 h-4 text-gray-600"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
          </svg>
          <input
            className="font-sans flex-grow border-b-2 focus:border-black focus:border-transparent focus:outline-none pl-8 text-sm font-medium p-1.5"
            type="search"
            placeholder="Search item, collection and art piece"
          ></input>
        </div>
        <a className="text-base block relative font-sans font-semibold text-gray-600 hover:text-black">
          FindNFTs
        </a>
        <a className="text-base block font-sans font-semibold text-gray-600 hover:text-black">
          Trending
        </a>
        <a className="text-base block relative font-sans font-semibold text-gray-600 hover:text-black">
          About
        </a>
        <a className="text-base block relative font-sans font-semibold text-gray-600 hover:text-black">
          Help
        </a>
        <a className="text-base block relative font-sans font-semibold text-gray-600 hover:text-black">
          Twitter
        </a>
        <a className="text-base block relative font-sans font-semibold text-gray-600 hover:text-black">
          Instagram
        </a>
        {authState !== "PENDING" &&
          (user ? (
            <button
              className="capitalize p-3 rounded-full font-sans hover:shadow-outer font-bold text-white text-sm duration-500 ease-in-out bg-gray-900 hover:bg-black transform-gpu hover:-translate-y-1 hover:scale-110 "
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="capitalize p-3 rounded-full font-sans hover:shadow-outer font-bold text-white text-sm duration-500 ease-in-out bg-gray-900 hover:bg-black transform-gpu hover:-translate-y-1 hover:scale-110 "
              onClick={handleSubmitLogin}
            >
              connect wallet
            </button>
          ))}
      </aside>
    </nav>
  )
}

export default Header

{
  /* <button className="capitalize bg-black w-36 hover:shadow-outer border-transparent transition duration-400 ease-out transform lg:hover:-translate-y-1 lg:h-11 md:h-9 sm:h-8 text-white rounded-full font-sans font-semibold">
            connect wallet
          </button> */
}

{
  /* <button className="capitalize bg-black w-36 hover:shadow-outer border-transparent transition duration-400 ease-out transform lg:hover:-translate-y-1 lg:h-11 md:h-9 sm:h-8 text-white rounded-full font-sans font-semibold">
            connect wallet
          </button> */
}
