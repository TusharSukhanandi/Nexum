import React from "react";
import { useSocketContext } from "../context/socketContex";

const Conversation = ({ conversation }) => {
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      {/* add color of chat choice box color */}
      <div className="text-center w-[90%] m-auto bg-[#c7b293] rounded-lg flex justify-start items-center gap-4 h-20 sm:h-16 text-xl mt-2 hover:bg-[#a39277] sm:cursor-pointer duration-500 transition-all "> 
        <div className="animate-fadeIn rounded-full border-x-2 border-y-2 border-white md:w-10 w-12 md:min-h-10 min-h-12 ml-5 transition-all duration-200">
          <img className="w-full md:h-10 h-12 object-cover rounded-full" src={conversation.profilePicture} alt="profilePicture" />
          {isOnline && isOnline ? (
            <div className="absolute h-2 w-2 rounded-full bg-green-500 right-[2px] bottom-[2px]"></div>
          ) : null}
        </div>
        <h4 className="mb-1 text-black font-poppins animate-fadeIn">{conversation.userName}</h4>
      </div>
    </>
  );
};

export default Conversation;
