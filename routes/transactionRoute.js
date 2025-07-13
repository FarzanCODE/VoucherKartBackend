import express from "express";
import {
  showTransactions,
  transactionById,
  updateTransaction,
} from "../controllers/transactionController.js";
const router = express.Router();

//get all transactions from logged-in user
router.get("/transactions", showTransactions);

// Get a single transaction by ID
router.get("/transactions/:transactionId", transactionById);

router.patch("/transactions/:transactionId", updateTransaction);

export default router;
