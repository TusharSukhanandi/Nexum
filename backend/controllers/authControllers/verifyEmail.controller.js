import sendMail from "../../sendMail/sendMail.js";
import User from "../../models/user.model.js";
import generateTokenAndSetCookie from "../../utils/generateToken.js";

const generateOtp = (length = 6) => {
  let otp = Math.floor(Math.random() * Math.pow(10, length)).toString();
  return Number(otp.padEnd(length, "0"));
};

const generateOtpExpiryTime = () => {
  return new Date(Date.now()); // Current time
};

// const sendOtpAndMakeNewUser = async () => {

// }

const verifyEmail = async (req, res) => {
  try {
    let { email } = req.body;
    console.log(req.body);

    if (!email) {
      return res.status(400).json({ message: "e-mail is required" });
    }

    console.log(email);

    email = email.trim();

    const isEmailAvailable = await User.findOne({ email });

    if (isEmailAvailable) {
      return res.status(400).json({ message: "email already exits" });
    }

    let otp = generateOtp();
    let otpCreatedAt = generateOtpExpiryTime();

    const newUser = await User.create({ email, otp, otpCreatedAt });

    if (!newUser) {
      return res.status(400).json({
        message: "somthing went wrong",
        isOtpSent: false,
      });
    }

    let isMailSent = sendMail(email, otp);

    if (!isMailSent) {
      return res.status(400).json({
        message: "E-mail is invalid",
        isOtpSent: false,
      });
    }

    return res
      .status(200)
      .json({ message: "otp sent to email successfully", isOtpSent: true });
    return res
      .status(200)
      .json({ message: "otp sent to email successfully", isOtpSent: true });
  } catch (err) {
    console.log("err at email", err);

    return res.status(500).json({ message: "Tnternal server error" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    let { email, otp: inputedOtp } = req.body;
console.log("validatiing");

    if (!email || !inputedOtp) {
      return res
        .status(400)
        .json({ message: "please provide needed credentials" });
    }

    email = email.trim();

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "email is incorrect", isOtpCorrect: false });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ message: "your email is validated", isOtpCorrect: true });
    }

    // if (user && !user.isVerified && user.otp) {
    //   user.otp = undefined;
    //   user.otpCreatedAt = undefined;

    //   let otp = generateOtp();
    //   let otpCreatedAt = generateOtpExpiryTime();

    //   let isMailSent = await sendMail(email, otp);

    //   if (!isMailSent) {
    //     return res.status(400).json({
    //       message: "E-mail is invalid",
    //       isOtpSent: false,
    //     });
    //   }

    //   user.otp = otp;
    //   user.otpCreatedAt = otpCreatedAt;
      
    //   await user.save()
      
    //   return res
    //   .status(200)
    //   .json({ message: "otp sent to email successfully", isOtpSent: true });

    // }

    const now = new Date();
    const otpAge = now - new Date(user.otpCreatedAt);

    if (otpAge > 5 * 60 * 1000) {
      // if otpAge is bigger than 5 minutes
      return res
        .status(400)
        .json({ message: "otp is expired", isOtpCorrect: false });
    }

    if (user.otp == inputedOtp) {
      user.otp = undefined;
      user.isVerified = true;
      user.otpCreatedAt = undefined;
      user.save();
      return res
        .status(200)
        .json({ message: "otp validated successfully", isOtpCorrect: true });
    }

    return res
      .status(400)
      .json({ message: "otp is incorrect", isOtpCorrect: false });
  } catch (err) {
    console.log("err at otp", err);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export { verifyEmail, verifyOtp };
