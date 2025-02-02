import { useEffect, useState } from "react";
import Background from "../../componants/Background";
import Header from "../../componants/Header";
import SearchUsers from "../../componants/SearchUsers";
import SubChat from "../../componants/SubChat";
import { useSelector } from "react-redux";

const Chat = () => {
  const [showSerach, setShowSearch] = useState(false);
  const [isMobile, setIsMobileForPage] = useState(window.innerWidth < 600);

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
     
     <SubChat setIsMobileForPage={setIsMobileForPage}/>
      
    </Background>
  );
};

export default Chat;
