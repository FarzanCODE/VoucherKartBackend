import User from "../models/user.model.js";
import { isValidObjectId } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  // data assign
  const { name, email, phone, password } = req.body;
  // validation

  // password hashing & salting
  const hashedPassword = await bcrypt.hash(password, 10);

  // save user to db
  try {
    const user = new User({
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occured on server!" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.status(400).json({ error: "Please enter email and password." });
  }

  try {
    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "24h",
    });

    // success
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred on server!" });
  }
};

const getUser = async (req, res) => {
  const userId = req.params.id;
  if (!isValidObjectId(userId)) {
    res.status(404).json({ message: "user with id " + userId + " not found!" });
    return;
  }
  try {
    const user = await User.findById(userId).select("name email phone");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { registerUser, loginUser, getUser };
