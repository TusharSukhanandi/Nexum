import Conversation from "../../models/conversation.model.js";

const getMessages = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { id: userToChatId } = req.params;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages;

    return res.status(200).json(messages);
  } catch (err) {
    console.log("err at get messages", err);
    res.send(500).json({ message: "Internal server error" });
  }
};

export default getMessages;
