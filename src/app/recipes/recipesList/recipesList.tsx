import { RecipeCard } from "../recipeCard/recipeCard";
import { getAllRecipes } from "./getAllRecipes";
import { Recipe } from "../recipe";
import { deleteRecipe } from "./deleteRecipe";

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
      return (
        <div className="text-muted-foreground">
          No recipes yet. Add your first recipe!
        </div>
      );
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
              ingredients:
                typeof recipe.ingredients === "string"
                  ? JSON.parse(recipe.ingredients)
                  : recipe.ingredients,
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
