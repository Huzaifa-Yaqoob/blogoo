import { Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function BlogCard({ imageUrl }: { imageUrl: string }) {
  const cardClick = () => {
    console.log("Card clicked");
  };

  const like = () => {
    console.log("Like");
  };

  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <Card className="" style={backgroundStyle}>
      <div className="cardMask">
        <CardHeader className="p-2 flex flex-row items-center space-x-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle
              onClick={cardClick}
              className="text-lg font-bold leading-none cursor-pointer"
            >
              Card Title
            </CardTitle>
            <span className=" text-xs">19-7-2002</span>
          </div>
        </CardHeader>
        <CardContent
          onClick={cardClick}
          className="py-1 px-2 overflow-hidden cursor-pointer text-ellipsis line-clamp-4"
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,
            quidem magnam laborum dicta, quos odit cupiditate blanditiis
            pariatur aliquam quo magni nobis possimus nisi a repudiandae
            explicabo saepe corrupti libero doloremque temporibus fugiat quam
            perferendis natus cumque? Soluta libero esse minima, id ex adipisci
            est quaerat iusto voluptates consequatur, eveniet, itaque delectus
            non reprehenderit in eos fuga dignissimos asperiores tempora?
            Dolores consectetur commodi, facere adipisci in dolorem nisi vero
            illum reprehenderit modi hic! Architecto necessitatibus, perferendis
            amet dolores eos, sunt numquam nisi doloribus eius maiores esse nam
            nobis iusto pariatur eaque distinctio. In sit quas possimus ducimus
            omnis vitae accusamus?
          </p>
        </CardContent>
        <CardFooter className="py-1 px-2">
          <button onClick={like}>
            <Heart className="unlike" size={20} />
          </button>
          <p>10K</p>
        </CardFooter>
      </div>
    </Card>
  );
}
