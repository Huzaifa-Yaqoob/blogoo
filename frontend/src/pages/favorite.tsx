import { Navigate } from "react-router-dom";
import { useUserStore } from "@/lib/store";
import { useQuery } from "react-query";
import BlogCard from "@/components/blogCard/BlogCard";
import BlogLoading from "@/components/BlogLoading";
import { getFavoriteBlogs } from "@/api/api";

export default function Favorite() {
  const [isLogin] = useUserStore((state) => [state.isLogIn]);
  const favoriteBlog: any = useQuery("favoriteBlogs", getFavoriteBlogs);
  if (!isLogin) {
    return <Navigate to="/" />;
  } else {
    return (
      <section>
        <main className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
          {favoriteBlog === null ? (
            <p className="text-3xl">Sorry!!! Nothing Found Here.</p>
          ) : favoriteBlog.isLoading ? (
            <BlogLoading />
          ) : (
            favoriteBlog.data.map((data: any) => (
              <BlogCard key={data._id} data={data} />
            ))
          )}
        </main>
      </section>
    );
  }
}
