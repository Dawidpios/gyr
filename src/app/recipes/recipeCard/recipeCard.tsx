"use client";

import { Clock, Users, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@components/components/ui/card";
import { Badge } from "@components/components/ui/badge";
import { Recipe } from "@components/app/recipes/recipe";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import AddToListButton from "../[id]/AddToListButton";
import { Button } from "@components/components/ui/button";

interface RecipeCardProps {
  recipe: Recipe;
  revalidatePath: string;
  deleteRecipe: (id: string, revalidatePath: string) => void;
}

export function RecipeCard({
  recipe,
  revalidatePath,
  deleteRecipe,
}: RecipeCardProps) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const pathname = usePathname();

  const cardHandler = () => {
    router.push(`/recipes/${recipe.id}`);
  };
  console.log(pathname);

  return (
    <Card className="relative flex flex-col w-full sm:w-1/4 border-border-muted hover:shadow-[0_0_5px_oklch(0.93_0.13_99.0)] transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle className="italic font-light text-primary-accent font-bold justify-start">{recipe.title}</CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="flex items-center gap-1 bg-secondary-accent/10">
              <Clock className="h-3 w-3" />
              {recipe.time} min
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 bg-secondary-accent/10">
              <Users className="h-3 w-3" />
              {recipe.portion} servings
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <div className="space-y-2 flex-1">
          <div>
            <h4 className="font-medium">Ingredients:</h4>
            <ul className="ml-5 list-disc text-sm">
              {recipe.ingredients.slice(0, 3).map((desc, index) => (
                <li key={index}>{desc.name}</li>
              ))}
              {recipe.ingredients.length > 3 && (
                <li className="italic text-muted-foreground">...and more</li>
              )}
            </ul>
          </div>
        </div>
        <div className="w-full flex justify-between align-middle mt-4 gap-2">
          <Button
            className="cursor-pointer bg-primary-accent text-white hover:bg-primary-accent/80  hover:text-white"
            onClick={cardHandler}
          >
            Details
          </Button>
          <AddToListButton recipeId={recipe.id} />
        </div>
        {(recipe.authorId === userId || pathname.includes("/list")) && (
          <Button
            className="absolute bg-primary-accent w-10 right-2 top-2 cursor-pointer text-white hover:bg-primary-accent/60  hover:text-white"
            onClick={() => deleteRecipe(recipe.id, revalidatePath)}
          >
            <Trash className="h-2 w-2" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
