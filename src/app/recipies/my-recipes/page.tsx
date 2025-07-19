import prisma from "@components/lib/prisma";
import { getServerSession } from "next-auth";

import { RecipeList } from "../recipiesList/recipieList";
import { authOptions } from "@lib/authOptions";
import { Recipe } from "../recipie";

const MyRecipes = async () => {
  const session = await getServerSession(authOptions);

  const userID = session?.user?.id;

  const userRecipes = await prisma.recipes.findMany({
    where: {
      authorId: userID,
    },
  });

  return (
    <RecipeList
      recipesList={userRecipes as unknown as Recipe[]}
      revalidatePath="recipies/my-recipes"
      getAll={false}
    ></RecipeList>
  );
};

export default MyRecipes;
