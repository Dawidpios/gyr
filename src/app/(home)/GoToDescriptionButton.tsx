"use client";
import { Button } from "@components/components/ui/button";

const GoToDescriptionBtn = () => {
  const goToDescription = () => {
    const descriptionSection = document.getElementById("description");
    if (descriptionSection) {
      descriptionSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Button
      onClick={goToDescription}
      className="cursor-pointer font-bold"
      size="lg"
      variant="outline"
    >
      Get Started
    </Button>
  );
};

export default GoToDescriptionBtn;
