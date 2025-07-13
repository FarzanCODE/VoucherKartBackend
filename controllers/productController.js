import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Category from "../models/categories.model.js";
import { isValidObjectId } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const addProduct = async (req, res) => {
  const {
    productName,
    price,
    description,
    quantity,
    productDetails,
    sellerId,
    categoryId,
  } = req.body;
  if (!isValidObjectId(sellerId)) {
    res
      .status(404)
      .json({ message: "user with id " + sellerId + " not found!" });
    return;
  }
  if (!isValidObjectId(categoryId)) {
    res
      .status(404)
      .json({ message: "category with id " + categoryId + " not found!" });
    return;
  }
  const user = await User.findById(sellerId);
  if (!user) {
    res.status(404).json({ message: "user is not registered" });
    return;
  }
  const category = await Category.findById(categoryId);
  if (!category) {
    res.status(404).json({ message: "not a category" });
    return;
  }
  try {
    const product = new Product({
      productName: productName,
      price: price,
      description: description,
      quantity: quantity,
      productDetails: productDetails,
      sellerId: sellerId,
      categoryId: categoryId,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occured on server!" });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  if (!isValidObjectId(productId)) {
    res
      .status(404)
      .json({ message: "product with id " + productId + " not found!" });
    return;
  }
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const showProducts = async (req, res) => {
  const product = Product.find({});
  if (!product) {
    res.status(404).json({ message: "product not found!" });
    return;
  }
  try {
    const product = await Product.find({});
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  // Validate ObjectId
  if (!isValidObjectId(productId)) {
    return res
      .status(400)
      .json({ message: `Invalid product ID: ${productId}` });
  }
  try {
    // Try updating the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: req.body }, // taking updated fields from request body
      { new: true, runValidators: true } // return the updated doc, validate schema
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  // Validate ObjectId
  if (!isValidObjectId(productId)) {
    return res
      .status(400)
      .json({ message: `Invalid product ID: ${productId}` });
  }
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const searchProduct = async (req, res) => {
  const query = req.query.q;
  try {
    const products = await Product.find({
      productName: { $regex: String(query), $options: "i" }, // partial & case-insensitive
      description: { $regex: String(query), $options: "i" },
    });
    if (products.length === 0 || query.trim() === "") {
      return res.status(404).json({ message: "No products found" });
    }
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};

export {
  addProduct,
  getProductById,
  showProducts,
  updateProduct,
  deleteProduct,
  searchProduct,
};
