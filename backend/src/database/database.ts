import mongoose from "mongoose";
const validator = require("validator");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL + process.env.DB_NAME);
    console.log("Connected to blogoo");
  } catch (error) {
    console.log(error);
  }
};

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],
    unique: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"],
    validate(value: string) {
      if (!validator.isAlpha(value)) {
        throw new Error("Name must only contains alphabetic characters");
      }
    },
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required"],
    minLength: [
      8,
      "Error: Password must be greater than or equal to 8 characters.",
    ],
  },
});

const blogSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Title is required"],
    maxLength: [
      255,
      "Error: Summary must be less than or equal to 255 characters.",
    ],
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "Summary is required"],
  },
  author_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const likesSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  blog_id: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
  },
  liked_at: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);
const User = mongoose.model("User", userSchema);
const Like = mongoose.model("Likes", likesSchema);

module.exports = { dbConnection, Blog, User, Like };
