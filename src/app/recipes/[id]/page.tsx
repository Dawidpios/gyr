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
  const recipe = await prisma.recipes.findUnique({
    where: { id: id },
    include: { ingredients: { where: { listId: null } } },
  });
  const ingredients = recipe?.ingredients as Ingredient[];

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden border-none shadow-none">
        <CardContent className="p-6 ">
          <div className="mb-6 flex space-around flex-wrap gap-4 items-baseline">
            <h1 className="mb-2 text-3xl font-bold italic text-primary-accent">
              {recipe?.title}
            </h1>
            <div className="mb-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 p-2 bg-secondary-accent/10 border rounded-md">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="text-text-muted">
                  Prep: {recipe?.time?.toString()} mins
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-secondary-accent/10 border rounded-md">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="text-text-muted">
                  Serves: {recipe?.portion.toString()}
                </span>
              </div>
            </div>
          </div>
          <div className="mb-6 shadow-sm bg-secondary-accent/10 rounded-md p-4 w-full lg:min-w-1/4 lg:w-fit lg:max-w-1/3">
            <h2 className="mb-3 text-xl font-semibold italic text-text-muted">
              Instructions
            </h2>
            <p className="text-muted-foreground">{recipe?.desc}</p>
          </div>
          <div className="mb-6 shadow-sm bg-secondary-accent/10 rounded-md p-4 w-full lg:min-w-1/4 lg:w-fit lg:max-w-1/3">
            <h2 className="mb-3 text-xl font-semibold italic text-text-muted">
              Ingredients
            </h2>
            <ul className="ml-5 list-disc space-y-2 w-full">
              {ingredients &&
                ingredients?.map((ingredient: Ingredient) => (
                  <li className="text-text-muted" key={ingredient.name}>
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
