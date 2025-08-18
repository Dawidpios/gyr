export interface Ingredient {
  name: string
  amount: number
  unit: string
}

export type Recipe = {
  id: string
  title: string
  ingredients: Ingredient[]
  desc: string | null
  time: number
  portion: number
  image?: string
  authorId?: string | null
}

