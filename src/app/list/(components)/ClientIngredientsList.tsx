"use client";
import { useState } from "react";
import { Ingredients } from "../ingredients";
import { CheckedState } from "@radix-ui/react-checkbox";
import DeleteIngredientButton from "./DeleteIngredientButton";
import FilterPanel from "./FilterPanel";

interface FridgeItem {
  id: string;
  name: string;
  quantity: number;
  unit?: string | null;
}

interface ClientIngredientsListProps {
  ingredients: Ingredients[];
  fridgeItems: FridgeItem[];
}

export default function ClientIngredientsList({
  ingredients,
  fridgeItems,
}: ClientIngredientsListProps) {
  const [filterActive, setFilterActive] = useState(false);

  const handleFilterChange = (checked: CheckedState) => {
    setFilterActive(checked === true);
  };

  const filteredIngredients = filterActive
    ? ingredients.filter((ingredient) => {
        const fridgeItem = fridgeItems.find(
          (item) => item.name.toLowerCase() === ingredient.name.toLowerCase(),
        );
        return !fridgeItem || fridgeItem.quantity > Number(ingredient?.amount);
      })
    : ingredients;

  return (
    <>
      <div className="space-y-2">
        {filteredIngredients.length === 0 ? (
          <>
            <p className="text-muted-foreground text-center py-8">
              {filterActive
                ? "All ingredients are in stock!"
                : "No ingredients added yet."}
            </p>
          </>
        ) : (
          filteredIngredients.map((ingredient, index) => (
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

      {filteredIngredients.length > 0 && (
        <div className="text-sm text-muted-foreground text-center pt-2">
          {filteredIngredients.length} ingredient
          {filteredIngredients.length !== 1 ? "s" : ""} total
          {filterActive && ingredients.length > filteredIngredients.length && (
            <span className="ml-2 text-primary-accent">
              ({ingredients.length - filteredIngredients.length} filtered out)
            </span>
          )}
        </div>
      )}

      <FilterPanel filterIngredients={handleFilterChange} />
    </>
  );
}
