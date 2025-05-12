"use client";

import { Bookmark } from "lucide-react";

export default function AddToListButton({ recipeId }: { recipeId: string }) {
  const addToList = async () => {
    const response = await fetch("/api/shopping-list", {
      method: "POST",
      body: JSON.stringify({ recipeId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error("Failed to add to shopping list");
    }
  };

  return (
    <button
      className="flex items-center gap-2 cursor-pointer"
      onClick={addToList}
    >
      <Bookmark className="h-4 w-4" />
      Add to list
    </button>
  );
}