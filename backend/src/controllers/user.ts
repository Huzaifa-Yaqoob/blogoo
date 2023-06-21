import { Request, Response } from "express";
import { addUser } from "../db/userModel";
import errorHandler from "../lib/errorHandler";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    await addUser(req.body);
    res.send("Ok");
  } catch (err) {
    console.log(typeof err);
    errorHandler();
    res.send("Error in register function");
  }
};
