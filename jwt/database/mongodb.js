// connect to mongoDB here

// import the mongoose here
import mongoose from "mongoose";

// this function connects to mongodb here
export default async () => {
  // construct the mongoDB URI -  "mongodb://localhost:27017/todos"
  const mongoURI = `${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`;

  await mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.log("MongoDB connection error", err);
    });
};
