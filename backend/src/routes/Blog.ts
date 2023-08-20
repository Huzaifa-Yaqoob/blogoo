import { Router } from "express";
import authenticate from "../middleware/authenticate";
import {
  getAllBlogs,
  getBlogsWithCategory,
  getBlogsWithTitle,
  getFavoriteBlogs,
  getUserBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  getCategories,
} from "../controllers/blog";

const route = Router();

route.use(authenticate);

route.get("/", getAllBlogs);

route.get("/category", getCategories);

route.get("/category/:category", getBlogsWithCategory);

route.get("/title/:title", getBlogsWithTitle);

route.get("/user/", getUserBlogs);

route.get("/favorite/", getFavoriteBlogs);

route.post("/", addBlog);

route.patch("/:id", updateBlog);

route.delete("/:id", deleteBlog);

export default route;
