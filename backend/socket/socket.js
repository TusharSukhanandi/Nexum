import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();

console.log(process.env.CORS_ORIGIN_URL);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const userIdAndSocketId = {};

export const getSocketId = (receiverId) => {
    return userIdAndSocketId[receiverId]
}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
 
  if (userId != "undefined") {
    userIdAndSocketId[userId] = socket.id;
  }

  io.emit("onlineUsers", Object.keys(userIdAndSocketId));

  socket.on("disconnect", () => {
  
    delete userIdAndSocketId[userId];
    io.emit("onlineUsers", Object.keys(userIdAndSocketId));
  });
});

export { app, io, server };