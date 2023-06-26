import { Response, NextFunction } from "express";
import isObjectEmpty from "../lib/isObjectEmpty";
import authenticate, { CustomRequest } from "./authenticate";
import { Admin } from "../db/database";

export interface customAdminRequest extends CustomRequest{
    admin: string
}

export default async (req: customAdminRequest, res: Response, next: NextFunction) => {
  authenticate(req, res, next);
  try {
    const admin = await Admin.findOne({ user_id: req.userId });
    if (!isObjectEmpty(admin)) {
      res.status(401).send("Unauthorized");
    } 
    req.admin = admin._id.toString();
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
