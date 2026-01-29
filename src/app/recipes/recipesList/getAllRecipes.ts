import prisma from "@lib/prisma";

export async function getAllRecipes() {
  return await prisma.recipes.findMany({
    include: {
      ingredients: { where: { listId: null } },
    },
    orderBy: { created_at: "desc" },
  });
}
