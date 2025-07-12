import express from "express";
import Transaction from "../models/transaction.model.js";
import { isValidObjectId } from "mongoose";
const router = express.Router();

//get all transactions from logged-in user
router.get("/transactions", async (req, res) => {
  try {
    const { id } = req.user;

    const transactions = await Transaction.find({ userId: id })
      .populate("orderId", "products orderAmount")
      .populate("paymentId", "paymentType amount")
      .sort({ date: -1 });

    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single transaction by ID
router.get("/transactions/:transactionId", async (req, res) => {
  try {
    const { transactionId } = req.params;
    if (!isValidObjectId(transactionId)) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }
    const transaction = await Transaction.findById(transactionId)
      .populate("orderId", "products orderAmount")
      .populate("paymentId", "paymentType amount");
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/transactions/:transactionId", async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { transactionStatus } = req.body;
    if (!isValidObjectId(transactionId)) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }
    const updated = await Transaction.findByIdAndUpdate(
      transactionId,
      { transactionStatus },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
