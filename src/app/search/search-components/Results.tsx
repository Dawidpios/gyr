import { Card, CardHeader, CardTitle } from "@components/components/ui/card";
import { Badge } from "@components/components/ui/badge";
import Link from "next/link";

type PickedRecipe = {
  id: string;
  title: string;
  ingredients: string[];
};
type Ingredient = {
  id: string | number;
  name: string;
  category: string;
};

type ResultItem = {
  filteredResults: Ingredient[];
  filteredRecipes: PickedRecipe[];
};

const Results = ({ filteredResults, filteredRecipes }: ResultItem) => {
  return (
    <>
      {" "}
      {filteredResults.length > 0 || filteredRecipes.length > 0 ? (
        <>
          {filteredResults.map((item) => (
            <Card
              key={item.id}
              className="relative flex flex-col w-full sm:w-80 border-border-muted hover:shadow-[0_0_5px_oklch(0.93_0.13_99.0)] transition-shadow duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl text-primary/75 italic">
                      {item.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary-accent text-main font-bold text-xs">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
          {filteredRecipes.map((recipe) => (
            <Card
              key={recipe.id}
              className="relative flex flex-col w-full sm:w-80 border-border-muted hover:shadow-[0_0_5px_oklch(0.93_0.13_99.0)] transition-shadow duration-300"
            >
              <Link href={`/recipes/${recipe.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl text-primary/75 italic">
                        {recipe.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-primary-accent text-main font-bold text-xs">
                          Recipe
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </>
      ) : (
        <div className="w-full text-center py-12">
          <p className="text-muted-foreground text-lg">No results found</p>
          <p className="text-muted-foreground text-center text-lg">
            Try adjusting your search or filters
          </p>
        </div>
      )}{" "}
    </>
  );
};

export default Results;
