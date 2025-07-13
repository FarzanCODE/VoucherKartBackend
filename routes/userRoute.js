import express from "express";
import * as dotenv from "dotenv";
import authenticateToken from "../middleware/authentication.js";
import {
  getUser,
  loginUser,
  registerUser,
  searchUser,
} from "../controllers/userController.js";
dotenv.config();

const router = express.Router();

router.post("/user/register", registerUser);

//user login post request
router.post("/user/login", loginUser);

router.get("/user/:id", getUser);

router.get("/search/user", authenticateToken, searchUser);

export default router;
