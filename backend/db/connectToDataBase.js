import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Naxum")
        console.log("connnected to mongoDB");
        
    } catch (error) {
        console.log("error in connecting database", error);
    }
}

export default connectToMongoDB;