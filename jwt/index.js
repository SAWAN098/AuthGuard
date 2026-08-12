import dotenv from "dotenv";
dotenv.config();
console.log("INDEX SECRET:", process.env.API_SECRET);
import express from "express";
import userRouter from "./routes/user.js";
import connectToMongoDB from "./database/mongodb.js";

const app = express();

app.use(express.json());
connectToMongoDB();

app.use("/api", userRouter);

process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error.message);
});

app.get("/health", (req, res) => {
  console.log("Health UP");
  res.send("Service UP");
});

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
