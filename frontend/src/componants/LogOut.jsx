import React from "react";
import useLogOut from "../hooks/useLogOut";
import { CiLogout } from "react-icons/ci";


const LogOut = () => {
  const { loading, logOut } = useLogOut();
  const handleLogout = () => {
    logOut();
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <button
          className="fixed text-3xl m-6  text-black"
          disabled={loading}
          onClick={handleLogout}
        >
          <CiLogout />
        </button>
      )}
    </>
  );
};

export default LogOut;

const Loading = () => {
  return (
    <div className="w-7 h-7 m-5 absolute bg-white right-0 rounded-lg animate-spin"></div>
  );
};
