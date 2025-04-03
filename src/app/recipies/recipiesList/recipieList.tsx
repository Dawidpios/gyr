import type { Recipe } from "@types/recipie"
import { RecipeCard } from "../recipieCard/recipeCard"

interface RecipeListProps {
  recipes: Recipe[]
}

export function RecipeList({ recipes }: RecipeListProps) {
  if (recipes.length === 0) {
    return <div className="text-muted-foreground">No recipes yet. Add your first recipe!</div>
  }

  return (
    <div className="space-y-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}

