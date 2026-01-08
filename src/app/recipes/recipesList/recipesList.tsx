import { RecipeCard } from "../recipeCard/recipeCard";
import { getAllRecipes } from "./getAllRecipes";
import { Recipe } from "../recipe";
import { deleteRecipe } from "./deleteRecipe";
import LackRecipes from "./lackRecipes";

export async function RecipeList({
  recipesList = [],
  revalidatePath = "/list",
  getAll = true,
}: {
  recipesList?: Recipe[];
  revalidatePath: string;
  getAll?: boolean;
}) {
  try {
    const recipes = !getAll ? recipesList : await getAllRecipes();
    
    if (!recipes || recipes.length === 0) {
      return <LackRecipes />;
    }

    return (
      <div className="flex flex-wrap gap-4">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={{
              ...recipe,
              time: Number(recipe.time),
              portion: Number(recipe.portion),
              ingredients: "ingredients" in recipe ? (recipe.ingredients as Recipe["ingredients"]) : [],
              authorId: recipe.authorId || null,
            }}
            revalidatePath={revalidatePath}
            deleteRecipe={deleteRecipe}
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return (
      <div className="text-red-500">
        Nie udało się załadować przepisów. Spróbuj ponownie później.
      </div>
    );
  }
}
