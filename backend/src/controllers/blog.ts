import { Request, Response } from "express";
import errorHandler from "../lib/errorHandler";
import { CustomRequest } from "../middleware/authenticate";
import { Blog } from "../db/database";

export const getAllBlogs = function (req: Request, res: Response) {
  try {
    const blogs = Blog.find().sort({ createdAt: -1 });
    res.send(blogs);
  } catch (error) {}
};

export const getBlogsWithCategory = function (req: Request, res: Response) {
  try {
    const category = req.params.category;
    const blogs = Blog.find({ category }).sort({ createdAt: -1 });
    res.send(blogs);
  } catch (error) {}
};

export const getBlogsWithTitle = function (req: Request, res: Response) {
  try {
    const title = req.params.title;
    const blogs = Blog.find({ title }).sort({ createdAt: -1 });
    res.send(blogs);
  } catch (error) {}
};

export const getUserBlogs = function (req: CustomRequest, res: Response) {
  try {
    const userBlogs = Blog.find({ _id: req.userId }).sort({ createdAt: -1 });
    res.send(userBlogs);
  } catch (error) {}
};

export const getFavoriteBlogs = function (req: CustomRequest, res: Response) {
  try {
    res.send("posting a blog");
  } catch (error) {}
};

export const addBlog = async function (req: CustomRequest, res: Response) {
  try {
    const blog = new Blog({ ...req.body, author_id: req.userId });
    await blog.save();
    res.send();
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
}; 

export const updateBlog = function (req: CustomRequest, res: Response) {
  try {
    res.send("posting a blog");
  } catch (error) {}
};

export const deleteBlog = async function (req: CustomRequest, res: Response) {
  try {
    const _id = req.params.id;
    const author_id = req.userId;
    await Blog.findOneAndDelete({ _id, author_id });
    res.send();
  } catch (error) {
    res.status(500).send()
  }
};
