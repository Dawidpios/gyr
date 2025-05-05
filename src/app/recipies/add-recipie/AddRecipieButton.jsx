"use client";
import { Button } from "@components/components/ui/button";
import Link from "next/link";

const AddRecipieButton = () => {
  return (
    <Button asChild={true}>
      <Link href="recipies/add-recipie">Add recipie</Link>
    </Button>
  );
};

export default AddRecipieButton;
