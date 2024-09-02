import express from "express";

const route = express.Router();

import verifyToken from "../utils/verifyToken.js";
import sendMessage from "../controllers/messageControllers/sendMessage.controller.js";
import getMessages from "../controllers/messageControllers/getMessages.controller.js";

route.post("/send/:id", verifyToken, sendMessage);
route.get("/get/:id", verifyToken, getMessages);

export default route