import { Card, CardHeader, CardTitle } from "@components/components/ui/card";
import { Badge } from "@components/components/ui/badge";
import Link from "next/link";

type PickedRecipe = {
  id: string;
  title: string;
  ingredients: string[]; // lub odpowiedni typ, jeśli to obiekt
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
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{item.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
          {filteredRecipes.map((recipe) => (
            <Card key={recipe.id} className="hover:shadow-md transition-shadow">
              <Link href={`/recipes/${recipe.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{recipe.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Recipe</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No results found</p>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}{" "}
    </>
  );
};

export default Results;
