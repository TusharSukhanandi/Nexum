import React, { useEffect, useRef, useState } from "react";
import Conversation from "./Conversation";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../redux/slices/selectConversationSlice";
import { setConversations } from "../redux/slices/conversationsSlice";
import useFetchConversations from "../hooks/useFetchConversations";
import LoadingConversation from "./LoadingConversation";

const Conversations = () => {
  const { loading, fetchConversations } = useFetchConversations();

  // using redux because conversations were refetched on mobile because this component was getting unmounted when one of conversations was getting selected

  const dispatch = useDispatch();

  const conversations = useSelector((state) => state.conversations);

  const getConversations = async () => {
    const conversations = await fetchConversations();
    dispatch(setConversations(conversations));
  };

  useEffect(() => {
    if (conversations.length == 0) {
      getConversations();
    }
  }, []);

  return (
    <>
      {loading ? (
        <LoadingConversation />
      ) : conversations.length > 0 ? (
        <div className="w-full mt-7">
          {conversations &&
            conversations.map((conversation) => (
              <div
                className=""
                onClick={() => {
                  dispatch(
                    setSelectedConversation({
                      _id: conversation._id,
                      userName: conversation.userName,
                      profilePicture: conversation.profilePicture,
                    })
                  );
                }}
                key={conversation._id}
              >
                <Conversation conversation={conversation}></Conversation>
                <div className=""></div>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-white text-2xl flex flex-col gap-2 justify-center items-center w-full h-[50dvh] text-center font-poppins">You don't have any conversations yet, <div>search user by username</div></div>
      )}
    </>
  );
};

export default Conversations;
