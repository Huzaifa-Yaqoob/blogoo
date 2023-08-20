import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getCategories, getBlogsByCategories } from "@/api/api";
import Select from "react-select";
import ButtonLoading from "./ButtonLoading";

type option = {
  value: string;
  label: string;
};

export default function SearchByCategory() {
  const [category, setCategory] = useState<any>("");
  const client = useQueryClient();
  const categories = useQuery("categories", getCategories);
  const data: any = categories.data;
  const options: option[] = [];
  for (const key in data) {
    const option: option = { value: data[key], label: data[key] };
    options.push(option);
  }

  const getFromCategory = async (category: any) => {
    const data = await getBlogsByCategories(category.value);
    client.setQueryData("blogs", data);
  };

  return (
    <div className="bg-accent text-accent-foreground rounded px-2 shadow text-sm w-full">
      {categories.isLoading ? (
        "Loading"
      ) : categories.isError ? (
        "Error"
      ) : (
        <Select
          options={options}
          onChange={getFromCategory}
          unstyled={true}
          className="h-full"
          placeholder="All"
          isClearable={true}
          classNames={{
            menu: (state) =>
              "bg-accent text-accent-foreground shadow-lg rounded-lg mt-2 py-2 no-scrollbar",
            option: (state) =>
              state.isSelected || state.isFocused
                ? "text-primary-foreground font-bold"
                : "",
            menuList: (state) =>
              "grid grid-flow-row grid-cols-2 grid-cols-3 px-2",
          }}
        />
      )}
    </div>
  );
}
