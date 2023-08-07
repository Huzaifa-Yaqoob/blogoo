import { Navigate } from "react-router-dom";
import { useUserStore } from "@/lib/store";

export default function Profile() {
  const [isLogin] = useUserStore((state) => [state.isLogIn]);
  if (!isLogin) {
    return <Navigate to="/" />;
  }
  return <h1>Profile</h1>;
}
