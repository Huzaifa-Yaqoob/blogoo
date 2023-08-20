import axios from "axios";
import { z } from "zod";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/validate";
import { User } from "./apiTypes";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    let user: User = localStorage.getItem("user");
    user = JSON.parse(user);
    if (user) {
      config.headers["authorization"] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = async (data: z.infer<typeof RegisterFormSchema>) => {
  return await api.post("/user", data);
};

export const logIn = async (data: z.infer<typeof LoginFormSchema>) => {
  return await api.post("/user/login", data);
};

export const getCategories = async () => {
  return await api.get("/blog/category");
};

export const getAllBlogs = async () => {
  return await api.get("/blog");
};

export const getBlogsByCategories = async (category: string) => {
  return await api.get(`/blog/category/${category}`);
};

export const getBlogsByTitleName = async (title: string) => {
  return await api.get(`/blog/title/${title}`);
};

export const getUserBlogs = async (id: string) => {
  return await api.get(`/blog/user`);
};

export const getFavoriteBlogs = async () => {
  return await api.get(`/blog/favorite`);
};

export const addBlogs = async (blog: any) => {
  return await api.post(`/blog`, blog);
};

export const deleteBlogs = async (id: string) => {
  return await api.delete(`/blog/${id}`,);
};

export const like = async (id: string) => {
  return await api.post(`/like/${id}`);
};
