import { Router } from "express";
import { like } from "../controllers/like";
import authenticate from "../middleware/authenticate";

const route = Router();

route.use(authenticate);

route.post("/:id", like);

export default route;
