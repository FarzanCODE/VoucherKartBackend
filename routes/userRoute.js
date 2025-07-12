import express from "express";
import User from "../models/user.model.js";
import { isValidObjectId } from "mongoose";
import * as dotenv from "dotenv";
import authenticateToken from "../middleware/authentication.js";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
dotenv.config();

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/user/register", registerUser);

//user login post request
router.post("/user/login", loginUser);

router.get("/user/:id", getUser);

router.get("/search/user", authenticateToken, async (req, res) => {
  const query = req.query.q;
  try {
    const users = await User.find({
      name: { $regex: String(query), $options: "i" }, // partial & case-insensitive
    });
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
});

export default router;
