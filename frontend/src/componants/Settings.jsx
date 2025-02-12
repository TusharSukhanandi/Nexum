import React from "react";
import { useUserContext } from "../context/userContext";
import LogOut from "./LogOut";


const Settings = () => {
  const { user } = useUserContext();

  return (
    <>
      <div className="min-w-full h-[15%] animate-fadeIn flex justify-center flex-col items-center text-4xl font-lobster">
        settings
        <div className="w-20 h-[2px] bg-black"></div>

      </div>
      <LogOut/>
      <div className="w-full h-[85%] flex text-xl justify-center items-center font-poppins pb-16">
        this feature is coming soon 😊
      </div>
    </>
  );
};

export default Settings;
