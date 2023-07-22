import { Router } from "express";
import authenticate from "../middleware/authenticate";

const route = Router();

route.use(authenticate);

route.post("/:id", (req, res) => {});

export default route;
