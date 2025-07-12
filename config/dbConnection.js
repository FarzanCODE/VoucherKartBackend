import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const connectMongoDB = async () => {
  try {
    const MONGO_URL = process.env.MONGO_DB_LOCAL_URI;
    await mongoose.connect(MONGO_URL);
    console.log("Mongo DB Connected Successfully!");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
