import { Button } from "@components/components/ui/button";
import { X } from "lucide-react";

type ResultsHeaderProps = {
  filteredResultsLength: number
  activeFiltersCount: number
  clearAllFilters: () => void;
}

const ResultsHeader = ({filteredResultsLength, activeFiltersCount, clearAllFilters} : ResultsHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-muted-foreground">
        {filteredResultsLength} result
        {filteredResultsLength !== 1 ? "s" : ""} found
      </p>
      {activeFiltersCount > 0 && (
        <Button variant="ghost" size="sm" onClick={clearAllFilters}>
          <X className="h-4 w-4 mr-2" />
          Clear all filters
        </Button>
      )}
    </div>
  );
};

export default ResultsHeader;
