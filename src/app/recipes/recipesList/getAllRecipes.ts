import prisma from "@lib/prisma";

export async function getAllRecipes() {
  return await prisma.recipes.findMany({
    include: {
      ingredients: true,
    },
    orderBy: { created_at: "desc" },
  });
}
