import prisma from "@components/lib/prisma";
import { RecipeList } from "../recipes/recipesList/recipesList";
import { Recipe } from "../recipes/recipe";
import { getServerSession } from "next-auth";
import { authOptions } from "@components/lib/authOptions";

const ListPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <div>Please log in to view your shopping list.</div>;
  }

  const list = await prisma.list.findFirst({
    where: { userId: session.user.id as string },
    include: {
      recipes: true,
    },
  });

  return (
    <div className="flex flex-col flex-wrap w-full gap-4 m-5">
      <RecipeList
        recipesList={list?.recipes as unknown as Recipe[]}
        revalidatePath="/list"
        getAll={false}
      />
    </div>
  );
};

export default ListPage;
