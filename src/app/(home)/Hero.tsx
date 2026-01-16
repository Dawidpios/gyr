import { Button } from "@components/components/ui/button";
import Link from "next/link";
import GoToDescriptionBtn from "./GoToDescriptionButton";

const Hero = () => {
  return (
    <section
      className="relative w-full py-12 flex bg-cover bg-center bg-no-repeat md:py-16 lg:py-20 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-orange-200/65 before:via-orange-100/40 before:to-transparent"
      style={{ backgroundImage: "url('/hero/hero.png')" }}
    >
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col text-left">
          <div className="space-y-2 p-6 rounded-lg max-w-3xl">
            <div className="space-y-4 mb-4 bg-primary/45 p-4 rounded-lg">
                <h1 className="text-3xl text-main font-poppins font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Delicious Recipes & Smart management
              </h1>
              <p className="mx-auto max-w-[700px] text-main md:text-xl">
                Discover amazing recipes and simplify your grocery shopping with
                our all-in-one platform.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-start pt-4">
              <Link href="/recipes" className="cursor-pointer">
                <Button
                  className="text-main font-bold bg-primary-accent hover:bg-primary-accent/70 cursor-pointer"
                  size="lg"
                >
                  Browse Recipes
                </Button>
              </Link>
              <GoToDescriptionBtn />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
