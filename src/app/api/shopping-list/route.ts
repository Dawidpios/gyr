import prisma from "@components/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { recipeId, userId } = data;

  // Znajdź jedyną listę lub utwórz ją, jeśli nie istnieje
  let list = await prisma.list.findFirst({ where: { userId } });

  if (!list) {
    list = await prisma.list.create({
      data: { name: "My Shopping List", user: { connect: { id: userId } } },
    });
  }
  // Dodaj przepis do listy
  await prisma.recipes.update({
    where: { id: recipeId },
    data: { listId: list.id },
  });

  return NextResponse.json({
    status: 200,
    message: "Recipe added to the list",
  });
}
