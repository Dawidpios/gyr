"use server";
import prisma from "@components/lib/prisma";
import revalidate from "@components/lib/revalidate";

export const deleteRecipe = async (id: string, revalidatePath: string) => {
  try {
    if (revalidatePath === "/list") {
      const list = await prisma.list.findFirst();
      if (list) {
        await prisma.list.update({
          where: { id: list.id },
          data: {
            recipes: {
              disconnect: { id },
            },
          },
        });
        revalidate(revalidatePath);
      }
    } else if (revalidatePath === "/recipies") {
      await prisma.recipes.delete({ where: { id: id } });
      revalidate(revalidatePath);
    }
  } catch (err) {
    console.log("Error during deleting recipe", err);
  }
};
