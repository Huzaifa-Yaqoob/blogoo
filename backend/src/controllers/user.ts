import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../db/database";
import validateID from "../lib/validateId";
import { createToken } from "../lib/authToken";
import { CustomRequest } from "../middleware/authenticate";

export const register = async (req: Request, res: Response) => {
  try {
    const salt = await bcrypt.genSalt();
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const { _id, username, email, avatar } = await new User(req.body).save();
    const token = createToken(_id.toString());
    res.send({ username, email, token, avatar, });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({ message: "This account is already exists" });
    } else {
      res.sendStatus(404);
    }
  }
};

export const logIn = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const auth = await bcrypt.compare(req.body.password, user.password);
      if (auth) {
        const token = createToken(user._id.toString());
        res
          .setHeader("authorization", `Bearer ${token}`)
          .send({ email: user.email, username: user.username, avatar: user.avatar });
        return;
      }
      throw new Error("PasswordUnmatched");
    }
    throw new Error("EmailIncorrect");
  } catch (error) {
    console.log(error);
    if (error.message === "EmailIncorrect") {
      res.status(400).send({ message: "This email dose not exist" });
    } else if (error.message === "PasswordUnmatched") {
      res.status(400).send({ message: "Password incorrect" });
    } else {
      res.sendStatus(404);
    }
  }
};

export const updateAccount = async (req: CustomRequest, res: Response) => {
  try {
    const _id: string = req.userId;
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(
      _id,
      { name },
      { new: true, runValidators: true }
    );
    res.send(user);
  } catch (error) {
    res.sendStatus(404);
  }
};

export const unregister = async (req: CustomRequest, res: Response) => {
  try {
    const _id: string = req.userId;
    await validateID(_id);
    res.send(await User.deleteOne({ _id }));
  } catch (error) {
    console.log(error.message);
    res.sendStatus(404);
  }
};
