import { Button } from "@components/components/ui/button";
import Link from "next/link";

const MyRecipeBtn = () => {
  return (
    <Button className="cursor-pointer border-1 text-neutral-800 bg-white hover:bg-yellow/20">
      <Link href="/recipes/my-recipes">My Recipes</Link>
    </Button>
  );
};

export default MyRecipeBtn;
