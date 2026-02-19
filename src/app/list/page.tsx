import prisma from "@components/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@components/lib/authOptions";
import IngredientsPage from "./(components)/IngredientsPage";
import { Ingredients } from "./ingredients";
import IngredientPanel from "./(components)/IngredientPanel";
import IngredientDataPanel from "./(components)/IngredientDataPanel";

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
    },
  });
  const ingredients = [
    ...(list?.ingredients || []),
    ...(userIngredients?.ingredients || []),
  ];

  const userFridge = await prisma.fridge.findUnique({
    where: { userId: session.user.id as string },
    include: {
      items: true,
    },
  });
  const fridgeItems = userFridge?.items || [];

  return (
    <div className="flex flex-col sm:flex-row flex-nowrap w-full gap-1 m-2">
      <div className="flex flex-col w-full sm:w-1/3 p-2 sm:p-4 sm:pr-0 sm:pt-6 sm:ml-8 mt-8 sm:mt-0">
        <IngredientPanel />
        <IngredientDataPanel ingredients={ingredients} />
      </div>
      <IngredientsPage
        ingredients={ingredients as unknown as Ingredients[]}
        fridgeItems={fridgeItems}
      />
    </div>
  );
};

export default ListPage;
