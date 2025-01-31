import React from "react";
import SearchChat from "./SearchChat";
import Conversations from "./Conversations";

const ConversationSideBar = () => {
  return (
    <div className="sm:w-[30%] w-full sm:h-[70dvh] min-h-full sm:border-r-2 sm:border-black ">
      <h1 className="md:h-[15%] h-[5%] flex justify-center items-center text-4xl font-lobster md:pt-0 pt-5">
        Chats
      </h1>

      <div className="md:w-2/3 md:h-[1px] md m-auto bg-black"></div>
      {/* <SearchChat/> */}
      <Conversations />
    </div>
  );
};

export default ConversationSideBar;
