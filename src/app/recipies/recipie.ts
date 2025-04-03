export interface Recipe {
  id: string
  name: string
  ingredients: string[]
  instructions: string
  cookingTime: number
  servings: number
  image?: string
}

