import React from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import ProfileIcon from "./ProfileIcon"

const Header = ({ height, setShowSearch }) => {
  return (
    <header
      className={`w-full transition-all flex justify-around md:pt-9 flex-1 items-center ${height}`}
    >

      <button onClick={() => setShowSearch(true)} className="text-black font-extrabold text-3xl">
        <CiSearch />
      </button>

      <Link to={"/"}>
        {" "}
        <p className="text-white font-lobster text-5xl">Nexum</p>
      </Link>
    <div>

      <ProfileIcon />
    </div>
    </header>
  );
};

export default Header;
