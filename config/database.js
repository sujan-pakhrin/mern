import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.error(` MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};
connectDB()
    .then(() => {
        console.log("Database connection established successfully.");
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });

export default connectDB;
