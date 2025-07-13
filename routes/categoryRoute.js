import express from "express";
import {
  addCategory,
  categoryById,
  showCategories,
} from "../controllers/categoryController.js";
const router = express.Router();

router.post("/category", addCategory);

router.get("/category", showCategories);

router.get("/categories/:id", categoryById);

export default router;
