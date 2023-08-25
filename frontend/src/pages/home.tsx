import { Navigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useUserStore } from "@/lib/store";
import { getAllBlogs } from "@/api/api";
import BlogCard from "@/components/blogCard/BlogCard";
import SearchLayout from "@/layouts/SearchLayout";
import BlogLoading from "@/components/BlogLoading";
import SearchByCategory from "@/components/SearchByCategory";
import SearchByTitle from "@/components/SearchByTitle";

export default function Home() {
  const [isLogin] = useUserStore((state) => [state.isLogIn]);
  const blog: any = useQuery("blogs", getAllBlogs);
  if (!isLogin) {
    console.log(isLogin);
    return <Navigate to="/" />;
  } else {
    return (
      <>
        <div className="flex flex-col gap-2 sm:flex-row justify-between mb-4">
          <SearchByTitle />
          <SearchByCategory />
        </div>
        <section className="flex flex-col">
          <main className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
            {blog.data === null ? (
              <p className="text-3xl">Sorry!!! Nothing Found Here.</p>
            ) : blog.isLoading ? (
              <BlogLoading />
            ) : (
              blog.data.map((data: any) => (
                <BlogCard key={data._id} data={data} />
              ))
            )}
          </main>
        </section>
      </>
    );
  }
}
