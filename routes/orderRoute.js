import express from "express";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";
import { isValidObjectId } from "mongoose";
const router = express.Router();

//placing order
router.post("/order", async (req, res) => {
  const { orderAmount, products } = req.body;
  const { id, email } = req.user;
  // need validate over products id

  try {
    // Check if user exists
    const userExists = await User.exists({ _id: id });
    if (!userExists) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    // Create order
    const order = new Order({ id, products, orderAmount });
    await order.save();
    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
