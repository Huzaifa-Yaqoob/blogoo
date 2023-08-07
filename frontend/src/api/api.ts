import axios, { AxiosError } from "axios";
import { z } from "zod";
import { LoginFormSchema, RegisterFormSchema, User } from "@/lib/validate";

const user = axios.create({
  baseURL: "http://localhost:3000",
});

user.interceptors.request.use(
  (config) => {
    const user: any = localStorage.getItem("user");
    if (user) {
      config.headers["authorization"] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

user.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = async (data: z.infer<typeof RegisterFormSchema>) => {
  return await user.post("/user", data);
};

export const logIn = async (data: z.infer<typeof LoginFormSchema>) => {
  return await user.post("/user/login", data);
};
