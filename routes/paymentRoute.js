import express from "express";
import { addPayment } from "../controllers/paymentController.js";
const router = express.Router();

router.post("/payment", addPayment);

export default router;
