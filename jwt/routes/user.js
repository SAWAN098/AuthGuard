import express from "express";
import register_controller from "../controllers/register.js";
import login_controller from "../controllers/login.js";
import { verifyJWTToken } from "../middleware/verifytoken.js";

const router = express.Router();

router.post("/register", register_controller);

router.post("/login", login_controller);

// protected routes
router.get("/protected-route", verifyJWTToken, (req, res) => {
  console.log("protected route hit", req.user);
  res.status(200).send({
    message:
      "success, JWT token is valid and you are authorized to access this route ",
    data: req.user,
  });
});

export default router;
