import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@components/components/ui/card";
import { Ingredients } from "../ingredients";
import ClientIngredientsList from "./ClientIngredientsList";

interface FridgeItem {
  id: string;
  name: string;
  quantity: number;
  unit?: string | null;
}

export default function IngredientsPage({
  ingredients,
  fridgeItems,
}: {
  ingredients: Ingredients[];
  fridgeItems: FridgeItem[];
}) {
  return (
    <div className="min-h-fit bg-background p-4 w-full">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-primary-accent/75 italic">
              Ingredients List
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ClientIngredientsList
              ingredients={ingredients}
              fridgeItems={fridgeItems}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
