import { Button } from "@components/components/ui/button";
import { X } from "lucide-react";

type ResultsHeaderProps = {
  filteredResultsLength: number
  activeFiltersCount: number
  clearAllFilters: () => void;
}

const ResultsHeader = ({filteredResultsLength, activeFiltersCount, clearAllFilters} : ResultsHeaderProps) => {
  return (
    <div className="flex items-center gap-6">
      <p className="text-muted-foreground">
        {filteredResultsLength} result
        {filteredResultsLength !== 1 ? "s" : ""} found
      </p>
      {activeFiltersCount > 0 && (
        <Button className="bg-text-muted p-2 hover:bg-text-muted/90 hover:cursor-pointer" size="sm" onClick={clearAllFilters}>
          <X className="h-4 w-4 mr-2" />
          Clear all filters
        </Button>
      )}
    </div>
  );
};

export default ResultsHeader;
