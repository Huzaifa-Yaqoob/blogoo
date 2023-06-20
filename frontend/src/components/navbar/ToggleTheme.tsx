import { useEffect } from "react";

export default function ToggleTheme() {
  const html = document.querySelector("html")!;

  useEffect(() => {
    localStorage.getItem("theme")
      ? html.classList.add("dark")
      : html.classList.remove("dark");
  });

  const toggleTheme = () => {
    html.classList.toggle("dark");
    localStorage.getItem("theme")
      ? localStorage.removeItem("theme")
      : localStorage.setItem("theme", "dark");
  };

  return <div onClick={toggleTheme}>TogleTheme</div>;
}
