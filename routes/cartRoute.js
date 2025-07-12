import express from "express";
import Cart from "../models/cart.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import { isValidObjectId } from "mongoose";
const router = express.Router();

router.post("/cart", async (req, res) => {
  const { userId, productId } = req.body;

  if (!isValidObjectId(userId)) {
    res.status(404).json({ message: "user with id " + userId + " not found!" });
    return;
  }

  if (!isValidObjectId(productId)) {
    res
      .status(404)
      .json({ message: "product with id " + productId + " not found!" });
    return;
  }

  if (!userId || !productId) {
    return res
      .status(400)
      .json({ message: "userId and productId are required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartItem = new Cart({
      userId,
      productId,
    });

    await cartItem.save();

    res.status(201).json({
      message: "Item added to cart successfully",
      cartItem,
    });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/carts", async (req, res) => {
  try {
    const cart = await Cart.find({});
    if (!cart) {
      res.status(404).json({ message: "cart is empty" });
      return;
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
