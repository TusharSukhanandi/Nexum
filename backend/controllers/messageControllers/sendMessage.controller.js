import Conversation from "../../models/conversation.model.js";
import Message from "../../models/message.model.js";
import { getSocketId, io } from "../../socket/socket.js";

const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;
    const { message } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await new Conversation({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({ senderId, receiverId, message });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await conversation.save();

    const receiversSocketId = getSocketId(receiverId);

    if (receiversSocketId) {
      io.to(receiversSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error at send message", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default sendMessage;
