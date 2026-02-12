"use server";
import prisma from "@lib/prisma";

const updateIngredient = async ({
  userId,
  name,
  amount,
  unit,
}: {
  userId: string;
  name: string;
  amount: string;
  unit: string;
}) => {
  let list = await prisma.list.findUnique({ where: { userId } });

  if (!list) {
    list = await prisma.list.create({
      data: { name: "My Shopping List", user: { connect: { id: userId } } },
    });
  }

  const normalizedName = name.trim().toLowerCase();
  const normalizedUnit = unit?.trim().toLowerCase() || null;

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
      data: { amount: (existing.amount ?? 0) + parseFloat(amount) },
    });
  } else {
    await prisma.ingredient.create({
      data: {
        name: name,
        amount: parseFloat(amount),
        unit: unit,
        listId: list.id,
      },
    });
  }
};

export default updateIngredient;
