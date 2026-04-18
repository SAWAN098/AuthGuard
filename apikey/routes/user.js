import express from "express";
import create_user_controller from "../controllers/createuser.js";
import authenticate_user from "../middleware/authenticateuser.js";
import get_user_data from "../controllers/getuser.js";

const router = express.Router();

router.post("/register", create_user_controller);

// protected routes
router.get("/user", authenticate_user, get_user_data);

export default router;
