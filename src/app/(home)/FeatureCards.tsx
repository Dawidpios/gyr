import Image from "next/image";
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
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Card
              key={card.title}
              className="w-80 flex flex-col border-purple h-full md:w-full"
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-purple/50 p-2 rounded-full">
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
                <Link href={card.href} className="w-full">
                  <Button
                    variant="outline"
                    className="w-full cursor-pointer bg-black text-white hover:bg-black/80 hover:text-white"
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
