import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../lib/authToken";

export interface CustomRequest extends Request {
  userId?: string;
}

const authenticate = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(404).send({ authentication: "You are not logged In" });
  }
  const token: string = authorization.split(" ")[1];
  try {
    req.userId = decodeToken(token);
    next();
  } catch (error) {
    res.status(404).send({ authentication: "You are not logged In" });
  }
};

export default authenticate;
