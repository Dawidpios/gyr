"use client";

import revalidate from "@components/lib/revalidate";
import { Bookmark } from "lucide-react";
import { useSession } from "next-auth/react";

export default function AddToListButton({ recipeId }: { recipeId: string }) {
  const { data: session } = useSession();

  if( !session?.user) {
    return null; 
  }
  const addToList = async () => {
    const response = await fetch("/api/shopping-list", {
      method: "POST",
      body: JSON.stringify({ recipeId, userId: session.user.id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidate("/list");
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