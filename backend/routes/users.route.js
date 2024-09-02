import express from "express"

const route = express.Router();

import users from "../controllers/uesrsControllers/users.controller.js";
import verifyToken from "../utils/verifyToken.js";

route.get("/", verifyToken, users)

export default route;