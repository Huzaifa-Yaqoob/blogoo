import React from "react";
import ReactDOM from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import RootLayout from "./layouts/RootLayout";
import PageNotFound from "./pages/page-not-found";
import Home from "pages/home";
import Profile from "./pages/profile";
import MyBlogs from "./pages/my-blogs";
import Favorite from "./pages/favorite";
import CreateBlog from "./pages/create-blog";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-blogs" element={<MyBlogs />} />
      <Route path="/favorite" element={<Favorite />} />
      <Route path="/add-blog" element={<CreateBlog />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </React.StrictMode>
);
