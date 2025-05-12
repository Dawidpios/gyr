import { RecipeCard } from "../recipieCard/recipeCard";
import { getAllRecipes } from "./getAllRecipies";
import { Recipe } from "../recipie";

export async function RecipeList({ recipesList = [] }: { recipesList?: Recipe[] }) {
  try {
    const recipes = recipesList || (await getAllRecipes());
    console.log("Fetched recipes:", recipes);
    if (!recipes || recipes.length === 0) {
      return (
        <div className="text-muted-foreground">
          No recipes yet. Add your first recipe!
        </div>
      );
    }

    return (
      <div className="flex flex-row gap-4">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={{
              ...recipe,
              time: Number(recipe.time),
              portion: Number(recipe.portion),
              ingredients:
                typeof recipe.ingredients === "string"
                  ? JSON.parse(recipe.ingredients)
                  : recipe.ingredients,
            }}
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
