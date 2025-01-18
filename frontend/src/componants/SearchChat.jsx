import axios from "axios";
import React, { useEffect } from "react";
import Background from "./Background";

const SearchChat = () => {
  return (
    <div className="w-[90%] m-auto">
      <input
        className="w-full py-4 sm:py-2 text-white border-b-2 sm:mt-3 border-purple-500 text-center bg-transparent font-poppins"
        placeholder="Search Chat"
      ></input>
    </div>
  );
};

export default SearchChat;
