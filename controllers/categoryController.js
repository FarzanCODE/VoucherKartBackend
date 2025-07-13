import Category from "../models/categories.model.js";
import { isValidObjectId } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const addCategory = async (req, res) => {
  const { categoryName, categoryDescription } = req.body;
  try {
    const category = new Category({
      categoryName: categoryName,
      categoryDescription: categoryDescription,
    });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occured on server!" });
  }
};

const showCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const categoryById = async (req, res) => {
  const categoryId = req.params.id;
  if (!isValidObjectId(categoryId)) {
    return res
      .status(400)
      .json({ message: `Invalid category ID: ${categoryId}` });
  }
  try {
    // Find the category
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "No such category exists" });
    }
    // Find products that belong to this category
    const products = await Product.find({ categoryId });
    res.status(200).json({
      category,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { addCategory, showCategories, categoryById };
