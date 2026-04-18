import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";

const app = express();

app.use(express.json());

dotenv.config();

app.use("/api", userRouter);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
