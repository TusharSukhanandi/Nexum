import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({height}) => {
  return (
    <header className={`w-full transition-all flex justify-center items-center ${height}`}>
   <Link to={"/"}> <p className="text-white font-lobster text-5xl">Nexum</p></Link>
  </header>
  )
}

export default Header