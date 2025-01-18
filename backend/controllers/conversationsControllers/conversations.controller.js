import Conversation from "../../models/conversation.model.js"

const conversations = async (req, res) => {
   
    const senderId = req.user._id
    const loggedInUserName = req.user.userName

    const users = await Conversation.find({
        "participants" : senderId,
    }).populate( {path: "participants",
        select: "_id userName profilePicture",} )

    const filteredUsers = []
    users.map((user) => {
        user.participants.map(participant => {
            if(participant.userName !== loggedInUserName){
                filteredUsers.push(participant)
            }
        })
    })

    res.send(filteredUsers)
}

export default conversations