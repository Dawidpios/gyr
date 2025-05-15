import { RecipeList } from "./recipiesList/recipieList";
import AddRecipieButton from "./add-recipie/AddRecipieButton";

export default function RecipePage() {
  return (
    <div className="container mx-auto py-6">
      <div className="w-full flex justify-between p-2">
        <h1 className="mb-6 text-3xl font-bold">Recipes</h1>
        <AddRecipieButton />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        <div className="w-full">
          <RecipeList revalidatePath="/recipies" />
        </div>
        {/* <div className="w-full sm:w-1/2">
          <h2 className="mb-4 text-xl font-semibold">Add New Recipe</h2>
          {/* <RecipeForm onAddRecipe={addRecipe} /> */}
        {/* </div> */}
      </div>
    </div>
  );
}
