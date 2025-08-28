import { RecipeList } from "./recipesList/recipesList";
import AddRecipieButton from "./add-recipie/AddRecipieButton";
import MyRecipeBtn from "./my-recipes/MyRecipeBtn";

export default function RecipePage() {
  return (
    <div className="container mx-auto py-6">
      <div className="w-full flex justify-between p-2 flex-col md:flex-row">
        <h1 className="mb-6 text-3xl font-bold">Recipes</h1>
        <div className="flex gap-2 mb-2">
          <AddRecipieButton />
          <MyRecipeBtn />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        <div className="w-full">
          <RecipeList revalidatePath="/recipes" />
        </div>
      </div>
    </div>
  );
}
