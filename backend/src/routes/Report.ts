import { Router } from "express";
import authenticate from "../middleware/authenticate";
import { addReport } from "../controllers/report";
const route = Router();

route.use(authenticate);

route.post("/:id", addReport);

export default route;
