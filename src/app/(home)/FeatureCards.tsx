import Link from "next/link";
import { Button } from "@components/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/components/ui/card";
import { ChefHat, ShoppingCart, Utensils } from "lucide-react";

const cards = [
  {
    title: "Curated Recipes",
    src: "/placeholder.svg?height=200&width=400",
    alt: "Curated recipes",
    icon: ChefHat,
    description:
      "Explore thousands of recipes for every occasion, diet, and skill level. From quick weeknight dinners to impressive dinner party showstoppers.",
    buttonText: "View Recipes",
    href: "/recipes",
  },
  {
    title: "Fridge Management",
    src: "/placeholder.svg?height=200&width=400",
    alt: "Fridge Management",
    icon: ShoppingCart,
    description:
      "Automatically generate shopping lists from your selected recipes. Organize by store section, combine ingredients, and shop efficiently.",
    buttonText: "Manage Your Fridge",
    href: "/fridge",
  },
  {
    title: "Create shopping list",
    src: "/placeholder.svg?height=200&width=400",
    alt: "Meal Planning",
    icon: Utensils,
    description:
      " Plan your meals for the week with our intuitive calendar. Save favorites, track nutrition, and reduce food waste with smart planning.",
    buttonText: "Create Your shopping List",
    href: "/list",
  },
];
const FeatureCards = () => {
  return (
    <section className="w-full flex items-center justify-center p-6">
      <div className="container px-4 md:px-6 flex flex-col items-center justify-center">
        <div className="flex flex-col lg:flex-row gap-6 justify-center">
          {cards.map((card) => (
            <Card
              key={card.title}
              className="w-full flex flex-col border-purple h-full md:w-fit mx-auto"
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-secondary-accent/50 p-2 rounded-full">
                  <card.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-base">
                  {card.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link href={card.href} className="w-full">
                  <Button
                    variant="outline"
                    className="w-full cursor-pointer bg-primary-accent text-main font-bold hover:bg-primary-accent/80 hover:text-main"
                  >
                    {card.buttonText}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
