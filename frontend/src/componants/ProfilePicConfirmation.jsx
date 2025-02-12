import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import useChangeProfilePicture from "../hooks/useChangeProfilePicture";

const ProfilePicConfirmation = ({ preview, file }) => {
  const { loading, profilePictureUrl, sendProfilePicture } =
    useChangeProfilePicture(file);

  return (
    <div className="w-52 h-52 rounded-full">
      <img src={preview} className="w-52 h-52 rounded-full object-cover" />
      <div className="w-full flex justify-around items-center mt-12">
        <div className="w-12 h-12 bg-[#A78D78] flex justify-center items-center rounded-full text-xl">
          <FaTimes />
        </div>
        <div
          onClick={sendProfilePicture}
          className="w-12 h-12 bg-[#A78D78] flex justify-center items-center rounded-full text-xl"
        >
          <FaCheck />
        </div>
      </div>
    </div>
  );
};

export default ProfilePicConfirmation;
