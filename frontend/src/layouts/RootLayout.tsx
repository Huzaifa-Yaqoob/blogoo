import { Outlet } from "react-router-dom";
import NavBar from "components/navbar/NavBar";
import Footer from "components/footer/Footer";

export default function RootLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
