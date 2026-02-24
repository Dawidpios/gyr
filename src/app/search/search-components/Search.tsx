"use client";

import { useState } from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import FilterSideBar from "./FilterSideBar";
import ResultsHeader from "./Results-Header";
import ActiveFilters from "./ActiveFilters";
import Results from "./Results";


type Ingredient = {
  id: string | number;
  name: string;
  category: string;
  quantity: number | null;
  unit: string | null;
};

type PickedRecipe = {
  id: string;
  title: string;
  ingredients: string[]; 
};

export default function Component({
  ingredients,
  recipes,
}: {
  ingredients: Ingredient[];
  recipes: PickedRecipe[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, type]);
    } else {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    }
  };

  const clearAllFilters = () => {
    setSelectedTypes([]);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesSearch && selectedTypes.length === 0;
  });

  const filteredResults = ingredients.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(item.category);

    return matchesSearch && matchesType;
  });

  const activeFiltersCount = selectedTypes.length;

  return (
    <div className="container mx-auto px-4 py-8 sm:py-2 w-full max-w-7xl">
      <Header />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="flex flex-col sm:flex-row gap-4">
        <FilterSideBar
          activeFiltersCount={activeFiltersCount}
          selectedTypes={selectedTypes}
          handleTypeChange={handleTypeChange}
          clearAllFilters={clearAllFilters}
        />
        <div className="space-y-2">
          <ResultsHeader
            filteredResultsLength={
              filteredResults.length + filteredRecipes.length
            }
            activeFiltersCount={activeFiltersCount}
            clearAllFilters={clearAllFilters}
          />
          <ActiveFilters
            activeFiltersCount={activeFiltersCount}
            selectedTypes={selectedTypes}
            handleTypeChange={handleTypeChange}
          />
          <div className="w-full flex flex-col sm:flex-row flex-wrap gap-2">
            <Results
              filteredResults={filteredResults}
              filteredRecipes={filteredRecipes}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
