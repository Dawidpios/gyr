"use client";
import { Button } from "@components/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

const AddRecipieButton = () => {
  return (
    <Button
      className="cursor-pointer bg-yellow text-gray-900 hover:bg-yellow/80"
      asChild={true}
    >
      <Link href="recipes/add-recipie">
        <Plus /> Add recipie
      </Link>
    </Button>
  );
};

export default AddRecipieButton;
