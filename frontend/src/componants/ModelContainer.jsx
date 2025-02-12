import React from "react";
import SearchUsers from "./SearchUsers";
import ProfilePicConfirmation from "./ProfilePicConfirmation";

const ModelContainer = ({preview, file, handleCloseModel, forWhat }) => {

  
  const renderModal = () => {
    switch (forWhat) {
      case "userSearch":
        return <SearchUsers />;
      case "profilePicConfirmation":
        return <ProfilePicConfirmation preview={preview} file={file} />;
      default:
        return null;
    }
  };

  return (
    <div
      onClick={(e) => handleCloseModel(e, false)}
      className="animate-fadeIn w-[100vw] h-[100dvh] fixed top-0 left-0 flex justify-center items-center bg-gray-800/75 z-40"
    >
      {renderModal()}
    </div>
  );
};

export default ModelContainer;
