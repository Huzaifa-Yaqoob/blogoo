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
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error(); 
    }
    const token: string = authorization.split(" ")[1];
    req.userId = decodeToken(token);
    next();
  } catch (error) {
    res.status(404).send({ authentication: "You are not logged In" });
  }
};

export default authenticate;
