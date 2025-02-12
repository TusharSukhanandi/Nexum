import React, {useState} from "react";
import { FiSettings } from "react-icons/fi";
import Profile from "./Profile";
import Settings from "./Settings";


const ProfileScreen = () => {

  const [isSetting, setIsSetting] = useState(true)

  return (
    <div className="animate-fadeIn w-full relative h-full ">
      <FiSettings onClick={() => setIsSetting(!isSetting)} className="absolute right-0 text-2xl m-6 cursor-pointer" />

     {
      isSetting ? <Profile/> : <Settings/>
     }
     

    </div>
  );
};

export default ProfileScreen;
