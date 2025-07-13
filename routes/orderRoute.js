import express from "express";
import { placeOrder } from "../controllers/orderController.js";
const router = express.Router();

//placing order
router.post("/order", placeOrder);

export default router;
