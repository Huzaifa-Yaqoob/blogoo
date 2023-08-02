import mongoose from "mongoose";
import { Blog, Like } from "./database";

const likesLookup = {
  from: "likes",
  localField: "_id",
  foreignField: "blog",
  as: "likes",
};

export const userLookup = {
  from: "users",
  localField: "author_id",
  foreignField: "_id",
  as: "author",
};

export const addFields = {
  likesCount: { $size: "$likes" },
  authorName: { $arrayElemAt: ["$author.username", 0] },
  authorAvatar: { $arrayElemAt: ["$author.avatar", 0] },
  uploadedDate: {
    $dateToString: {
      format: "%Y-%m-%d",
      date: "$createdAt",
    },
  },
};

export const project = {
  _id: 1,
  title: 1,
  summary: 1,
  content: 1,
  categories: 1,
  authorName: 1,
  authorAvatar: 1,
  likesCount: 1,
  uploadedDate: 1,
};

const sort = {
  createdAt: -1,
};

export const allBlogs = async () => {
  return await Blog.aggregate([
    {
      $match: {
        hidden: false,
      },
    },
    { $lookup: likesLookup },
    { $lookup: userLookup },
    { $addFields: addFields },
    { $project: project },
    { $sort: { createdAt: -1 } },
    { $limit: 20 },
  ]);
};

export const titledBlogs = async (title: string) => {
  const regex = new RegExp(`\\b${title}\\b`, "i");

  return await Blog.aggregate([
    {
      $match: {
        hidden: false,
        title: {
          $regex: regex,
        },
      },
    },
    { $lookup: likesLookup },
    { $lookup: userLookup },
    { $addFields: addFields },
    { $project: project },
    { $sort: { createdAt: -1 } },
    { $limit: 20 },
  ]);
};

export const categoryBlogs = async (category: string) => {
  return await Blog.aggregate([
    {
      $match: {
        hidden: false,
        categories: {
          $in: [category],
        },
      },
    },
    { $lookup: likesLookup },
    { $lookup: userLookup },
    { $addFields: addFields },
    { $project: project },
    { $sort: { createdAt: -1 } },
    { $limit: 20 },
  ]);
};

export const userBlogs = async (userID: string) => {
  return await Blog.aggregate([
    {
      $match: {
        author_id: new mongoose.Types.ObjectId(userID),
      },
    },
    { $lookup: likesLookup },
    { $lookup: userLookup },
    { $addFields: addFields },
    {
      $project: {
        hidden: 1,
        ...project,
      },
    },
    { $sort: { createdAt: -1 } },
    { $limit: 20 },
  ]);
};

export const favoriteBlogs = async (userID: string) => {
  return await Like.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userID),
      },
    },
    {
      $lookup: {
        from: "blogs",
        localField: "blog",
        foreignField: "_id",
        as: "blog",
      },
    },
    {
      $unwind: "$blog",
    },
    {
      $replaceRoot: {
        newRoot: "$blog",
      },
    },
    { $lookup: userLookup },
    { $lookup: likesLookup },
    { $addFields: addFields },
    { $project: project },
    { $sort: { createdAt: -1 } },
    { $limit: 20 },
  ]);
};
