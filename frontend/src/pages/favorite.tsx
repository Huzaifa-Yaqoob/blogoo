import { Navigate } from "react-router-dom";
import { useUserStore } from "@/lib/store";
import BlogCard from "@/components/blogCard/BlogCard";
import SearchLayout from "@/layouts/SearchLayout";

export default function Favorite() {
  const [isLogin] = useUserStore((state) => [state.isLogIn]);
  if (!isLogin) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <SearchLayout />
      <section>
        <main className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
          <BlogCard imageUrl="https://images.unsplash.com/photo-1691083525349-c22d4dd2d567?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80" />
        </main>
      </section>
    </>
  );
}
