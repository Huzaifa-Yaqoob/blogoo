import { NavLink } from "react-router-dom";
import { Home, LogOut, User, Star, ScrollText, BadgePlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NavLinks() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 bg-card">
        <NavLink to="/">
          <DropdownMenuItem className="link cursor-pointer">
            <Home size={"1rem"} />
            <span className=" ml-4">Home</span>
          </DropdownMenuItem>
        </NavLink>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="cursor-default">
          My Account
        </DropdownMenuLabel>
        <NavLink to="/profile">
          <DropdownMenuItem className="link cursor-pointer">
            <User size={"1rem"} />
            <span className=" ml-4">Profile</span>
          </DropdownMenuItem>
        </NavLink>
        <NavLink to="/favorite">
          <DropdownMenuItem className="link cursor-pointer my-1">
            <Star size={"1rem"} />
            <span className=" ml-4">Favorite</span>
          </DropdownMenuItem>
        </NavLink>
        <NavLink to="/my-blogs">
          <DropdownMenuItem className="link cursor-pointer">
            <ScrollText size={"1rem"} />
            <span className=" ml-4">My Blogs</span>
          </DropdownMenuItem>
        </NavLink>
        <NavLink to="/add-blog">
          <DropdownMenuItem className="link cursor-pointer">
            <BadgePlus size={"1rem"} />
            <span className=" ml-4">Add Blogs</span>
          </DropdownMenuItem>
        </NavLink>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="link cursor-pointer">
          <LogOut size={"1rem"} />
          <span className=" ml-4">Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
