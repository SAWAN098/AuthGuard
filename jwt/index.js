import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import connectToMongoDB from "./database/mongodb.js";

const app = express();
dotenv.config();

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
