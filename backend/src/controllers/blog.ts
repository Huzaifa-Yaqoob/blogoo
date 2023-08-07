import { Request, Response } from "express";
import { CustomRequest } from "../middleware/authenticate";
import { Blog, Like, MetaDataForBlog } from "../db/database";
import {
  allBlogs,
  titledBlogs,
  categoryBlogs,
  userBlogs,
  favoriteBlogs,
} from "../db/BlogsAggregation";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await MetaDataForBlog.find({});
    res.send(categories[0].selected_categories);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
};

export const getAllBlogs = async function (req: Request, res: Response) {
  try {
    res.send(await allBlogs());
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
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
    res.sendStatus(404);
  }
};

export const getBlogsWithTitle = async function (req: Request, res: Response) {
  try {
    const title = req.params.title;
    res.send(await titledBlogs(title,));
  } catch (error) {
    res.sendStatus(404);
  }
};

export const getUserBlogs = async function (req: CustomRequest, res: Response) {
  try {
    res.send(await userBlogs(req.userId));
  } catch (error) {
    res.sendStatus(404);
  }
};

export const getFavoriteBlogs = async function (
  req: CustomRequest,
  res: Response
) {
  try {
    res.send(await favoriteBlogs(req.userId));
  } catch (error) {
    res.sendStatus(404);
  }
};

export const addBlog = async function (req: CustomRequest, res: Response) {
  try {
    await new Blog({ ...req.body, author_id: req.userId }).save();
    res.send();
  } catch (error) {
    res.sendStatus(404);
  }
};

export const updateBlog = async function (req: CustomRequest, res: Response) {
  try {
    await Blog.findByIdAndUpdate(req.params.blog, req.body, {
      new: true,
      runValidators: true,
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
};

export const deleteBlog = async function (req: CustomRequest, res: Response) {
  try {
    const _id = req.params.id;
    const author_id = req.userId;
    if (!(await Blog.findOneAndDelete({ _id, author_id }))) {
      await Like.deleteMany({ blog: _id });
    } else {
      res.sendStatus(400);
    }
    res.send();
  } catch (error) {
    res.sendStatus(404);
  }
};
