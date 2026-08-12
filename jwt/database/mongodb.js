// connect to mongoDB here

// import the mongoose here
import mongoose from "mongoose";

// this function connects to mongodb here
export default async () => {
  // construct the mongoDB URI
  const mongoURI = process.env.MONGODB_URI || `mongodb://localhost:27017/authguard`; // or we can constrcut the URI using host , port and db name from the env file like this : `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}` 


  try {
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected successfully");
    console.log("Connected to:", mongoURI);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};
