import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

export default function ButtonLoading() {
  return (
    <UseAnimations
      animation={loading}
      strokeColor="hsl(var(--primary-foreground))"
    />
  );
}
