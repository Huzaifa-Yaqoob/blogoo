import { Router } from "express";
import authenticate from "../middleware/authenticate";
import {
  getReports,
  hideBlog,
  setCategories,
  getCategories,
  setAdmin,
} from "../controllers/admin";

const route = Router();

route.use(authenticate);

// route.post("/ao", setAdmin);

route.get("/", getReports);

route.patch("/:id", hideBlog);

route.get("/category", getCategories);

route.put("/category/:category", setCategories);

export default route;
