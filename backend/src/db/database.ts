import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";

const dbConnect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DB_URL + process.env.DB_NAME);
  } catch (error) {
    console.log("🚀 ~ file: database.ts ~ error:", error);
  }
};

interface admin {
  name: string;
  email: string;
  key: string;
  blog_categories: string[];
}

const adminSchema = new mongoose.Schema<admin>({
  name: {
    type: String,
    default: "admin",
  },
  email: {
    type: String,
    required: true,
    default: "admin@getMaxListeners.com",
    validate: function (email: string) {
      if (!isEmail(email)) {
        throw new Error("Invalid email");
      }
    },
  },
  key: {
    type: String,
    default: "123456789",
  },
  blog_categories: [String],
}, {timestamps: true});

interface user {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

const userSchema = new mongoose.Schema <user>({
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],
    unique: true,
    validate: function (email: string) {
      if (!isEmail(email)) {
        throw new Error("Invalid email");
      }
    },
  },
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"],
    minlength: [6, "Name must be at least 6 characters"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [8, "Password must be at least 8 characters"],
  },
  avatar: {
    type: String,
    default: "unknown",
  },
}, {timestamps: true});

interface blog {
  title: string,
  summary: string,
  content: string,
  author_name: mongoose.Schema.Types.ObjectId,
  categories: string[],
  hidden: boolean,
  reports: mongoose.Schema.Types.ObjectId[]
}

const blogSchema = new mongoose.Schema <blog>({
  title: {
    type: String,
    trim: true,
    required: [true, "Title is essential"],
    maxlength: [50, "Title must be less then 50 characters"],
    unique: true,
  },
  summary: {
    type: String,
    trim: true,
    maxlength: [200, "Summary must be less then 200 characters"],
  },
  content: {
    type: String,
    required: true,
  },
  author_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  categories: {
    type: [String],
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  reports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
    },
  ],
}, {timestamps: true});

interface like {
  user: mongoose.Schema.Types.ObjectId,
  blog: mongoose.Schema.Types.ObjectId,
} 

const likeSchema = new mongoose.Schema <like>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
}, {timestamps: true});

interface report {
  report_message: string,
  reporter: mongoose.Schema.Types.ObjectId,
}

const reportSchema = new mongoose.Schema({
  report_message: {
    type: String,
    require: true,
    max: [200, "Summary must be less then 200 characters"],
  },
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Admin = mongoose.model("Admin", adminSchema);
const User = mongoose.model("User", userSchema);
const Blog = mongoose.model("Blog", blogSchema);
const Like = mongoose.model("Like", likeSchema);
const Report = mongoose.model("Report", reportSchema);

export default dbConnect;
export { Admin, User, Blog, Like, Report };
