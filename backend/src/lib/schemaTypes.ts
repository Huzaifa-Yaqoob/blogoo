import { Schema } from "mongoose";

export interface admin {
  user_id: Schema.Types.ObjectId;
  key: string;
}

export interface user {
  username: string;
  email: string;
  password: string;
  avatar: string;
}

export interface blog {
  title: string;
  summary: string;
  content: string;
  author_id: Schema.Types.ObjectId;
  categories: [string];
  hidden: boolean;
  reports_id: Schema.Types.ObjectId[];
}

export interface metaDataForBlog {
  all_categories: string[];
  selected_categories: string[];
}

export interface like {
  user: Schema.Types.ObjectId;
  blog: Schema.Types.ObjectId;
}

export interface report {
  report_message: string;
  reporter_id: Schema.Types.ObjectId;
}
