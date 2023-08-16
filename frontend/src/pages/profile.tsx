import { Navigate } from "react-router-dom";
import { useUserStore } from "@/lib/store";
import { Skeleton } from "@/components/ui/skeleton";

export default function Profile() {
  const [isLogin] = useUserStore((state) => [state.isLogIn]);
  if (!isLogin) {
    return <Navigate to="/" />;
  }
  return <Skeleton className="w-10 h-10"/>;
}
