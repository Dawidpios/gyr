import { Button } from "@components/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@components/components/ui/card";
import { Checkbox } from "@components/components/ui/checkbox";
import { Label } from "@components/components/ui/label";

export default function FilterContent({
  types,
  selectedTypes,
  onTypeChange,
  onClearAll,
  activeFiltersCount,
}: {
  types: string[];
  selectedTypes: string[];
  onTypeChange: (type: string, checked: boolean) => void;
  onClearAll: () => void;
  activeFiltersCount: number;
}) {
  return (
    <>
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClearAll}>
            Clear all
          </Button>
        )}
      </div>

      {/* Type Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {types.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={selectedTypes.includes(type)}
                onCheckedChange={(checked) =>
                  onTypeChange(type, checked as boolean)
                }
              />
              <Label htmlFor={`type-${type}`} className="text-sm font-normal">
                {type.at(0)?.toUpperCase() + type.slice(1)}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}