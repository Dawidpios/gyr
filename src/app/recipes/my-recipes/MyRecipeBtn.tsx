import { Button } from "@components/components/ui/button";
import Link from "next/link";

const MyRecipeBtn = () => {
  return (
    <Link href="/recipes/my-recipes">
      <Button className="cursor-pointer hover:bg-black/80">
        My Recipes
      </Button>
    </Link>
  );
}
 
export default MyRecipeBtn;