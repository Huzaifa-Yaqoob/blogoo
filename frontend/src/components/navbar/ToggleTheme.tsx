import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ToggleTheme() {
  const [theme, setTheme] = useState<string | null>(
    localStorage.getItem("theme")
  );

  const html = document.querySelector("html")!;

  useEffect(() => {
    theme === "dark"
      ? html.classList.add("dark")
      : html.classList.remove("dark");
  }, [theme]);

  const toggleTheme = () => {
    html.classList.toggle("dark");
    localStorage.getItem("theme")
      ? localStorage.removeItem("theme")
      : localStorage.setItem("theme", "dark");
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <div onClick={toggleTheme} className="cursor-pointer">
      {theme === "dark" ? <Sun /> : <Moon />}
    </div>
  );
}
