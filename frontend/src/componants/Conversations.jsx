import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import { useDispatch } from "react-redux";
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
    <div className="w-full mt-7">
      {conversations && conversations.map((conversation) => (
        <div
          className=""
          onClick={() => {
            dispatch(
              setSelectedConversation({
                _id: conversation._id,
                userName: conversation.userName,
                 profilePicture : conversation.profilePicture
              })
            );
          }}
          key={conversation._id}
        >
          <Conversation
           conversation={conversation}
          ></Conversation>
          <div className=""></div>
        </div>
      ))}
    </div>
  );
};

export default Conversations;
