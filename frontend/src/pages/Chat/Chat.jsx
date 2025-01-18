import React, { useEffect, useState } from "react";
import Background from "../../componants/Background";
import ConversationSideBar from "../../componants/ConversationSideBar";
import Messages from "../../componants/Messages";
import Header from "../../componants/Header";
import useLogOut from "../../hooks/useLogOut";
import { useSelector } from "react-redux";
import { CiLogout, CiSearch } from "react-icons/ci";
import SearchUsers from "../../componants/SearchUsers";

const Chat = () => {
  const { loading, logOut } = useLogOut();
  const handleLogout = () => {
    logOut();
  };

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
      <button
        onClick={() => setShowSearch(true)}
        className="block absolute text-white m-5 text-3xl left-0"
      >
        <CiSearch />
      </button>

      <div>
        {showSerach ? <SearchUsers handleCloseSearch={closeSearch} /> : null}
      </div>

      {loading ? (
        <Loading />
      ) : (
        <button
          className="block absolute text-white m-5 text-3xl right-0"
          disabled={loading}
          onClick={handleLogout}
        >
          <CiLogout />
        </button>
      )}

      <Header
        height={
          isMobile && selectedConversation && !selectedConversation._id
            ? "h-[20dvh]"
            : "h-[10dvh]"
        }
      />
      <div
        className={`sm:w-[80%] w-[100vw] m-auto sm:mt-12 sm:h-[70dvh] sm:flex ${
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

const Loading = () => {
  return (
    <div className="w-7 h-7 m-5 absolute bg-white right-0 rounded-lg animate-spin"></div>
  );
};
