"use client";

import { Clock, Users } from "lucide-react";
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
    <Card className="relative flex flex-col w-80 border-purple shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{recipe.title}</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {recipe.time} min
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
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
          {recipe.desc !== "" && (
            <div>
              <h4 className="font-medium">Instructions:</h4>
              <p className="text-sm text-muted-foreground">{recipe.desc}</p>
            </div>
          )}
        </div>
        <div className="w-full flex justify-between align-middle mt-4 gap-2">
          <Button
            className="cursor-pointer text-white hover:bg-black/80  hover:text-white"
            onClick={cardHandler}
          >
            Details
          </Button>
          <AddToListButton recipeId={recipe.id} />
        </div>
        {(recipe.authorId === userId || pathname.includes("/list")) && (
          <Button
            className="absolute w-1/4 right-5 top-5 cursor-pointer text-white hover:bg-black/80  hover:text-white"
            onClick={() => deleteRecipe(recipe.id, revalidatePath)}
          >
            Delete
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
