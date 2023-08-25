import { Response } from "express";
import { Like } from "../db/database";
import { CustomRequest } from "middleware/authenticate";

export const like = async (req: CustomRequest, res: Response) => {
  try {
    if (
      !(await Like.findOneAndDelete({ user: req.userId, blog: req.params.id }))
    ) {
      await new Like({ user: req.userId, blog: req.params.id }).save();
      res.send(false);
    }else{
      res.send(true);
    }
  } catch (error) {
    res.sendStatus(404);
  }
};
