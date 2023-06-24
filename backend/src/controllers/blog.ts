import { Request, Response } from "express";
import errorHandler from "../lib/errorHandler";
import { Blog } from "../db/database";

export const addBlog = function (req: Request, res: Response) {
  res.send("posting a blog");
};

export const deleteBlog = function (req: Request, res: Response) {
  res.send("posting a blog");
};

export const blah = function (req: Request, res: Response) {
  res.send("posting a blog");
};
