import Transaction from "../models/transaction.model.js";
import { isValidObjectId } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const showTransactions = async (req, res) => {
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
};

const transactionById = async (req, res) => {
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
};

const updateTransaction = async (req, res) => {
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
};

export { showTransactions, transactionById, updateTransaction };
