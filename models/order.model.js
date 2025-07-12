import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  orderAmount: {
    type: mongoose.Schema.Types.Double,
    require: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const Order = new mongoose.model("Order", orderSchema);

export default Order;
