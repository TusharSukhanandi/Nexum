import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../../utils/generateToken.js";

const logIn = async (req, res) => {
  try {
    let { userName, password } = req.body;

    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "username and password are required " });
    }

    userName = userName.trim();
    password = password.trim();

    let user = await User.findOne({ userName });

    if (!user) {
      return res
        .status(400)
        .json({ message: "username or password is incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "username or password is incorrect" });
    }

    generateTokenAndSetCookie(user._id, res);

    return res
      .status(200)
      .json({
        message: "logged in successfully",
        userId: user._id,
        userName: user.userName,
        profilePicture: user.profilePicture
      });
  } catch (error) {
    console.log("err at login", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default logIn;
