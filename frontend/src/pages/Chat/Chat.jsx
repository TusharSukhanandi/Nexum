import React, { useEffect, useState } from "react";
import Background from "../../componants/Background";
import ConversationSideBar from "../../componants/ConversationSideBar";
import Messages from "../../componants/Messages";
import Header from "../../componants/Header";
import useLogOut from "../../hooks/useLogOut";
import { useSelector } from "react-redux";
import { CiLogout, CiSearch } from "react-icons/ci";

const Chat = () => {
  const { loding, logOut } = useLogOut();
  const handleLogout = () => {
    logOut();
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleWindowResize = () => {
      const currentWidth = window.innerWidth;
      setIsMobile(currentWidth < 600);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const { selectedConversation } = useSelector(
    (state) => state.selectConversation
  );

  return ( 
    <Background>
      {/* <button className="block absolute text-white m-5 text-3xl left-0" ><CiSearch/></button> */}
      <button className="block absolute text-white m-5 text-3xl right-0" onClick={handleLogout}><CiLogout/></button>
      <Header height={isMobile && selectedConversation && !selectedConversation._id ? "h-[20dvh]" : "h-[10dvh]"} />
      <div className={`sm:w-[80%] w-[100vw] m-auto sm:mt-12 sm:h-[70dvh] sm:flex ${isMobile && selectedConversation && !selectedConversation._id ? "h-[80dvh]" : "h-[90dvh]"}`} >
        {isMobile ? ( 
          <>
          {selectedConversation._id && selectedConversation._id  ? <Messages  isMobile={isMobile}  /> : <ConversationSideBar />}
          </>
        ) : (
          <>
            <ConversationSideBar />
            <Messages/>
          </>
        )}
      </div>
    </Background>
  );
};

export default Chat;
