import prisma from "@components/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@components/lib/authOptions";
import IngredientsPage from "./IngredientsPage";
import { Ingredients } from "./ingredients";
import IngredientPanel from "./IngredientPanel";

const ListPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <div>Please log in to view your shopping list.</div>;
  }

  const list = await prisma.list.findUnique({
    where: { userId: session.user.id as string },
    include: {
      ingredients: true,
    },
  });
  const userIngredients = await prisma.user.findUnique({
    where: { id: session.user.id as string },
    select: {
      ingredients: true,
    }
  })
  const ingredients = [...(list?.ingredients || []), ...(userIngredients?.ingredients || [])]

  return (
    <div className="flex flex-col sm:flex-row flex-nowrap w-full gap-4 m-5">
      <IngredientsPage ingredients={ingredients as unknown as Ingredients[]} />
      <IngredientPanel />
    </div>
  );
};

export default ListPage;
