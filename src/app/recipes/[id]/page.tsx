import prisma from "@lib/prisma";
import { Card, CardContent } from "@components/components/ui/card";
import { Clock, Users } from "lucide-react";
import { Ingredient } from "../recipe";
import AddToListButton from "./AddToListButton";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await prisma.recipes.findUnique({ where: { id: id } });
  const ingredients = recipe?.ingredients as unknown as Ingredient[];

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="mb-6">
            <h1 className="mb-2 text-3xl font-bold">{recipe?.title}</h1>
            <p className="text-muted-foreground">{recipe?.desc}</p>
          </div>

          <div className="mb-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>Prep: {recipe?.time?.toString()} mins</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span>Serves: {recipe?.portion.toString()}</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="mb-3 text-xl font-semibold">Ingredients</h2>
            <ul className="ml-5 list-disc space-y-2">
              {ingredients &&
                ingredients?.map((ingredient: Ingredient) => (
                  <li key={ingredient.name}>
                    {ingredient.name} {ingredient.amount} {ingredient.unit}
                  </li>
                ))}
            </ul>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <AddToListButton recipeId={id} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
