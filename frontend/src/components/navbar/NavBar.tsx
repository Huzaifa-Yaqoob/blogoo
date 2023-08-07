import NavDropDown from "./NavDropDown";
import ToggleTheme from "./ToggleTheme";
import NavDialog from "./NavDialog";
import { useUserStore } from "@/lib/store";

export default function NavBar() {
  const [isLogIn] = useUserStore((state) => [state.isLogIn]);
  return (
    <header className="py-2 px-4 shadow-md sticky top-0 bg-background z-50">
      <nav className="flex justify-between items-center">
        <img src="logo.svg" alt="Logo" className=" w-10" />
        <div className="flex items-center space-x-8">
          <ToggleTheme />
          {isLogIn ? <NavDropDown /> : <NavDialog />}
        </div>
      </nav>
    </header>
  );
}
