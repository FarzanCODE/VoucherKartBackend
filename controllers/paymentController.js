import Payment from "../models/payment.model.js";
import Transaction from "../models/transaction.model.js";
import * as dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const addPayment = async (req, res) => {
  try {
    const { paymentType, amount, orderId } = req.body;
    const { id, email } = req.user;
    // Need to add validations for paymentType and amount
    const validPaymentTypes = ["CASH", "CARD", "UPI", "WALLET"];
    if (!paymentType || !validPaymentTypes.includes(paymentType)) {
      return res.status(400).json({
        message: `Invalid payment type. Allowed: ${validPaymentTypes.join(
          ", "
        )}`,
      });
    }
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number." });
    }
    const payment = new Payment({
      paymentType: paymentType,
      amount: amount,
    });
    await payment.save();
    // need to create a transaction record in transactions collection
    const transaction = new Transaction({
      paymentId: payment._id,
      amount: amount,
      orderId: orderId,
      userId: id,
      transactionStatus: "inProcess",
    });
    await transaction.save();
    res.status(201).json(payment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export { addPayment };
