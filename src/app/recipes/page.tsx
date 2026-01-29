import { RecipeList } from "./recipesList/recipesList";
import AddRecipieButton from "./add-recipie/AddRecipieButton";
import MyRecipeBtn from "./my-recipes/MyRecipeBtn";

export default function RecipePage() {
  return (
    <div className="container mx-auto w-full p-6">
      <div className="w-full flex justify-between p-2 flex-col sm:flex-row">
        <h1 className="mb-6 text-center sm:text-left text-3xl font-bold italic">
          Recipes{" "}
          <p className="text-sm text-gray-500">Your personal cookbook</p>
        </h1>
        <div className="flex justify-center gap-2">
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
