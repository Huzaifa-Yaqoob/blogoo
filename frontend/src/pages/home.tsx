import { useQuery } from "react-query";
import { getAllBlogs } from "@/api/api";
import BlogCard from "@/components/blogCard/BlogCard";
import SearchLayout from "@/layouts/SearchLayout";

export default function Home() {
  const blog: any = useQuery("blogs", getAllBlogs);
  // console.log(blog);
  return (
    <section className="flex flex-col">
      <SearchLayout />
      <main className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
        <BlogCard imageUrl="https://images.unsplash.com/photo-1691019807758-3647f75a3154?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80" />
        <BlogCard imageUrl="https://images.unsplash.com/photo-1690796780902-00eb32d50d24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80" />
        <BlogCard imageUrl="https://images.unsplash.com/photo-1582020962336-8a3c9df080e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" />
        <BlogCard imageUrl="https://images.unsplash.com/photo-1690729474216-700ae66df33e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" />
        <BlogCard imageUrl="https://images.unsplash.com/photo-1690983183786-ad265120ca37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" />
      </main>
    </section>
  );
}
