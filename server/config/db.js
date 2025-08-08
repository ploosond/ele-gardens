import mongoose from "mongoose";
import config from "../utils/config.js";

const connectDB = async () => {
  if (!config.MONGODB_URI) {
    throw new Error("Configure the MongoDB URI properly in file .env");
  }

  return mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectDB;
