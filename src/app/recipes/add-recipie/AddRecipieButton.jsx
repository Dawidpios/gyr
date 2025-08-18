"use client";
import { Button } from "@components/components/ui/button";
import Link from "next/link";

const AddRecipieButton = () => {
  return (
    <Button className="cursor-pointer hover:bg-black/80" asChild={true}>
      <Link href="recipes/add-recipie">Add recipie</Link>
    </Button>
  );
};

export default AddRecipieButton;
