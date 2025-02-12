import { useEffect, useState } from "react";
import Background from "../../componants/Background";
import Header from "../../componants/Header";
import SubChat from "../../componants/SubChat";
import { useSelector } from "react-redux";


const Chat = () => {
  const [isMobile, setIsMobileForPage] = useState(window.innerWidth < 600);

  const { selectedConversation } = useSelector(
    (state) => state.selectConversation
  );


  return (
    <Background>
   

      <Header
        height={
          isMobile && selectedConversation && !selectedConversation._id
            ? "h-[20dvh]"
            : "h-[10dvh]"
        }
      />
      {/* //subBackground */}
     
     <SubChat setIsMobileForPage={setIsMobileForPage}/>
      
    </Background>
  );
};

export default Chat;
