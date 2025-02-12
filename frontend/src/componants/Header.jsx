import React, {useState} from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import ProfileIcon from "./ProfileIcon"
import ModelContainer from "./ModelContainer";

const Header = ({ height }) => {

    const [showModel, setShowModel] = useState(false);

    
  const closeModel = (event, isButton) => {
    if (isButton) {
      return setShowModel(false);
    }

    if (event.target === event.currentTarget) {
      return setShowModel(false);
    }
  };

  return (
    <header
      className={`w-full transition-all flex justify-around md:pt-9 flex-1 items-center ${height}`}
    >

      <button onClick={() => setShowModel(true)} className="text-black font-extrabold text-3xl">
        <CiSearch />
      </button>

         
      {showModel ? <ModelContainer handleCloseModel={closeModel} forWhat={"userSearch"} /> : null}
      

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
