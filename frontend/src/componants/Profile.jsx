import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/userContext";
import { FiCamera } from "react-icons/fi";
import ModelContainer from "./ModelContainer";
import { useToastContext } from "../context/toastContext";

function Profile() {
  const { user } = useUserContext();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const showToast = useToastContext();

  const [showModel, setShowModel] = useState(false);

  const closeModel = (event, isButton) => {
    setPreview(null);
    setFile(null);
    if (isButton) {
      return setShowModel(false);
    }

    if (event.target === event.currentTarget) {
      return setShowModel(false);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      setFile(selectedFile);

      if (selectedFile.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        setPreview(null);
        showToast("Please, select a image", "info");
      }
    }
  };

  return (
    <>
      <div className="min-w-full h-[15%] flex justify-center flex-col items-center text-4xl font-lobster">
        Profile
        <div className="w-20 h-[2px] bg-black"></div>
      </div>

      {preview ? (
        <ModelContainer
          preview={preview}
          file={file}
          handleCloseModel={closeModel}
          forWhat={"profilePicConfirmation"}
        />
      ) : null}

      <div className="min-w-full md:h-[25%] h-[15%] flex justify-center items-center ">
        <div className="w-24 h-24 p-2 border-x-4 border-y-4 rounded-full border-gray-500 relative">
          <img
            src={user.profilePicture}
            className="w-full h-full object-cover rounded-full"
            alt="profilePicture"
          />
          <label
            htmlFor="file-upload"
            className="absolute -bottom-1 -right-3 bg-[#A78D78] w-10 h-10 text-xl flex items-center justify-center rounded-full cursor-pointer transition-all duration-500 hover:scale-75"
          >
            <FiCamera />
          </label>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className="min-w-full md:h-[60%] h-[70%] flex flex-col md:gap-9   gap-10 justify-center items-center ">
        <div className="w-[90%] md:h-[15%]  h-[12%] relative flex bg-[#A78D78] rounded-xl items-center text-lg font-poppins pb-1 pl-4 ">
          <h4 className="absolute md:-top-6 -top-8 md:text-sm text-lg font-poppins">
            username
          </h4>
          {user.userName}
        </div>
        <div className="w-[90%] md:h-[45%] h-[55%] relative flex bg-[#A78D78] rounded-xl items-center text-lg font-poppins pb-1 pl-4">
          <h4 className="absolute md:-top-6 -top-8 md:text-sm text-lg font-poppins">
            About
          </h4>
          {user?.about || "Hey, texting on Nexum"} 
        </div>
      </div>
    </>
  );
}

export default Profile;
