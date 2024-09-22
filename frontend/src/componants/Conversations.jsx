import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../redux/slices/selectConversationSlice";
import useFetchConversations from "../hooks/useFetchConversations";

const Conversations = () => {
  const dispatch = useDispatch();

  const { loading, fetchConversations } = useFetchConversations();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      const conversations = await fetchConversations();
      setConversations(conversations);
    };

    getConversations();
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
