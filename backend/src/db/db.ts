import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const DB_URL: string =
  process.env.ENVIRONMENT == "production"
    ? (process.env.DB_URL as string)
    : "mongodb://localhost:27017/fb-clone";

const connectDB = async () => {
  await mongoose.connect(DB_URL);
  console.log("connection established");
};

connectDB();
