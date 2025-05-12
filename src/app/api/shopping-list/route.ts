import prisma from "@components/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  // Znajdź jedyną listę lub utwórz ją, jeśli nie istnieje
  let list = await prisma.list.findFirst();
  if (!list) {
    list = await prisma.list.create({
      data: {
        name: "Default List",
      },
    });
  }

  // Dodaj przepis do listy
  await prisma.recipes.update({
    where: { id: data.recipeId },
    data: { listId: list.id },
  });

  console.log("POST shopping-list", data);
  return NextResponse.json({
    status: 200,
    message: "Recipe added to the list",
  });
}
