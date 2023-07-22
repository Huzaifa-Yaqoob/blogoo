import { Request, Response } from "express";
import errorHandler from "../lib/errorHandler";
import { CustomRequest } from "../middleware/authenticate";
import { Blog, Like } from "../db/database";
import {
  allBlogs,
  titledBlogs,
  categoryBlogs,
  userBlogs,
  favoriteBlogs,
} from "../db/BlogsAggregation";

export const getAllBlogs = async function (req: Request, res: Response) {
  try {
    res.send(await allBlogs());
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

export const getBlogsWithCategory = async function (
  req: Request,
  res: Response
) {
  try {
    const category = req.params.category;
    console.log(category);
    res.send(await categoryBlogs(category));
  } catch (error) {
    res.status(500).send();
  }
};

export const getBlogsWithTitle = async function (req: Request, res: Response) {
  try {
    const title = req.params.title;
    res.send(await titledBlogs(title));
  } catch (error) {
    res.status(500).send();
  }
};

export const getUserBlogs = async function (req: CustomRequest, res: Response) {
  try {
    res.send(await userBlogs(req.userId));
  } catch (error) {
    res.status(500).send();
  }
};

export const getFavoriteBlogs = async function (
  req: CustomRequest,
  res: Response
) {
  try {
    console.log("Huzaifa");
    res.send(await favoriteBlogs(req.userId));
  } catch (error) {
    res.status(500).send();
  }
};

export const addBlog = async function (req: CustomRequest, res: Response) {
  try {
    const blog = new Blog({ ...req.body, author_id: req.userId });
    await blog.save();
    res.send();
  } catch (error) {
    res.status(400).send();
  }
};

export const updateBlog = function (req: CustomRequest, res: Response) {
  try {
    res.send("posting a blog");
  } catch (error) {
    res.status(404).send();
  }
};

export const deleteBlog = async function (req: CustomRequest, res: Response) {
  try {
    const _id = req.params.id;
    const author_id = req.userId;
    console.log("delete");
    if (!(await Blog.findOneAndDelete({ _id, author_id }))) {
      await Like.deleteMany({ blog: _id });
    } else {
      res.send(400);
    }
    res.send();
  } catch (error) {
    res.status(500).send();
  }
};