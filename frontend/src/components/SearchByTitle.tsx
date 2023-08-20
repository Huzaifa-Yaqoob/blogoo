import { Search } from "lucide-react";
import { useQueryClient } from "react-query";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { getBlogsByTitleName } from "@/api/api";

export default function SearchByTitle() {
  const client = useQueryClient();

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    const titleInput = document.getElementById("title") as HTMLInputElement;
    const title: string = titleInput?.value;
    const updatedData = await getBlogsByTitleName(title);
    console.log(updatedData);
    client.setQueryData("blogs", updatedData);
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
