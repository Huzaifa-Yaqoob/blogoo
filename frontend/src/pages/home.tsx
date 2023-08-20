import { Navigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useUserStore } from "@/lib/store";
import { getAllBlogs } from "@/api/api";
import BlogCard from "@/components/blogCard/BlogCard";
import SearchLayout from "@/layouts/SearchLayout";
import BlogLoading from "@/components/BlogLoading";

export default function Home() {
  const [isLogin] = useUserStore((state) => [state.isLogIn]);
  const blog: any = useQuery("blogs", getAllBlogs);
  if (!isLogin) {
    console.log(isLogin);
    return <Navigate to="/" />;
  } else {
    return (
      <SearchLayout>
        <section className="flex flex-col">
          <main className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
            {blog.data === null ? (
              <p>Huzaifa</p>
            ) : blog.isLoading ? (
              <BlogLoading />
            ) : (
              blog.data.map((data: any) => (
                <BlogCard key={data._id} data={data} />
              ))
            )}
          </main>
        </section>
      </SearchLayout>
    );
  }
}
