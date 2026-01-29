import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@components/components/ui/card";
import { Ingredients } from "./ingredients";
import DeleteIngredientButton from "./DeleteIngredientButton";

export default function IngredientsPage({ ingredients }: { ingredients: Ingredients[] }) {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-primary-accent/75 italic">
              Ingredients List
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {ingredients.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No ingredients added yet. Add some above!
                </p>
              ) : (
                ingredients.map((ingredient, index) => (
                  <div
                    key={ingredient.id || index}
                    className="flex items-center justify-between p-3 bg-secondary-accent/20 rounded-lg hover:bg-secondary-accent/60 hover:cursor-pointer transition-colors"
                  >
                    <span className="font-medium text-primary">
                      {ingredient.name}
                      {ingredient.amount &&
                        ` - ${ingredient.amount} ${ingredient.unit}`}
                    </span>
                    <DeleteIngredientButton id={ingredient.id || index} />
                  </div>
                ))
              )}
            </div>

            {ingredients.length > 0 && (
              <div className="text-sm text-muted-foreground text-center pt-2">
                {ingredients.length} ingredient
                {ingredients.length !== 1 ? "s" : ""} total
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
