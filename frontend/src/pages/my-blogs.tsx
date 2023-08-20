import { Navigate } from "react-router-dom";
import BlogCard from "@/components/blogCard/BlogCard";
import SearchLayout from "@/layouts/SearchLayout";
import { useUserStore } from "@/lib/store";

export default function MyBlogs() {
  const [isLogin] = useUserStore((state) => [state.isLogIn]);
  if (!isLogin) {
    return <Navigate to="/" />;
  }
  return (
    <SearchLayout>
      <section className="m-4">
        <main className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4"></main>
      </section>
    </SearchLayout>
  );
}
