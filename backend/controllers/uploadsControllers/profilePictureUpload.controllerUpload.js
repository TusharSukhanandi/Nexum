import User from "../../models/user.model.js";
import { google } from "googleapis";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createCredentialFile = (credentialFileName) => {

  console.log("fileCreated");
  
  const credentials = Buffer.from(
    process.env.GOOGLE_CREDENTIALS_BASE64,
    "base64"
  ).toString("utf-8");

  const tempFilePath = path.join(__dirname, credentialFileName);

  fs.writeFileSync(tempFilePath, credentials);

  return tempFilePath
}

const profilePictureUpload = async (req, res) => {
  try {
    
    const credentialFileName = "google_credentials.json";

    if (fs.existsSync(path.join(__dirname, credentialFileName))) {
      null
    }else{
      createCredentialFile(credentialFileName)
    }

  
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, credentialFileName),
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const drive = google.drive({ version: "v3", auth });

    const fileName = req.fileName;
    const filePath = "./backend/routes/uploads/" + fileName;

    const fileMetaData = {
      name: fileName,
      parent: [process.env.DRIVE_FOLDER_ID],
    };

    const media = {
      mimeType: req.file.mimeType,
      body: fs.createReadStream(filePath),
    };

    const response = await drive.files.create({
      resource: fileMetaData,
      media,
      fields: "id",
    });

    const fileId = response.data.id;

    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const imageUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=s400`;

    const insertingUrl = await User.findByIdAndUpdate(req.user._id, {
      profilePicture: imageUrl,
    });

    fs.unlinkSync(filePath);

    res.status(200).json({
      message: "profile picture updated successfully",
      newUrl: imageUrl,
    });
  } catch (error) {
    console.log("Error in profilePictureUpload: ", error);
    res.status(500).json({ error: "Internal server error" , error});
  }
};

export default profilePictureUpload;
