import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectToDatabase = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected successfully!! DB HOST ${connectionInstance.connection.host} DB NAME ${connectionInstance.connection.name} \n`
    );
  } catch (error) {
    console.log("Q Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectToDatabase;
