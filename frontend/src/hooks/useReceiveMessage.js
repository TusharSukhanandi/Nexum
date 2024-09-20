import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../redux/slices/messagesSlice";
import { useSocketContext } from "../context/socketContex";

const useReceiveMessage = () => {
  const { socket } = useSocketContext();
  const dispatch = useDispatch();

  useEffect(() => {
    const addNewMessage = (newMessage) => {
      dispatch(addMessage(newMessage));
    };

    socket?.on("newMessage", addNewMessage);

    return () => socket?.off("newMessage", addNewMessage);
  }, [socket]);
};

export default useReceiveMessage;
