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
    where: { recipeId, listId: null },
  });

  for (const ingredient of ingredients) {
    const normalizedName = ingredient.name.trim().toLowerCase();
    const normalizedUnit = ingredient.unit?.trim().toLowerCase() || null;

    const allListIngredients = await prisma.ingredient.findMany({
      where: { listId: list.id },
    });

    const existing = allListIngredients.find(
      (item) =>
        item.name.trim().toLowerCase() === normalizedName &&
        (item.unit?.trim().toLowerCase() || null) === normalizedUnit,
    );

    if (existing) {
      await prisma.ingredient.update({
        where: { id: existing.id },
        data: { amount: (existing.amount ?? 0) + (ingredient.amount ?? 0) },
      });
    } else {
      await prisma.ingredient.create({
        data: {
          name: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit,
          listId: list.id,
          recipeId: recipeId,
        },
      });
    }
  }

  return NextResponse.json({
    status: 200,
    message: "Recipe added to the list",
  });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ status: 400, message: "Missing userId" });
  }

  const list = await prisma.list.findUnique({
    where: { userId: userId },
    include: {
      ingredients: true,
    },
  });

  if (!list) {
    return NextResponse.json({ status: 404, message: "List not found" });
  }

  const Content = list.ingredients
    .map((ing) => `${ing.name} - ${ing.amount} ${ing.unit}`)
    .join("\n");
  return new NextResponse(Content, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="shopping-list.txt"`,
    },
  });
}
