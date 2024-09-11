import React from "react";
import ReactDOM from "react-dom/client";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import RootLayout from "./layouts/RootLayout";
import LandingPage from "./pages/LandingPage";
import PageNotFound from "./pages/page-not-found";
import Home from "pages/home";
import Profile from "./pages/profile";
import MyBlogs from "./pages/my-blogs";
import Favorite from "./pages/favorite";
import CreateBlog from "./pages/create-blog";

const router = createBrowserRouter(
  createRoutesFromElements(
    // <Route></>
    <Route path="/">
      <Route index element={<LandingPage />} />
      <Route path="/" element={<RootLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/add-blog" element={<CreateBlog />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
