import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./userContext";
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([])
  const { user } = useUserContext();

  useEffect(() => {
      
      if (user) {
      const socket = io(import.meta.env.VITE_API_URL, {
        query: {  
          userId: user.userId
        }
      });

      socket.on("onlineUsers", (onlineUsers) => {
        setOnlineUsers(onlineUsers)
      })

      setSocket(socket);

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
