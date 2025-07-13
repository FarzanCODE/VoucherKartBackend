import express from "express";
import { addToCart, showCart } from "../controllers/cartController.js";
const router = express.Router();

router.post("/cart", addToCart);

router.get("/carts", showCart);

export default router;
