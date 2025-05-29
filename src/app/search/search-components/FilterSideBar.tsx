import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@components/components/ui/collapsible";
import { Button } from "@components/components/ui/button";
import { Badge } from "@components/components/ui/badge";
import { Filter } from "lucide-react";
import FilterContent from "./Filter";

  const types = [
    "dairy",
    "fruits",
    "vegetables",
    "meat",
    "frozen",
    "beverages",
    "snacks",
    "other",
  ];


interface FilterSideBarProps {
  activeFiltersCount: number;
  selectedTypes: string[];
  handleTypeChange: (type: string, checked: boolean) => void;
  clearAllFilters: () => void;
}

const FilterSideBar = ({
  activeFiltersCount,
  selectedTypes,
  handleTypeChange,
  clearAllFilters,
}: FilterSideBarProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-6">
            <FilterContent
              types={types}
              selectedTypes={selectedTypes}
              onTypeChange={handleTypeChange}
              onClearAll={clearAllFilters}
              activeFiltersCount={activeFiltersCount}
            />
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <FilterContent
          types={types}
          selectedTypes={selectedTypes}
          onTypeChange={handleTypeChange}
          onClearAll={clearAllFilters}
          activeFiltersCount={activeFiltersCount}
        />
      </div>
    </div>
  );
};

export default FilterSideBar;
