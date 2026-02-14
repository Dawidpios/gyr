"use client";
import { useSession } from "next-auth/react";

const IngredientDataPanel = () => {
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

  return (
    <button
      onClick={handleDownload}
      className="inline-block bg-primary-accent p-2 hover:bg-primary-accent/80 hover:cursor-pointer rounded text-main text-center"
    >
      Download your list
    </button>
  );
};

export default IngredientDataPanel;
