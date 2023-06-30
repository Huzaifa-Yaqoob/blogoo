import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="h-screen grid place-items-center place-content-center space-y-8 text-foreground bg-background">
      <span className="text-[4rem] font-bold">Page Not Found</span>
      <span>
        Go Back To{" "}
        <Link to="/" className="text-primary font-bold">
          Home
        </Link>
      </span>
    </div>
  );
}
