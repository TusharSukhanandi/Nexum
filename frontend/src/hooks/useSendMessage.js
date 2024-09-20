import React, { useState } from "react";
import { useToastContext } from "../context/toastContext";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import { addMessage } from "../redux/slices/messagesSlice";


const useSendMessage = () => {
  const showToast = useToastContext();

  const selectedConversation = useSelector(
    (state) => state.selectConversation.selectedConversation
  );

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    setLoading(true)
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL +
          "/message/send/" +
          selectedConversation._id,
        {
          message,
        },
        { withCredentials: true }
      );   
      if(response){
        dispatch(addMessage(response.data))
      }
    } catch (error) {
      console.log("error at send message");
      showToast(error?.response?.data?.message);
    }finally{
        setLoading(false)
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
