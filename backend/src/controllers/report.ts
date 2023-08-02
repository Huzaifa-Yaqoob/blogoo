import { Response } from "express";
import { CustomRequest } from "../middleware/authenticate";
import { Report, Blog } from "../db/database";

export const addReport = async (req: CustomRequest, res: Response) => {
  try {
    const { _id } = await new Report({
      report_message: req.body.message,
      reporter: req.userId,
    }).save();
    await Blog.findByIdAndUpdate(
      req.params.id,
      { $push: { reports_id: _id } },
      { new: true, runValidators: true }
    );
    res.send();
  } catch (error) {
    res.sendStatus(404);
  }
};
