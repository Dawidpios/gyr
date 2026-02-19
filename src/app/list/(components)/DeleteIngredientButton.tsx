"use client";
import deleteIngredient from "../helpers/deleteIngredient";
import { Button } from "@components/components/ui/button";
import { Trash2 } from "lucide-react";

const DeleteIngredientButton = ({ id }: { id: string | number }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => deleteIngredient(id)}
      className="text-destructive hover:text-destructive hover:bg-destructive/10 hover:cursor-pointer"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
};

export default DeleteIngredientButton;
