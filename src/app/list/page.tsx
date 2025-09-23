import prisma from "@components/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@components/lib/authOptions";
import IngredientsPage from "./IngredientsPage";
import { Ingredients } from "./ingredients";

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
  const ingredients = list?.ingredients || [];

  return (
    <div className="flex flex-col flex-wrap w-full gap-4 m-5">
      <IngredientsPage ingredients={ingredients as unknown as Ingredients[]} />
    </div>
  );
};

export default ListPage;
