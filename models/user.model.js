import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 10,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = new mongoose.model("User", userSchema);

export default User;
