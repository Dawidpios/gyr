"use server";
import prisma from "@components/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@components/lib/authOptions";
import revalidate from "@components/lib/revalidate";

const deleteIngredient = async (id: string | number) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  await prisma.list.update({
    where: { userId: session.user.id as string },
    data: {
      ingredients: {
        delete: { id: id as string },
      },
    },
  });
  await revalidate("/list");
};
export default deleteIngredient;
