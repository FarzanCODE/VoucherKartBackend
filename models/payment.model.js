import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  paymentType: {
    type: String,
    required: true,
  },
  amount: {
    type: mongoose.Schema.Types.Double,
    required: true,
  },
});

const Payment = new mongoose.model("Payment", paymentSchema);

export default Payment;
