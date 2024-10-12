import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMessages } from "../redux/slices/messagesSlice";

const useFetchMessages = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { selectedConversation } = useSelector(
    (state) => state.selectConversation
  );

  const fetchMessages = async () => {
    if (!selectedConversation._id) {
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        import.meta.env.VITE_API_URL +
          "/message/get/" +
          selectedConversation?._id,
        { withCredentials: true }
      );
      dispatch(setMessages(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  return { loading, fetchMessages };
};

export default useFetchMessages;
