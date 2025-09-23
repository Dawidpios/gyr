import prisma from "@components/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { recipeId, userId } = data;

  let list = await prisma.list.findUnique({ where: { userId } });

  if (!list) {
    list = await prisma.list.create({
      data: { name: "My Shopping List", user: { connect: { id: userId } } },
    });
  }

  await prisma.recipes.update({
    where: { id: recipeId },
    data: { listId: list.id },
  });

  const ingredients = await prisma.ingredient.findMany({
    where: { recipeId },
  });

  for (const ingredient of ingredients) {
    const existing = await prisma.ingredient.findFirst({
      where: {
        listId: list.id,
        name: ingredient.name,
        unit: ingredient.unit,
      },
    });

    if (existing) {
      await prisma.ingredient.update({
        where: { id: existing.id },
        data: { amount: (existing.amount ?? 0) + (ingredient.amount ?? 0) },
      });
    } else {
      await prisma.ingredient.update({
        where: { id: ingredient.id },
        data: { listId: list.id },
      });
    }
  }

  return NextResponse.json({
    status: 200,
    message: "Recipe added to the list",
  });
}
