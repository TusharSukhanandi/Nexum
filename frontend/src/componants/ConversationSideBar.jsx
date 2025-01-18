import React from "react";
import SearchChat from "./SearchChat";
import Conversations from "./Conversations";

const ConversationSideBar = () => {
  return (
    <div className="sm:w-[30%] w-full  sm:h-[70dvh] h-full sm:border-r-2 sm:border-purple-500 ">
      <h1 className="text-white md:h-[15%] h-[5%] flex justify-center items-center text-4xl font-lobster">
        Chats
      </h1>

      <div className="md:w-2/3 md:h-[1px] md:mt-2 m-auto bg-white"></div>
      {/* <SearchChat/> */}
      <Conversations />
    </div>
  );
};

export default ConversationSideBar;
