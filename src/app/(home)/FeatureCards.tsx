import Image from "next/image";
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
  },
  {
    title: "Smart Shopping",
    src: "/placeholder.svg?height=200&width=400",
    alt: "Smart Shopping",
    icon: ShoppingCart,
    description:
      "Automatically generate shopping lists from your selected recipes. Organize by store section, combine ingredients, and shop efficiently.",
    buttonText: "Start Shopping",
  },
  {
    title: "Meal Planning",
    src: "/placeholder.svg?height=200&width=400",
    alt: "Meal Planning",
    icon: Utensils,
    description:
      " Plan your meals for the week with our intuitive calendar. Save favorites, track nutrition, and reduce food waste with smart planning.",
    buttonText: "Start meal planning",
  },
];
const FeatureCards = () => {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Card key={card.title} className="flex flex-col h-full">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <card.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <Image
                  src={card.src}
                  alt={card.alt}
                  width={400}
                  height={200}
                  className="rounded-lg object-cover w-full h-48 mb-4"
                />
                <CardDescription className="text-base">
                  {card.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  {card.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
