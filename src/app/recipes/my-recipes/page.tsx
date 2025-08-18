import prisma from "@components/lib/prisma";
import { getServerSession } from "next-auth";

import { RecipeList } from "../recipesList/recipesList";
import { authOptions } from "@lib/authOptions";
import { Recipe } from "../recipe";

const MyRecipes = async () => {
  const session = await getServerSession(authOptions);

  const userID = session?.user?.id;

  const userRecipes = await prisma.recipes.findMany({
    where: {
      authorId: userID,
    },
  });

  return (
    <div className="container mx-auto py-6">
      <RecipeList
        recipesList={userRecipes as unknown as Recipe[]}
        revalidatePath="/recipes/my-recipes"
        getAll={false}
      ></RecipeList>
    </div>
    
  );
};

export default MyRecipes;
