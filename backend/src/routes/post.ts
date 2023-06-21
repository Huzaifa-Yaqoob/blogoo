import { Router } from "express";

const route = Router();

route.get("/", (req, res) => {
  res.send("Post");
});

route.put("/", (req, res) => {
  res.send("Post");
});

route.delete("/", (req, res) => {
  res.send("Delete");
});

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
