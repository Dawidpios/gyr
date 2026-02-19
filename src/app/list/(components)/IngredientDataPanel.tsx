"use client";
import { useSession } from "next-auth/react";
import { Button } from "@components/components/ui/button";
import setIngredientsIntoFridge from "../helpers/setIngredientsIntoFridge";
import { Ingredients } from "../ingredients";

const IngredientDataPanel = ({
  ingredients,
}: {
  ingredients: Ingredients[];
}) => {
  const { data: session } = useSession();

  const handleDownload = async () => {
    if (!session?.user?.id) return;

    try {
      const response = await fetch(
        `/api/shopping-list?userId=${session.user.id}`,
      );
      if (!response.ok) throw new Error("Failed to fetch shopping list");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "shopping-list.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading shopping list:", error);
    }
  };

  if (!session) {
    return null;
  }

  const handleSetIntoFridge = () => {
    const transformedIngredients = ingredients.map((ingredient) => ({
      name: ingredient.name,
      quantity: ingredient.amount ? Math.round(ingredient.amount) : 1,
      category: "List",
      unit: ingredient.unit || "",
    }));
    setIngredientsIntoFridge(transformedIngredients);
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={handleDownload}
        className="inline-block bg-primary-accent p-2 hover:bg-primary-accent/80 hover:cursor-pointer rounded text-main text-center"
      >
        Download your list
      </Button>
      <Button
        onClick={handleSetIntoFridge}
        className="inline-block bg-primary-accent p-2 hover:bg-primary-accent/80 hover:cursor-pointer rounded text-main text-center"
      >
        {" "}
        Set your list into fridge
      </Button>
    </div>
  );
};

export default IngredientDataPanel;
