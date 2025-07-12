import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  categoryDescription: {
    type: String,
    required: true,
    minLength: 10,
  },
});

const Category = new mongoose.model("Category", categorySchema);

export default Category;
