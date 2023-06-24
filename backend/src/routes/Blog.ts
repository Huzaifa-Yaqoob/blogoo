import { Router } from "express";
import { addBlog, deleteBlog } from "../controllers/blog";

const route = Router();

route.get("/", (req, res) => {
  res.send("Post");
});

route.post("/", addBlog);

route.delete("/", deleteBlog);

route.patch("/", (req, res) => {
  res.send("Patch");
});

route.get("/:id", (req, res) => {
  res.send("myPost");
});

route.get("favorite/:id", (req, res) => {
  res.send("myPost");
});

export default route;
