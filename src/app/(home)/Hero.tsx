import { Button } from "@components/components/ui/button"


const Hero = () => {
  return ( <section className="w-full py-12 md:py-24 lg:py-32 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="space-y-2 bg-background/80 backdrop-blur-sm p-6 rounded-lg max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Delicious Recipes & Smart Shopping
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Discover amazing recipes and simplify your grocery shopping with our all-in-one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg">Browse Recipes</Button>
            <Button size="lg" variant="outline">
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section> );
}
 
export default Hero;