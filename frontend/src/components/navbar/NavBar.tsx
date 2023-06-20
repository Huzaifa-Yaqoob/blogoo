import NavLinks from "./NavLinks";
import ToggleTheme from "./ToggleTheme";
import { Button } from "../ui/button";

export default function NavBar() {
  return (
    <header className="py-2 px-4">
      <nav className="flex justify-between items-center">
        Logo
        <NavLinks />
        <div className="flex items-center space-x-4">
          <ToggleTheme />
          <Button className=" h-8">Log In</Button>
        </div>
      </nav>
    </header>
  );
}
