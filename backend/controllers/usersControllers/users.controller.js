import User from "../../models/user.model.js"

const users = async (req, res) => {

    const {userName, limit} = req.query;
    console.log(req.query);
    
    if(!userName || !limit){
        return res.status(400).json({error : "please provide important credentials"})
    }

    const findingUsers = await User.find({ userName });
    console.log(findingUsers);
    

}

export default users