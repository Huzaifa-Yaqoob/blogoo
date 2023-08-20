export default function Categories({ category }: { category: string }) {
  return (
    <div className="p-1 bg-secondary text-secondary-foreground rounded">
      {category}
    </div>
  );
}
