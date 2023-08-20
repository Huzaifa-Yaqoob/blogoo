import { Navigate } from "react-router-dom";
import { useUserStore } from "@/lib/store";
import BlogCard from "@/components/blogCard/BlogCard";
import SearchLayout from "@/layouts/SearchLayout";

export default function Favorite() {
  const [isLogin] = useUserStore((state) => [state.isLogIn]);
  if (!isLogin) {
    return <Navigate to="/" />;
  } else {
    return (
      <SearchLayout>
        <section>
          <main className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4"></main>
        </section>
      </SearchLayout>
    );
  }
}
