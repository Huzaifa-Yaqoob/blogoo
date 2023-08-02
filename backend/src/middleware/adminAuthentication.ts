import { Response, NextFunction } from "express";
import authenticate, { CustomRequest } from "./authenticate";
import { Admin } from "../db/database";

export interface customAdminRequest extends CustomRequest {
  admin: string;
}

export default async (
  req: customAdminRequest,
  res: Response,
  next: NextFunction
) => {
  authenticate(req, res, next);
  console.log(1);
  try {
    const admin = await Admin.findOne({ user_id: req.userId });
    if (!admin) {
      res.status(401).send("Unauthorized");
    }
    req.admin = admin._id.toString();
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
