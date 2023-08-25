import { useState } from "react";
import { Search } from "lucide-react";
import { useQueryClient } from "react-query";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { getBlogsByTitleName } from "@/api/api";
import { X } from "lucide-react";

export default function SearchByTitle() {
  const [isSearched, setIsSearched] = useState(false);
  const client = useQueryClient();

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    const titleInput = document.getElementById("title") as HTMLInputElement;
    const title: string = titleInput?.value;
    console.log(title);
    if (title === "") {
      client.invalidateQueries("blogs");
      setIsSearched(false);
    } else {
      const updatedData = await getBlogsByTitleName(title);
      client.setQueryData("blogs", updatedData);
      setIsSearched(true);
    }
  };

  const resetSearch = (e: React.FormEvent) => {
    client.invalidateQueries("blogs");
    setIsSearched(false);
  };

  return (
    <form
      onSubmit={search}
      onReset={resetSearch}
      className="flex items-center bg-accent w-full text-accent-foreground shadow px-2 rounded text-sm"
    >
      <Input
        type="text"
        placeholder="Enter a title"
        id="title"
        className="border-none bg-transparent p-0 focus-visible:ring-transparent focus-visible:border-none m-0"
      />
      <Button
        type={isSearched ? "reset" : "submit"}
        className="bg-transparent text-accent-foreground p-0"
      >
        {isSearched ? <X /> : <Search />}
      </Button>
    </form>
  );
}
