import { Blog } from "./database";

export const getAllBlog = async (id: string) => {
  Blog.aggregate([
    { $match: {} },
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
};
