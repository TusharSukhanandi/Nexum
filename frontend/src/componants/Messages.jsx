import React, { useEffect, useState, useMemo, useRef } from "react";
import { useUserContext } from "../context/userContext";
import Message from "./Message";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../hooks/useSendMessage";
import useFetchMessages from "../hooks/useFetchMessages";
import { useDispatch, useSelector } from "react-redux";
import useReceiveMessage from "../hooks/useReceiveMessage";
import { useSocketContext } from "../context/socketContex";
import { clearSelectedConversation } from "../redux/slices/selectConversationSlice";
import { IoMdArrowRoundBack } from "react-icons/io";
import { addMessage } from "../redux/slices/messagesSlice";

const Messages = ({ isMobile }) => {
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

  const scrollUp = (button) => {
    // if(button){
    //   lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    //   return
    // }

    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  };

  useEffect(() => {
    scrollUp();
  }, [messages]);

  const [message, setMessage] = useState("");
  const { sendMessage } = useSendMessage();
  const { loading, fetchMessages } = useFetchMessages();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message !== "") {
      console.log(message);

      dispatch(addMessage({ message, senderId: user.userId }));

      sendMessage(message);

      setMessage("");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedConversation.userName]);

  const renderedMessages = useMemo(() => {
    return (
      messages &&
      messages.map((message) => (
        <div
          ref={lastMessageRef}
          className={`${
            message.senderId === user.userId ? "justify-end" : ""
          } px-2 flex`}
          key={message._id}
        >
          <Message
            message={message.message}
            isSent={message.senderId === user.userId ? true : false}
            time={message.createdAt}
          ></Message>
        </div>
      ))
    );
  }, [messages, selectedConversation._userName]);

  return (
    <>
      {!selectedConversation._id ? (
        <PlaceHolderComponent />
      ) : (
        <div className="sm:w-[70%] sm:h-[70dvh] h-full  ">
          <div className="flex sm:h-[15%] h-[8%] m-auto sm:w-[90%] relative p-5 justify-start items-center ">
            {isMobile ? (
              <div
                className="text-white ml-2 text-2xl"
                onClick={() => dispatch(clearSelectedConversation())}
              >
                <IoMdArrowRoundBack />
              </div>
            ) : null}
            <div className="animate-fadeIn relative text-xs text-white rounded-full w-10 ml-5 ">
              <img
                src={
                  selectedConversation && selectedConversation.profilePicture
                }
                alt="profile picture"
              />

              {isOnline && isOnline ? (
                <div className="animate-fadeIn absolute w-2 h-2 rounded-full bg-green-500 right-[2px] bottom-[2px]"></div>
              ) : null}
            </div>
            <h2 className="animate-fadeIn text-center text-white text-2xl ml-2 p-2 font-poppins">
              {" "}
              {selectedConversation && selectedConversation.userName}{" "}
            </h2>
          </div>
          {!isMobile ? (
            <div className="w-2/3 h-[1px] mt-2 mb-2 m-auto bg-white"></div>
          ) : null}

          {loading ? (
            <LoadingMessages />
          ) : (
            <div className="animate-fadeIn relative md:h-[75%] h-[78%] sm:my-0 my-2 w-[90%] mx-auto overflow-scroll no-scrollbar ">
              {renderedMessages}
              {/* scroll up button */}
              {/* <button onClick={() => scrollUp(true)} className="sticky bottom-0  w-10 h-10 bg-red-500">{">"}</button> */}
            </div>
          )}

          <form
            className="h-[8%] md:h-[12%] md:pl-2 pl-5 w-[88%] mt-2 bg-purple-600 rounded-3xl border-2 backdrop-blur-md shadow-lg border-purple-950 m-auto flex justify-evenly items-center "
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input
              className="w-[100%] sm:px-3 text-l text-white bg-transparent font-poppins focus:outline-none active:outline-none"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            ></input>

            <div
              onClick={handleSendMessage}
              className=" bg-black p-2 rounded-3xl flex justify-center items-center cursor-pointer m-2 hover:bg-purple-800 transition-all duration-500"
            >
              <button type="submit">
                {" "}
                <IoSend className="text-xl mb-1 ml-1 -rotate-[30deg] text-white" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Messages;

const PlaceHolderComponent = () => {
  const { user } = useUserContext();
  return (
    <div className="w-[70%] h-[70dvh] text-white flex justify-center items-center font-mukta ">
      <div className="mb-16 flex flex-col items-center ">
        <div className="text-6xl">Hello, {user && user.userName}</div>
        <div className="text-2xl">select someone to talk to</div>
      </div>
    </div>
  );
};

const LoadingMessages = () => {
  return (
    <div className="animate-pulse md:h-[75%] h-[78%] overflow-scroll no-scrollbar sm:my-0 my-2 w-[90%] m-auto">
      <div className="justify-end flex ">
        <div className=" p-6 px-12 m-1 rounded-3xl bg-purple-500"></div>
      </div>

      <div className="flex">
        <div className=" p-6 px-20 m-1 rounded-3xl bg-purple-500"></div>
      </div>

      <div className="justify-end flex">
        <div className=" p-6 px-12 m-1 rounded-3xl bg-purple-500"></div>
      </div>

      <div className="justify-end flex">
        <div className=" p-6 px-16 m-1 rounded-3xl bg-purple-500"></div>
      </div>

      <div className="flex">
        <div className=" p-6 px-12 m-1 rounded-3xl bg-purple-500"></div>
      </div>

      <div className="flex">
        <div className=" p-6 px-20 m-1 rounded-3xl bg-purple-500"></div>
      </div>

      <div className="justify-end flex">
        <div className=" p-6 px-12 m-1 rounded-3xl bg-purple-500"></div>
      </div>

      <div className="justify-end flex">
        <div className=" p-6 px-16 m-1 rounded-3xl bg-purple-500"></div>
      </div>

      <div className="flex">
        <div className=" p-6 px-20 m-1 rounded-3xl bg-purple-500"></div>
      </div>
      <div className="flex">
        <div className=" p-6 px-20 m-1 rounded-3xl bg-purple-500"></div>
      </div>
    </div>
  );
};
