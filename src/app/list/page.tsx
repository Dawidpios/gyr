import prisma from "@components/lib/prisma";
import { RecipeList } from "../recipies/recipiesList/recipieList";
import { Recipe } from "../recipies/recipie";

const ListPage = async () => {
  const list = await prisma.list.findFirst({
    include: {
      recipes: true,
    },
  });

  return (
    <div className="flex flex-col flex-wrap w-full gap-4 m-5">
      <RecipeList recipesList={list?.recipes as unknown as Recipe[]} revalidatePath="/list"/>
    </div>
  );
};

export default ListPage;
