import { Badge } from "@components/components/ui/badge";
import { X } from "lucide-react";

type activeFilters = {
  activeFiltersCount: number;
  selectedTypes: string[];
  handleTypeChange: (type: string, checked: boolean) => void;
}

const ActiveFilters = ({activeFiltersCount, selectedTypes, handleTypeChange} : activeFilters) => {
  return (
    <>
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTypes.map((type) => (
            <Badge key={type} variant="secondary" className="gap-1">
              {type}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleTypeChange(type, false)}
              />
            </Badge>
          ))}
        </div>
      )}{" "}
    </>
  );
};

export default ActiveFilters;
