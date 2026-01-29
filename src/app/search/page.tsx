import Search from "./search-components/Search";
import prisma from "@components/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@components/lib/authOptions";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    throw new Error("User is not authenticated or session is invalid.");
  }

  const ingredients = await prisma.fridge
    .findUnique({
      where: { userId: session.user.id },
      include: { items: true },
    })
    .then((fridge) => fridge?.items || []);
  const recipesRaw = await prisma.recipes.findMany({
    select: { title: true, ingredients: { where: { listId: null } }, id: true },
  });
  const recipes = recipesRaw.map((recipe) => ({
    ...recipe,
    ingredients: Array.isArray(recipe.ingredients)
      ? (recipe.ingredients as { name: string }[]).map(
          (ingredient) => ingredient.name,
        )
      : [],
  }));
  return <Search ingredients={ingredients} recipes={recipes} />;
}
