import  prisma  from "@lib/prisma";
import { Button } from "@components/components/ui/button";
import { Card, CardContent } from "@components/components/ui/card";
import { Bookmark, Clock, Users } from "lucide-react";
import Image from "next/image";
import { Ingredient } from "../recipie";
import getImageUrl from "@components/app/utils/getImageUrl";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await prisma.recipes.findUnique({ where: { id: id } });
  const ingredients = recipe?.ingredients as Ingredient[];
  console.log(Array.isArray(ingredients) , typeof ingredients)
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <div className="relative h-64 sm:h-50 md:h-70">
          <Image
            src={getImageUrl(recipe?.image)}
            fill={true}
            style={{objectFit: "contain"}}
            alt="Homemade Chocolate Chip Cookies"
            className="h-full w-full object-cover"
          />
        </div>
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
              {ingredients && ingredients?.map((ingredient: Ingredient) => (
                <li key={ingredient.name}>
                  {ingredient.name} {ingredient.amount} {ingredient.unit}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="outline" className="flex items-center gap-2 cursor-pointer">
              <Bookmark className="h-4 w-4" />
              Add recipe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
