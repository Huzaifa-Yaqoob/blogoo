import SearchByCategory from "@/components/SearchByCategory";
import SearchByTitle from "@/components/SearchByTitle";

export default function SearchLayout({ children }: any) {
  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row justify-between mb-4">
        <SearchByTitle />
        <SearchByCategory />
      </div>
      {children}
    </>
  );
}
