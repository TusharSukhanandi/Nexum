import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyToken = async (req, res, next) => {
  const {NexumJwt : token } = req.cookies;

  try{
  if (!token) {
    return res.status(401).json({ error : "unauthorized access - No token provided" });
  }

  const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

  
  if (!verifyToken) {
    return res.status(401).json({ error : "unauthorized access - Invalid Token" });
  }

  const user = await User.findById(verifyToken.userId).select("-password")

  if(!user){
    return res.status(400).json({error : "user not found"})
  }
  
  req.user = user;

  next();
}catch (error){
  console.log(error)
}
};

export default verifyToken;
