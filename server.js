import express from "express";
import connectMongoDB from "./config/dbConnection.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import transactionRoute from "./routes/transactionRoute.js";

import * as dotenv from "dotenv";
import authenticateToken from "./middleware/authentication.js";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", userRoute);

app.use(authenticateToken);

app.use("/api", productRoute);
app.use("/api", categoryRoute);
app.use("/api", cartRoute);
app.use("/api", orderRoute);
app.use("/api", paymentRoute);
app.use("/api", transactionRoute);

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h1>Voucher App!!!</h1>");
});

app.listen(port, () => {
  connectMongoDB();
  console.log("Server started on port = " + port);
});
