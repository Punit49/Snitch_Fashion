import mongoose from "mongoose"
import config from "./dotenv.config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("DB Connected");
    } catch (error) {
        console.error(`Error connecting DB - ${error.message}`);
    }
}

export default connectDB