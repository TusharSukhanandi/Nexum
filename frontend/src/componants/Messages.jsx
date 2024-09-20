import React, { useEffect, useState, useRef } from "react";
import { useUserContext } from "../context/userContext";
import Message from "./Message";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../hooks/useSendMessage";
import useFetchMessages from "../hooks/useFetchMessages";
import { useDispatch, useSelector } from "react-redux";
import useReceiveMessage from "../hooks/useReceiveMessage";
import { useSocketContext } from "../context/socketContex";
import { clearSelectedConversation } from "../redux/slices/selectConversationSlice";

const Messages = ({isMobile}) => {
  
  const { user } = useUserContext();

  useReceiveMessage();

  const messages = useSelector((state) => state.messages);

  const dispatch = useDispatch();

  const selectedConversation = useSelector(
    (state) => state.selectConversation.selectedConversation
  );

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedConversation._id);

  const lastMessageRef = useRef();

  const scrollUp = () => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 10);
  };

  useEffect(() => {
    scrollUp();
  }, [messages]);

  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const { fetchMessages } = useFetchMessages();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message !== "") {
      sendMessage(message);
      setMessage("");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedConversation.userName]);

  return (
    <div className="sm:w-[70%] sm:h-[70dvh] h-full  ">
      <div className="flex sm:h-[15%] h-[10%] sm:w-[90%] relative  m-auto justify-start items-center  ">
        {isMobile ? <div
          className="text-white ml-6 text-3xl"
          onClick={() => dispatch(clearSelectedConversation())}
        >
          {"<"}
        </div> : null}
        <div className="animate-fadeIn relative rounded-full w-10 ml-5 ">
          <img
            src={selectedConversation && selectedConversation.profilePicture}
            alt="profile picture"
          />

          {isOnline && isOnline ? (
            <div className="absolute w-2 h-2 rounded-full bg-green-500 right-[2px] bottom-[2px]"></div>
          ) : null}
        </div>
        <h2 className="text-center text-white text-2xl ml-2 p-2 font-poppins">
          {" "}
          {selectedConversation && selectedConversation.userName}{" "}
        </h2>
      </div>
      <div className="h-[70%] sm:my-0 my-2 w-[90%] m-auto overflow-scroll no-scrollbar ">
        {messages &&
          messages.map((message) => (
            <div
              ref={lastMessageRef}
              className={`${
                message.senderId === user.userId ? "justify-end" : ""
              } px-2 flex`}
              key={message._id}
            >
              <Message message={message.message}></Message>
            </div>
          ))}
      </div>

      <form className="h-[15%] w-[90%] m-auto flex justify-evenly items-center ">
        <input
          className="w-[80%] sm:px-3 sm:py-1 p-3 text-white border-b-2 border-purple-500 bg-transparent font-poppins"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        ></input>

        <div className="sm:mt-2">
          <button type="submit" onClick={handleSendMessage}>
            {" "}
            <IoSend className="text-3xl text-white hover:text-purple-600 transition-all" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Messages;
