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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Header />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="grid lg:grid-cols-[300px_1fr] gap-8">
        <FilterSideBar
          activeFiltersCount={activeFiltersCount}
          selectedTypes={selectedTypes}
          handleTypeChange={handleTypeChange}
          clearAllFilters={clearAllFilters}
        />
        <div className="space-y-6">
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
          <div className="grid gap-6">
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
