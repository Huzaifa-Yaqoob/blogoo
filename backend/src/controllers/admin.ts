import { Request, Response } from "express";
import errorHandler from "../lib/errorHandler";
import { Admin } from "../db/database";

export const setCategories = async (req: Request, res: Response) => {
  try {
    const categories = req.body.categories;
    await Admin.updateOne({}, { $set: { categories } });
  } catch (error) {}
};
