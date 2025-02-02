import React, { useEffect, useState } from 'react'
import ConversationSideBar from "./ConversationSideBar";
import Messages from "./Messages";
import { useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import ProfileIcon from "./ProfileIcon";
import LogOut from "./LogOut";
import ProfileScreen from "./ProfileScreen"

const SubChat = ({setIsMobileForPage}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleWindowResize = () => {
      const currentWidth = window.innerWidth;
      setIsMobile(currentWidth < 600);
      setIsMobileForPage(currentWidth < 600);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const { selectedConversation } = useSelector(
    (state) => state.selectConversation
  );

    const profileScreen = useSelector((state => state.profileScreen))


  return (
    <div
        className={`${profileScreen ? "md:animate-shrinkExpand" : "md:w-[80%] "}  m-auto sm:mt-12 bg-[#D9D9D9] md:rounded-3xl rounded-t-3xl md:h-[78vh] sm:flex ${
          isMobile && selectedConversation && !selectedConversation._id
            ? "h-[80dvh]"
            : "h-[90dvh]"
        }`}
      >
        {
            profileScreen ? <ProfileScreen/> : (isMobile ? (
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
              ))
        }
        
        
      </div>
  )
}

export default SubChat