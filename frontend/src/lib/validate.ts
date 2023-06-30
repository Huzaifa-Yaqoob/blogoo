import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export const RegisterFormSchema = z.object({
  email: z.string().email("Invalid email address."),
  username: z.string().min(2, {
    message: "username must be at least 2 characters",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

// user register login response interface

export interface User {
  result: Data;
}

export interface Data {
  email: string;
  username: string;
  password: string;
  avatar: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
