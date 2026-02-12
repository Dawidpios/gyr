"use server";
import prisma from "@lib/prisma";

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

const addRecipe = async (formData: FormData) => {
  try {
    const title = formData.get("title") as string;
    const time = parseFloat(formData.get("time") as string);
    const portion = parseFloat(formData.get("portion") as string);
    const desc = formData.get("desc") as string;
    const ingredientsRaw = formData.get("ingredients") as string;
    const ingredients = JSON.parse(ingredientsRaw) as Ingredient[];
    const authorId = formData.get("authorId") as string;

    const image = formData.get("image") as string;

    if (!title || !time || !portion || !ingredients) {
      throw new Error("All fields are required.");
    }

    await prisma.recipes.create({
      data: {
        title,
        time,
        portion,
        desc,
        ingredients: {
          create: ingredients.map((ingredient) => ({
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit,
          })),
        },
        image,
        authorId,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error adding recipe:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export default addRecipe;
