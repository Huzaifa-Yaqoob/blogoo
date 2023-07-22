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

interface user {
  username: string;
  email: string;
  password: string;
  avatar: string;
}

interface blog {
  title: string;
  summary: string;
  content: string;
  author_id: Schema.Types.ObjectId;
  categories: [string];
  hidden: boolean;
  reports: Schema.Types.ObjectId[];
}

interface metaDataForBlog {
  admin_id: Schema.Types.ObjectId;
  selected_categories: string[];
  unselected_categories: string[];
}

interface like {
  user: Schema.Types.ObjectId;
  blog: Schema.Types.ObjectId;
}

interface report {
  report_message: string;
  reporter: Schema.Types.ObjectId;
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

const userSchema = new Schema<user>(
  {
    email: {
      type: String,
      trim: true,
      required: true,
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
      required: true,
      minlength: 2,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    avatar: {
      type: String,
      default: "unknown",
    },
  },
  { timestamps: true }
);

const blogSchema = new Schema<blog>(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
      unique: true,
    },
    summary: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
    },
    author_id: {
      type: Schema.Types.ObjectId,
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
        type: Schema.Types.ObjectId,
        ref: "Report",
      },
    ],
  },
  { timestamps: true }
);

const metaDataForBlogSchema = new Schema<metaDataForBlog>({
  admin_id: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  selected_categories: [String],
  unselected_categories: [String],
});

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

const reportSchema = new Schema<report>(
  {
    report_message: {
      type: String,
      require: true,
      max: 200,
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
