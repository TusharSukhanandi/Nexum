import User from "../../models/user.model.js";
import { google } from "googleapis";
import fs from "fs"
import path from "path"

import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const profilePictureUpload = async (req, res) => {
  try {
    console.log("hello");
    
    const auth = new google.auth.GoogleAuth({
      keyFile : path.join(__dirname, "apikeys.json"),
      scopes : ["https://www.googleapis.com/auth/drive"],
    })

    const drive = google.drive({version : "v3", auth})

    const fileName = req.fileName;
    const filePath = "./backend/routes/uploads/" + fileName;

    const fileMetaData = {
      name: fileName,
      parent: [process.env.DRIVE_FOLDER_ID],
    }

    const media = {
      mimeType : req.file.mimeType,
      body: fs.createReadStream(filePath),
    }

    const response = await drive.files.create({
      resource : fileMetaData,
      media,
      fields : "id"
    })
    
    const fileId = response.data.id;

    await drive.permissions.create({
      fileId,
      requestBody : {
        role : "reader",
        type : "anyone",
      }
    })

    const imageUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=s400`;

    const insertingUrl = await User.findByIdAndUpdate(req.user._id, {profilePicture : imageUrl})

    fs.unlinkSync(filePath)

    res.status(200).json({message : "profile picture updated successfully"})

  } catch (error) {
    console.log("Error in profilePictureUpload: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default profilePictureUpload;
