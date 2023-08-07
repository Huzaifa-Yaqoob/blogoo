import { Navigate } from "react-router-dom";
import { useUserStore } from "@/lib/store";

export default function CreateBlog() {
  const [isLogin] = useUserStore((state) => [state.isLogIn]);
  if (!isLogin) {
    return <Navigate to="/" />;
  }
  return <section className="m-4">Create Blogs</section>;
}
