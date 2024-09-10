import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="w-full h-[20dvh] flex justify-center items-center">
   <Link to={"/"}> <p className="text-white font-lobster text-5xl">Nexum</p></Link>
  </header>
  )
}

export default Header