import React from "react";

const Message = ({ message }) => {
  return (
      <div
        className={`bg-purple-600 text-white max-w-[75%] break-words font-poppins p-3 px-4 m-1 rounded-3xl`}
      >
        {message}
      </div>

  );
};

export default Message;
