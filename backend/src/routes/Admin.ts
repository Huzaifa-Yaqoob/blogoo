import { Router } from "express";
import adminAuthentication from "../middleware/adminAuthentication";
import { setCategories } from "../controllers/admin";

const route = Router();

route.use(adminAuthentication);

// route.post("/", setCategories);

export default route;  