const Description = () => {
  return (
    <section id="description" className="w-full py-12 md:py-16 lg:py-20 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              Your Culinary Journey Starts Here
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              We bring together thousands of recipes from top chefs and home
              cooks, paired with smart shopping lists that make meal planning
              effortless. Save time, reduce food waste, and enjoy delicious
              meals every day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;
