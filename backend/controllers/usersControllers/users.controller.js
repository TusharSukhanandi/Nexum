import User from "../../models/user.model.js"

const users = async (req, res) => {

    try {
		const loggedInUserId = req.user;
        
		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password" && "-email");

		res.status(200).json(filteredUsers);
	} catch (error) {	
		console.log("Error in users: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

export default users