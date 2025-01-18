import React from "react";
import { useSocketContext } from "../context/socketContex";

const Conversation = ({ conversation }) => {
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      {/* add color of chat choice box color */}
      <div className="text-center w-[90%] m-auto rounded-lg text-white flex justify-start items-center gap-4 h-20 sm:h-14 text-xl mt-2 hover:bg-purple-600 sm:cursor-pointer transition-all "> 
        <div className="animate-fadeIn rounded-full w-10 ml-5 relative ">
          <img className=" text-xs text-white" src={conversation.profilePicture} alt="profilePicture" />
          {isOnline && isOnline ? (
            <div className="absolute w-2 h-2 rounded-full bg-green-500 right-[2px] bottom-[2px]"></div>
          ) : null}
        </div>
        <h4 className="mb-1 animate-fadeIn">{conversation.userName}</h4>
      </div>
    </>
  );
};

export default Conversation;
