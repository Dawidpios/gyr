"use client"

import { useState } from "react"
import { RecipeList } from "./recipiesList/recipieList"
import type { Recipe } from "./recipie"
import { Button } from "@components/components/ui/button"
import Link from "next/link"

export default function RecipePage() {
  const [recipes] = useState<Recipe[]>([
    {
      id: "1",
      name: "Spaghetti Carbonara",
      ingredients: ["200g spaghetti", "100g pancetta", "2 eggs", "50g parmesan cheese", "Black pepper"],
      instructions: "Cook pasta. Fry pancetta. Mix eggs and cheese. Combine all ingredients.",
      cookingTime: 20,
      servings: 2,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      name: "Chicken Curry",
      ingredients: ["500g chicken breast", "1 onion", "2 cloves garlic", "400ml coconut milk", "2 tbsp curry powder"],
      instructions:
        "Dice chicken. Sauté onions and garlic. Add chicken and curry powder. Pour in coconut milk and simmer.",
      cookingTime: 30,
      servings: 4,
      image: "/placeholder.svg?height=100&width=100",
    },
  ])

  // const addRecipe = (recipe: Omit<Recipe, "id">) => {
  //   const newRecipe = {
  //     ...recipe,
  //     id: Math.random().toString(36).substring(2, 9),
  //   }
  //   setRecipes([...recipes, newRecipe])
  // }

  return (
    <div className="container mx-auto py-6">
      <div className="w-full flex justify-between p-2">
        <h1 className="mb-6 text-3xl font-bold">Recipes</h1>
        <Button asChild={true}><Link href="recipies/add-recipie">Add recipie</Link></Button>
      </div>
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <div className="w-full sm:w-2/3">
          <RecipeList recipes={recipes} />
        </div>
        {/* <div className="w-full sm:w-1/2">
          <h2 className="mb-4 text-xl font-semibold">Add New Recipe</h2>
          {/* <RecipeForm onAddRecipe={addRecipe} /> */}
        {/* </div> */} 
      </div>
    </div>
  )
}

