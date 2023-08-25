import { useState } from "react";
import { useQueryClient } from "react-query";
import { Heart } from "lucide-react";
import { like } from "@/api/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Categories from "./Categories";

export default function BlogCard({ data }: any) {
  const [isLike, setIsLike] = useState(data.liked);
  const [likesCount, setLikesCount] = useState(data.likesCount);
  const client = useQueryClient();

  const cardClick = () => {
    console.log("Card clicked");
  };

  const likeClicked = async () => {
    try {
      console.log(isLike);
      setIsLike(!isLike);
      console.log(isLike);
      setLikesCount(!isLike ? likesCount + 1 : likesCount - 1);
      await like(data._id);
      client.invalidateQueries("favoriteBlogs");
    } catch (error) {
      setIsLike(!isLike);
    }
  };

  const backgroundStyle = {
    backgroundImage: `https://plus.unsplash.com/premium_photo-1691948105905-46c20aa7c335?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <Card style={backgroundStyle}>
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
              {data.title}
            </CardTitle>
            <span className=" text-xs">{data.uploadedDate}</span>
          </div>
        </CardHeader>
        <section className="mx-4 py-2 flex space-x-2 overflow-auto no-scrollbar">
          {data.categories.map((category: string) => (
            <Categories category={category} key={category} />
          ))}
        </section>
        <CardContent
          onClick={cardClick}
          className="py-1 px-2 overflow-hidden cursor-pointer text-ellipsis line-clamp-4"
        >
          {data.summary}
        </CardContent>
        <CardFooter className="py-1 px-2 flex justify-between">
          <div className="flex space-x-1">
            <button onClick={likeClicked}>
              <Heart className={`${isLike ? "like" : "unlike"}`} size={20} />
            </button>
            <p>{likesCount}</p>
          </div>
          <div>{data.authorName}</div>
        </CardFooter>
      </div>
    </Card>
  );
}
