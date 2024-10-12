import express from "express";

const route = express.Router();

import conversations from "../controllers/conversationsControllers/conversations.controller.js";
import verifyToken from "../utils/verifyToken.js";

route.get("/", verifyToken, conversations);

export default route;