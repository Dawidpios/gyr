"use client";
import { useSession } from "next-auth/react";

const IngredientDataPanel = () => {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <a
      href={`/api/shopping-list?userId=${session.user.id}`}
      download
      className="inline-block bg-primary-accent p-2 hover:bg-primary-accent/80 hover:cursor-pointer rounded text-main text-center"
    >
      Download your list
    </a>
  );
};

export default IngredientDataPanel;
