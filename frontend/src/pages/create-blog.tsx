import { Navigate } from "react-router-dom";
import { useUserStore } from "@/lib/store";
import AddBlogForm from "@/components/AddBlogForm";

export default function CreateBlog() {
  const [isLogin] = useUserStore((state) => [state.isLogIn]);
  if (!isLogin) {
    return <Navigate to="/" />;
  }
  return (
    <section className="m-4">
      <AddBlogForm />
    </section>
  );
}
