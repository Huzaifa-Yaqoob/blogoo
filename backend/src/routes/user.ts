import { Router } from "express";
import {register} from "../controllers/user"

const route = Router();

route.post("/", register);

route.get("/", (req, res) => {
  res.send("login");
});

route.patch("/", (req, res) => {
  res.send("Updated");
});

route.delete("/:id", (req, res) => {
  res.send("delete");
});

export default route;
