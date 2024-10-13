import express from "express"

const router = express.Router()

import verifyToken from "../utils/verifyToken.js"
import users from "../controllers/usersControllers/users.controller.js"

router.get("/users" , users)

export default router