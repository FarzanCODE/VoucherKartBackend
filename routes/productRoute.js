import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  searchProduct,
  showProducts,
  updateProduct,
} from "../controllers/productController.js";
const router = express.Router();

router.post("/product/add", addProduct);

router.get("/product/:id", getProductById);

router.get("/products", showProducts);

router.put("/update/:id", updateProduct);

router.delete("/delete/:id", deleteProduct);

router.get("/search/product", searchProduct);

export default router;
