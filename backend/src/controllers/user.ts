import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User, Admin } from "../db/database";
import validateID from "../lib/validateId";
import { createToken } from "../lib/authToken";
import { CustomRequest } from "../middleware/authenticate";

export const register = async (req: Request, res: Response) => {
  try {
    let { email, username, password } = req.body;
    console.log(req.body);
    const file = req.file;
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    const newUser = new User({ email, username, password });
    const user = await newUser.save();
    const token = createToken(user._id.toString());
    res.setHeader("authorization", `Bearer ${token}`).send(user);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(400).send({ email: "This account is already exists" });
    } else {
      res.status(400).send({ error: "Client Side Error" });
    }
  }
};

export const logIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = createToken(user._id.toString());
        res.setHeader("authorization", `Bearer ${token}`).send({ user });
        return;
      }
      throw new Error("PasswordUnmatched");
    }
    throw new Error("EmailIncorrect");
  } catch (error) {
    console.log(error);
    if (error.message === "EmailIncorrect") {
      res.status(400).send({ email: "This email dose not exist" });
    } else if (error.message === "PasswordUnmatched") {
      res.status(400).send({ password: "Password incorrect" });
    } else {
      res.status(400).send({ error: "Client side error" });
    }
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
    res.status(400).send({ error: "Client side error" });
  }
};

export const unregister = async (req: CustomRequest, res: Response) => {
  try {
    const _id: string = req.userId;
    await validateID(_id);
    res.send(await User.deleteOne({ _id }));
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ authorization: "You are not logged in" });
  }
};
