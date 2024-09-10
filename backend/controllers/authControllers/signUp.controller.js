import bcrypt from "bcrypt";
import User from "../../models/user.model.js";
import generateTokenAndSetCookie from "../../utils/generateToken.js";

const signUp = async (req, res) => {
  try {
    let { userName, password, email } = req.body;

    
    if (!userName || !password || !email) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }
    
    userName = userName.trim()
    password = password.trim()
    email = email.trim()

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "invalid email",
      });
    }
    if (!user.isVerified) {
      return res.status(400).json({
        message: "you need to validate your email first",
      });
    }

    const isUserNameAvailable = await User.findOne({ userName });

    if (isUserNameAvailable) {
      return res.status(400).json({
        message: "user name already exists",
      });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    user.userName = userName;
    user.password = hashedPassword;

    user.save();

    // generateTokenAndSetCookie(user._id, res);

    return res.status(201).json({
      message: "user created, signed up",
      userId: user._id,
      userName,
    });
  } catch (err) {
    console.log("error at sign Up", err);
    return res.status(500).json({message : "Internal server error"});
  }
};

export default signUp;
