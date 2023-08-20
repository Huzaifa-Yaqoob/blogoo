import { Navigate } from "react-router-dom";
import { useUserStore } from "@/lib/store";
import NavBar from "@/components/navbar/NavBar";

export default function LandingPage() {
  const [isLogin] = useUserStore((state) => [state.isLogIn]);
  if (isLogin) {
    return <Navigate to="/home" />;
  } else {
    return (
      <section className="flex flex-col justify-between min-h-screen">
        <NavBar />
        <main className="flex flex-col justify-center items-center space-y-4">
          <div>
            <img src="logo.svg" alt="LOGO" className="w-32" />
          </div>
          <div className="font-extrabold text-3xl md:text-5xl text-center">
            Welcome to <strong id="logo">Blogoo</strong>
          </div>
          <span className="md:text-lg">Press LogIn Button To Proceed</span>
        </main>
        <footer className="text-center text-xs p-4">
          All content and materials on this website are protected by copyright
          and intellectual property laws. Unauthorized use, reproduction, or
          distribution of any content or materials without the express written
          permission of the owner is strictly prohibited.
          <strong> ©2023 Blogoo. </strong>All rights reserved."
        </footer>
      </section>
    );
  }
}
