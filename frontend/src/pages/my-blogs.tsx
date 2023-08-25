import { Navigate } from "react-router-dom";
import { useQuery } from "react-query";
import BlogCard from "@/components/blogCard/BlogCard";
import BlogLoading from "@/components/BlogLoading";
import { useUserStore } from "@/lib/store";
import { getUserBlogs } from "@/api/api";

export default function MyBlogs() {
  const [isLogin] = useUserStore((state) => [state.isLogIn]);
  const userBlog: any = useQuery("userBlogs", getUserBlogs);

  if (!isLogin) {
    return <Navigate to="/" />;
  }
  return (
    <section className="m-4">
      <main className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
        {userBlog.data === null ? (
          <p className="text-3xl">Sorry!!! Nothing Found Here.</p>
        ) : userBlog.isLoading ? (
          <BlogLoading />
        ) : (
          userBlog.data.map((data: any) => (
            <BlogCard key={data._id} data={data} />
          ))
        )}
      </main>
    </section>
  );
}
