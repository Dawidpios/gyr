import Search from "./search-components/Search";
import prisma from "@components/lib/prisma";

export default async function Page() {
  const ingredients = await prisma.fridgeItem.findMany();
  const recipesRaw = await prisma.recipes.findMany({
    select: { title: true, ingredients: true, id: true },
  });
  const recipes = recipesRaw.map((recipe) => ({
    ...recipe,
    ingredients: Array.isArray(recipe.ingredients)
      ? (recipe.ingredients as { name: string }[]).map(
          (ingredient) => ingredient.name
        )
      : [],
  }));
  return <Search ingredients={ingredients} recipes={recipes} />;
}
