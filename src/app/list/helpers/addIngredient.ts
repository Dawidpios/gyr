"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@components/lib/authOptions";
import updateIngredient from "@components/lib/updateIngredient"

const addIngredient = async ({
  name,
  amount,
  unit,
}: {
  name: string;
  amount: string;
  unit: string;
}) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("User is not logged in");
  }

  const userId = session.user?.id as string;

  await updateIngredient({userId, name, amount, unit})
};

export default addIngredient;
