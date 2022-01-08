import React, {useState, useEffect} from "react"
import Header from "../Header"
import { navigate } from "gatsby-link";


interface LayoutProps {
  children: React.ReactNode
}


const Layout = ({ children}: LayoutProps) => {
 

  return (
    <>
      <Header />
     {children}
    </>
  )
}


export default Layout
