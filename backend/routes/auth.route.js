import express from "express";

const route = express.Router();

import {verifyEmail, verifyOtp} from "../controllers/authControllers/verifyEmail.controller.js";
import signUp from "../controllers/authControllers/signUp.controller.js";
import logIn from "../controllers/authControllers/logIn.controller.js";
import logOut from "../controllers/authControllers/logOut.controller.js";

route.post("/verifyEmail", verifyEmail);
route.post("/verifyOtp", verifyOtp);
route.post("/signUp", signUp);
route.post("/logIn", logIn);
route.post("/logOut", logOut);

export default route;