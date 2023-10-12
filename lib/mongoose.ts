import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    console.log("MISSING MONGODB_URL");
  }

  if (isConnected) {
    return console.log("=> MongoDB is already connected");
  }

  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("Missing MONGODB_URL");
    }

    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devflow",
    });

    isConnected = true;

    console.log("=> MongoDB connected");
  } catch (error) {
    console.log("=> MongoDB connection error: ", error);
  }
};
