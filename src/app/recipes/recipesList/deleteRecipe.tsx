"use server";
import prisma from "@components/lib/prisma";
import revalidate from "@components/lib/revalidate";
import { getServerSession } from "next-auth";

export const deleteRecipe = async (id: string, revalidatePath: string) => {
  const session = await getServerSession();
  if (!session?.user) return;
  try {
    if (revalidatePath === "/list") {
      const list = await prisma.list.findUnique({
        where: { userId: session.user.id as string },
        include: { ingredients: true },
      });
      if (list) {
        await prisma.recipes.update({
          where: { id },
          data: { listId: null },
        });
        revalidate(revalidatePath);
      }
    } else if (
      revalidatePath === "/recipes" ||
      revalidatePath === "/recipes/my-recipes"
    ) {
      await prisma.ingredient.deleteMany({ where: { recipeId: id } });
      await prisma.recipes.delete({ where: { id: id } });
      revalidate(["/recipes", "/recipes/my-recipes"]);
    }
  } catch (err) {
    console.log("Error during deleting recipe", err);
  }
};
