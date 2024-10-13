import React, { useEffect, useRef, useState } from "react";
import Conversation from "./Conversation";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../redux/slices/selectConversationSlice";
import { setConversations } from "../redux/slices/conversationsSlice";
import useFetchConversations from "../hooks/useFetchConversations";

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
        <Loading />
      ) : (
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
      )}
    </>
  );
};

const Loading = () => {
  return (
    <div className="w-full h-auto mt-6 text-white">
      <PlaceHolderConversation />
      <PlaceHolderConversation />
      <PlaceHolderConversation />
      <PlaceHolderConversation />
    </div>
  );
};

const PlaceHolderConversation = () => {
  return (
    <div className="animate-pulse text-center bg-purple-400 opacity-15  w-[90%] m-auto rounded-lg text-white h-16 sm:h-14 text-xl mt-2"></div>
  );
};

export default Conversations;
