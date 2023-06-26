import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User, Admin } from "../db/database";
import validateID from "../lib/validateId";
import { createToken } from "../lib/authToken";
import errorHandler from "../lib/errorHandler";
import { CustomRequest } from "../middleware/authenticate";
import isObjectEmpty from "../lib/isObjectEmpty";

export const register = async (req: Request, res: Response) => {
  try {
    let { email, name, password } = req.body;
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    const user = new User({ email, name, password });
    const result = await user.save();
    const token = createToken(result._id.toString());
    res.setHeader("authorization", `Bearer ${token}`).send({ result });
  } catch (error) {
    res.status(400).send(errorHandler(error));
  }
};

export const logIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const admin = await Admin.findOne({ user_id: user._id });
    const adminId = isObjectEmpty(admin) ? null : admin._id;
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      console.log(auth);
      if (auth) {
        const token = createToken(user._id.toString());
        res.setHeader("authorization", `Bearer ${token}`).send({...user, adminId});
        return;
      }
      throw new Error("PasswordUnmatched");
    }
    throw new Error("EmailIncorrect");
  } catch (error) {
    res.status(400).send(errorHandler(error));
  }
};

export const updateAccount = async (req: CustomRequest, res: Response) => {
  try {
    const _id: string = req.userId;
    const { name } = req.body;
    const user = await User.findOneAndUpdate(
      { _id },
      { name },
      { new: true, runValidators: true }
    );
    res.send(user);
  } catch (error) {
    res.status(400).send(errorHandler(error));
  }
};

export const unregister = async (req: CustomRequest, res: Response) => {
  try {
    const _id: string = req.userId;
    await validateID(_id);
    res.send(await User.deleteOne({ _id }));
  } catch (error) {
    console.log(error.message);
    res.status(400).send(errorHandler(error));
  }
};
