import NavLinks from "./NavDropDown";
import ToggleTheme from "./ToggleTheme";
import NavDialog from "./NavDialog";

export default function NavBar() {
  return (
    <header className="py-2 px-4 shadow-md sticky top-0 bg-background">
      <nav className="flex justify-between items-center">
        <img src="logo.svg" alt="Logo" className=" w-10" />
        <div className="flex items-center space-x-8">
          <ToggleTheme />
          <NavLinks />
          <NavDialog />
        </div>
      </nav>
    </header>
  );
}
