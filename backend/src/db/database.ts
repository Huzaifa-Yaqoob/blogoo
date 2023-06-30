import { Schema, model, connect } from "mongoose";
import isEmail from "validator/lib/isEmail";
import getCategories from "./getCategories";

const dbConnect = async (): Promise<void> => {
  try {
    await connect(process.env.DB_URL + process.env.DB_NAME);
  } catch (error) {
    console.log("🚀 ~ file: database.ts ~ error:", error);
  }
};

interface admin {
  user_id: Schema.Types.ObjectId;
  key: string;
}

const adminSchema = new Schema<admin>(
  {
    key: {
      type: String,
      default: "HUKAM",
    },
  },
  { timestamps: true }
);

interface user {
  username: string;
  email: string;
  password: string;
  avatar: string;
}

const userSchema = new Schema<user>(
  {
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
    username: {
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
  },
  { timestamps: true }
);

interface blog {
  title: string;
  summary: string;
  content: string;
  author_id: Schema.Types.ObjectId;
  categories: [string];
  hidden: boolean;
  reports: Schema.Types.ObjectId[];
}

const blogSchema = new Schema<blog>(
  {
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
      required: [true, "Content is essential"],
    },
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categories: {
      type: [
        {
          type: String,
          enum: [
            "Technology",
            "Entertainment",
            "Science",
            "Sports",
            "Health",
            "Lovely",
            "Horror",
          ],
        },
      ],
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    reports: [
      {
        type: Schema.Types.ObjectId,
        ref: "Report",
      },
    ],
  },
  { timestamps: true }
);

interface metaDataForBlog {
  admin_id: Schema.Types.ObjectId;
  selected_categories: string[];
  unselected_categories: string[];
}

const metaDataForBlogSchema = new Schema<metaDataForBlog>({
  admin_id: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  selected_categories: [String],
  unselected_categories: [String],
});

interface like {
  user: Schema.Types.ObjectId;
  blog: Schema.Types.ObjectId;
}

const likeSchema = new Schema<like>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  },
  { timestamps: true }
);

interface report {
  report_message: string;
  reporter: Schema.Types.ObjectId;
}

const reportSchema = new Schema<report>(
  {
    report_message: {
      type: String,
      require: true,
      max: [200, "Summary must be less then 200 characters"],
    },
    reporter: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Admin = model<admin>("Admin", adminSchema);
const User = model<user>("User", userSchema);
const Blog = model<blog>("Blog", blogSchema);
const metaDataForBlog = model<metaDataForBlog>(
  "metaDataForBlog",
  metaDataForBlogSchema
);
const Like = model<like>("Like", likeSchema);
const Report = model<report>("Report", reportSchema);

export default dbConnect;
export { Admin, User, Blog, metaDataForBlog, Like, Report };
