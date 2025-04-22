import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DBconnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        // console.log("Mongo URI:", process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default DBconnection;