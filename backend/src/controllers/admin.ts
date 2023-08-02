import { Request, Response } from "express";
import { CustomRequest } from "../middleware/authenticate";
import adminAuth from "../lib/adminAuth";
import { Admin, Blog, MetaDataForBlog } from "../db/database";
import { getAllReports } from "../db/adminAggregation";

export const setAdmin = async (req: CustomRequest, res: Response) => {
  try {
    res.send(await new Admin({ user_id: req.userId }).save());
  } catch (error) {
    res.send("Noo");
  }
};

export const getReports = async (req: CustomRequest, res: Response) => {
  try {
    if (!(await adminAuth(req.userId))) {
      res.status(404).send({ authorization: false });
    } else {
      res.send(await getAllReports());
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
};

export const hideBlog = async (req: CustomRequest, res: Response) => {
  try {
    if (!(await adminAuth(req.userId))) {
      res.status(404).send({ authorization: false });
    } else {
      const { hidden } = await Blog.findById(req.params.id);
      await Blog.findByIdAndUpdate(req.params.id, {
        $set: { hidden: !hidden },
      });
      res.sendStatus(200);
    }
  } catch (error) {
    res.sendStatus(404);
  }
};

export const getCategories = async (req: CustomRequest, res: Response) => {
  try {
    const category = await MetaDataForBlog.find() 
    res.send(category[0]);
  } catch (error) {
    res.sendStatus(404);
  }
};
export const setCategories = async (req: CustomRequest, res: Response) => {
  try {
    const category = req.params.category;
    const metaDataForBlog = await MetaDataForBlog.find({});
    if (
      !metaDataForBlog[0].selected_categories.includes(category) &&
      !metaDataForBlog[0].all_categories.includes(category)
    ) {
      await MetaDataForBlog.findByIdAndUpdate(metaDataForBlog[0]._id, {
        $push: { selected_categories: category, all_categories: category },
      });
    } else {
      await MetaDataForBlog.findByIdAndUpdate(metaDataForBlog[0]._id, {
        $pull: { selected_category: category },
      });
    }
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
};
