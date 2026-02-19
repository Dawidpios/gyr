"use server";
import prisma from "@components/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@components/lib/authOptions";

const setIngredientsIntoFridge = async (
  data: {
    name: string;
    quantity: number;
    category: string;
    unit: string
  }[],
) => {
  const session = await getServerSession(authOptions);

  if (!session) throw new Error("User is not logged in");

  const userId = session.user?.id as string;

  const userFridge = await prisma.user.findUnique({
    where: { id: userId },
    include: { fridge: true },
  });

  const fridgeId = userFridge?.fridge?.id as string;

  await Promise.all(
    data.map((item) =>
      prisma.fridgeItem.upsert({
        where: {
          name_fridgeId: {
            name: item.name,
            fridgeId: fridgeId,
          },
        },
        update: {
          quantity: {
            increment: item.quantity,
          },
        },
        create: {
          name: item.name,
          quantity: item.quantity,
          category: item.category ?? "List",
          fridgeId: fridgeId,
          unit: item.unit
        },
      }),
    ),
  );
};

export default setIngredientsIntoFridge;
