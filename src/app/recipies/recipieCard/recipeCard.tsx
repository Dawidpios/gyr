import Image from "next/image"
import { Clock, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@components/components/ui/card"
import { Badge } from "@components/components/ui/badge"
// import { type Recipe } from "../../../types/recipie"
import {Recipe} from "@components/app/recipies/recipie"
import { useRouter } from 'next/navigation'


interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const router = useRouter()

  const cardHandler = () => {
    console.log(recipe.id)
    router.push(`/recipies/${recipe.id}`)
  }

  return (
    <Card onClick={cardHandler}>
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <div className="relative h-16 w-16 overflow-hidden rounded-md">
          <Image
            src={recipe.image || "/placeholder.svg?height=64&width=64"}
            alt={recipe.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-1">
          <CardTitle>{recipe.name}</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {recipe.cookingTime} min
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {recipe.servings} servings
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <h4 className="font-medium">Ingredients:</h4>
            <ul className="ml-5 list-disc text-sm">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium">Instructions:</h4>
            <p className="text-sm text-muted-foreground">{recipe.instructions}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

