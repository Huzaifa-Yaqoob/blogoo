import { Router } from "express";
import authenticate from "../middleware/authenticate";
import { upload } from "../server";
import {
  register,
  updateAccount,
  unregister,
  logIn,
} from "../controllers/user";

const route = Router();

route.post("/", register);

route.get("/", logIn);

route.use(authenticate);

route.patch("/", updateAccount);

route.delete("/", unregister);

export default route;
