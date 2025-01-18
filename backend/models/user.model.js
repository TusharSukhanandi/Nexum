import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
 
  userName: {
    type: String,
  },

  password: {
    type: String,
    minlength: 8,
  },

  email:{
    type: String,
    required: true,
  },

  otp : {
    type: Number,
  },

  otpCreatedAt: {
    type: Date,
  },

  isVerified: {
    type: Boolean,
    default : false
  },

  profilePicture : {
    type : String,
    default: "",
  },
}, {timestamps : true});

const User = mongoose.model("User", userSchema);

export default User;
