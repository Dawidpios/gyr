"use client";

import { Clock, Trash, Users, BookOpenText } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@components/components/ui/card";
import { Badge } from "@components/components/ui/badge";
import { Recipe } from "@components/app/recipies/recipie";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const cardHandler = () => {
    router.push(`/recipies/${recipe.id}`);
  };

  return (
    <Card className="flex flex-col w-80">
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
              {recipe.ingredients.map((desc, index) => (
                <li key={index}>{desc.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium">Instructions:</h4>
            <p className="text-sm text-muted-foreground">{recipe.desc}</p>
          </div>
        </div>
        <div className="flex justify-center mt-4 gap-3">
          <Trash
            className="cursor-pointer"
            onClick={() => deleteRecipe(recipe.id, revalidatePath)}
          />
          <BookOpenText onClick={cardHandler} />
        </div>
      </CardContent>
    </Card>
  );
}
