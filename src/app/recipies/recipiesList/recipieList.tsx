import { RecipeCard } from "../recipieCard/recipeCard"
import { getAllRecipes } from "./getAllRecipies"

export async function RecipeList() {
  try {
    const recipes = await getAllRecipes()
    
    if (!recipes || recipes.length === 0) {
      return <div className="text-muted-foreground">No recipes yet. Add your first recipe!</div>
    }

    return (
      <div className="space-y-4">
        {recipes.map((recipe) => (
          <RecipeCard 
            key={recipe.id} 
            recipe={{
              ...recipe,
              time: Number(recipe.time),
              portion: Number(recipe.portion),
              ingredients: typeof recipe.ingredients === 'string' 
                ? JSON.parse(recipe.ingredients) 
                : recipe.ingredients
            }}
          />
        ))}
      </div>
    )
  } catch (error) {
    console.error("Error fetching recipes:", error)
    return <div className="text-red-500">Nie udało się załadować przepisów. Spróbuj ponownie później.</div>
  }
}

