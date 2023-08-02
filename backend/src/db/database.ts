import { Schema, model, connect } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { categoryArray } from "../lib/categoryArray";
import {
  admin,
  user,
  blog,
  metaDataForBlog,
  like,
  report,
} from "../lib/schemaTypes";

const dbConnect = async (): Promise<void> => {
  try {
    await connect(process.env.DB_URL + process.env.DB_NAME);
  } catch (error) {
    console.log("🚀 ~ file: database.ts ~ error:", error);
  }
};

const adminSchema = new Schema<admin>(
  {
    user_id: Schema.Types.ObjectId,
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
      validate: {
        validator: async function (categories: string[]) {
          const metaData = await MetaDataForBlog.findOne();
          const selectedCategories = metaData?.selected_categories || [];
          return categories.every((category) =>
            selectedCategories.includes(category)
          );
        },
      },
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    reports_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Report",
      },
    ],
  },
  { timestamps: true }
);

const metaDataForBlogSchema = new Schema<metaDataForBlog>({
  all_categories: {
    type: [String],
    default: categoryArray,
  },
  selected_categories: {
    type: [String],
    default: categoryArray,
  },
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
      required: true,
      max: 200,
    },
    reporter_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Admin = model<admin>("Admin", adminSchema);
const User = model<user>("User", userSchema);
const Blog = model<blog>("Blog", blogSchema);
const MetaDataForBlog = model<metaDataForBlog>(
  "metaDataForBlog",
  metaDataForBlogSchema
);
const Like = model<like>("Like", likeSchema);
const Report = model<report>("Report", reportSchema);

export default dbConnect;
export { Admin, User, Blog, MetaDataForBlog, Like, Report };
