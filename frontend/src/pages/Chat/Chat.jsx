import React, { useEffect, useState } from "react";
import Background from "../../componants/Background";
import ConversationSideBar from "../../componants/ConversationSideBar";
import Messages from "../../componants/Messages";
import Header from "../../componants/Header";
import { useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import SearchUsers from "../../componants/SearchUsers";
import ProfileIcon from "../../componants/ProfileIcon";
import LogOut from "../../componants/LogOut";

const Chat = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [showSerach, setShowSearch] = useState(false);

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

  const closeSearch = (event, isButton) => {
    if (isButton) {
      return setShowSearch(false);
    }

    if (event.target === event.currentTarget) {
      return setShowSearch(false);
    }
  };

  return (
    <Background>
    
      <div>
        {showSerach ? <SearchUsers handleCloseSearch={closeSearch} /> : null}
      </div>

      <Header
        height={
          isMobile && selectedConversation && !selectedConversation._id
            ? "h-[20dvh]"
            : "h-[10dvh]"
        }

        setShowSearch={setShowSearch}
      />
      {/* //subBackground */}
      <div
        className={`sm:w-[80%] w-[100vw] m-auto sm:mt-12 bg-[#D9D9D9] md:rounded-3xl rounded-t-3xl md:h-[78vh] sm:flex ${
          isMobile && selectedConversation && !selectedConversation._id
            ? "h-[80dvh]"
            : "h-[90dvh]"
        }`}
      >
        {isMobile ? (
          <>
            {selectedConversation._id && selectedConversation._id ? (
              <Messages isMobile={isMobile} />
            ) : (
              <ConversationSideBar />
            )}
          </>
        ) : (
          <>
            <ConversationSideBar />
            <Messages />
          </>
        )}
      </div>
    </Background>
  );
};

export default Chat;
