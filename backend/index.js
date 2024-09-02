import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectToMongoDB from "./db/connectToDataBase.js";
import authRoute from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js"
import usersRoute from "./routes/users.route.js"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cookieParser())

app.use("/auth", authRoute);
app.use("/message", messageRoute);
app.use("/users", usersRoute);


app.listen(PORT, () => {
    connectToMongoDB()
    console.log(`server is alive at ${PORT}`);
})

 