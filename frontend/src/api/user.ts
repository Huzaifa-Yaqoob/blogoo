import axios from "axios";
import { z } from "zod";
import { LoginFormSchema, RegisterFormSchema, User } from "@/lib/validate";

const user = axios.create({
  baseURL: "http://localhost:3000/user",
  headers: { Authorization: "" },
});

export default user.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export const register = (data: z.infer<typeof RegisterFormSchema>) =>
  user.post("", data);
