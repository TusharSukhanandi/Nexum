import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const route = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`
    req.fileName = fileName
    cb( null, fileName)
  },
});

const upload = multer({storage})

import verifyToken from "../utils/verifyToken.js";
import profilePictureUpload from "../controllers/uploadsControllers/profilePictureUpload.controllerUpload.js";

route.post("/ProfilePicture", verifyToken, upload.single("profilePicture"), profilePictureUpload);

export default route;
