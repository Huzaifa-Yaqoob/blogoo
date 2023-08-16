import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

export default function SearchByTitle() {
  const search = (e: FormEvent) => {
    e.preventDefault();
    console.log(document.getElementById);
  };
  return (
    <form
      onSubmit={search}
      className="flex items-center bg-accent w-full text-accent-foreground shadow px-2 rounded text-sm"
    >
      <Input
        type="text"
        placeholder="Enter a title"
        id="title"
        className="border-none  bg-transparent p-0 focus-visible:ring-transparent focus:border-none m-0"
      />
      <Button
        type="submit"
        className="bg-transparent text-accent-foreground p-0"
      >
        <Search />
      </Button>
    </form>
  );
}
