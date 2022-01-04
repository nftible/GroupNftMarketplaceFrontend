import React,{ useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export function MyDialog() {
  let [isOpen, setIsOpen] = useState(true)


  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-opacity-80 bg-gray-200"
          onClose={()=>{console.log("nhi band honga mai jani")}}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-sm p-4 my-8 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">

              <div style={{borderTopColor:"transparent", display: "inline-block"}} className="w-5 h-5 border-2 border-black rounded-full animate-spin" />

                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900 capitalize"
                >
                  wrong network
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 capitalize">
                    looks like you connected to unsupported network. Change network to mainnet.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-semibold  text-black bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 "
                    // onClick={closeModal}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
