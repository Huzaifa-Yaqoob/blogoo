import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BlogCard({ imageUrl }: { imageUrl: string }) {
  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <Card className="overflow-hidden" style={backgroundStyle}>
      <div className="cardMask">
        <CardHeader className="bg-yellow-500">
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent className=" bg-green-500">
          <p>Card Content</p>
        </CardContent>
        <CardFooter className=" bg-red-500">
          <p>Card Footer</p>
        </CardFooter>
      </div>
    </Card>
  );
}
