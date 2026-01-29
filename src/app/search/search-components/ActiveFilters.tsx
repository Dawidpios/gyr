import { Badge } from "@components/components/ui/badge";

type activeFilters = {
  activeFiltersCount: number;
  selectedTypes: string[];
  handleTypeChange: (type: string, checked: boolean) => void;
}

const ActiveFilters = ({activeFiltersCount, selectedTypes } : activeFilters) => {
  return (
    <>
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTypes.map((type) => (
            <Badge key={type}  className="gap-1 bg-secondary-accent/40 text-text-muted">
              {type}
            </Badge>
          ))}
        </div>
      )}{" "}
    </>
  );
};

export default ActiveFilters;
